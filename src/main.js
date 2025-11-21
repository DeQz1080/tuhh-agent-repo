// src/main.js

// 1. CSS IMPORTIEREN (Das fixt das Design!)
import './style.css';

// 2. Navigation
import { setupNavbar } from './components/navbar.js';

// 3. Daten laden
import syntheticAgents from '../data/agents_synthetic_baseline.json';
import humanMirrorAgents from '../data/agents_human_mirror.json';

// --- DEBUGGING START (Schau in die F12 Konsole!) ---
console.log("--------------------------------");
console.log("DEBUG: Start Main.js");
console.log("Synthetische Daten:", syntheticAgents);
console.log("Human Mirror Daten:", humanMirrorAgents);
// --- DEBUGGING ENDE ---

setupNavbar();

// Sicherheits-Check: Sind es Arrays? Wenn nein, mach ein leeres Array draus.
const set1 = Array.isArray(syntheticAgents) ? syntheticAgents : [];
const set2 = Array.isArray(humanMirrorAgents) ? humanMirrorAgents : [];

const AGENTS = [...set1, ...set2];
console.log("Anzahl geladener Agenten:", AGENTS.length);


// ===================================================================
// 2. UTILITIES (Helfer-Funktionen)
// ===================================================================
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

// Toast-Nachricht anzeigen (kopiert...)
function toast(msg="Copied to clipboard"){
  const t = qs('#toast');
  // Sicherheitscheck: Existiert der Toast-Container auf dieser Seite?
  if(t) {
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(()=>t.classList.remove('show'), 1400);
  }
}

// JSON herunterladen
function downloadObject(obj, filename){
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// Text herunterladen
function downloadText(text, filename){
  const blob = new Blob([text], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// HTML-Escape (Sicherheit gegen XSS in Strings)
function escapeHtml(s){
  if (!s) return '';
  return s.toString().replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}


// ===================================================================
// 3. LOGIK FÜR DIE HAUPTSEITE (REPOSITORY LISTE)
// WICHTIG: Wir prüfen erst, ob der Container '#cards' existiert!
// ===================================================================
const cardsContainer = qs('#cards');

if (cardsContainer) {
    // --- AB HIER NUR CODE, DER AUF DER STARTSEITE LÄUFT ---

    let activeTag = "all";
    let searchTerm = "";

    // Filter-Logik
    function matches(agent){
      // Suchstring zusammenbauen aus allen relevanten Feldern
      const tagString = agent.tags ? agent.tags.join(" ") : "";
      const hay = (agent.id+" "+agent.title+" "+(agent.personality||'')+" "+(agent.task||'')+" "+(agent.origin||'')+" "+tagString).toLowerCase();
      
      const searchOk = hay.includes(searchTerm.toLowerCase());
      const tagOk = (activeTag==="all") || (agent.tags && agent.tags.includes(activeTag));
      
      return searchOk && tagOk;
    }

    // Rendering-Funktion
    function render(){
      cardsContainer.innerHTML = "";
      const visible = AGENTS.filter(matches);
      
      // Counter aktualisieren (falls vorhanden)
      const countEl = qs('#resultCount');
      if(countEl) countEl.textContent = `${visible.length} agent${visible.length===1?"":"s"}`;

      visible.forEach(agent=>{
        const el = document.createElement('article');
        el.className = 'card';

        // Badges vorbereiten (prüfen ob vorhanden)
        const taskBadge = agent.task ? `<span class="badge">Task: ${agent.task}</span>` : '';
        const personalityBadge = agent.personality ? `<span class="badge">Persona: ${agent.personality}</span>` : '';
        const originBadge = agent.origin ? `<span class="badge">Origin: ${agent.origin}</span>` : '';
        const tagsHtml = agent.tags ? agent.tags.map(t=>`<span class="pill">#${t}</span>`).join("") : '';

        // Details Content dynamisch aufbauen
        let detailsContent = '';

        // A) Für Human Mirror Agents (Demographics & HEXACO)
        if (agent.hexaco || agent.demographics || agent.reflections) {
            let hexacoHtml = agent.hexaco ? `<h4>HEXACO</h4><div class="sec small mono" style="font-size:12px">${Object.entries(agent.hexaco).map(([k,v])=>`<b>${k}</b>: ${v}`).join(' | ')}</div>` : '';
            let demoHtml = agent.demographics ? `<h4>Demographics</h4><div class="sec small mono" style="font-size:12px">${Object.entries(agent.demographics).map(([k,v])=>`<b>${k}</b>: ${v}`).join('<br>')}</div>` : '';
            let refHtml = agent.reflections ? `<h4>Reflections</h4>${agent.reflections.map(r => `<div class="small"><i>${r.topic}:</i> ${r.text}</div>`).join('')}` : '';
            
            detailsContent += `<details><summary>Demographics & Traits</summary><div class="sec" style="display:grid; gap:10px">${demoHtml}${hexacoHtml}${refHtml}</div></details>`;
        }

        // B) Für Synthetic Agents (Prompts)
        if (agent.prompt) {
             detailsContent += `
                <details>
                  <summary>Prompt template</summary>
                  <div class="sec mono">${escapeHtml(agent.prompt)}</div>
                  <div class="btns">
                    <button class="btn copy-prompt">Copy prompt</button>
                    <button class="btn dl-txt">Download .txt</button>
                  </div>
                </details>`;
        }

        // C) Output Beispiele
        if (agent.example_output) {
            detailsContent += `
               <details>
                 <summary>Example output</summary>
                 <div class="sec mono">${escapeHtml(JSON.stringify(agent.example_output, null, 2))}</div>
               </details>`;
       }

        // D) Standard How-To
        detailsContent += `
            <details>
              <summary>How to reproduce</summary>
              <div class="sec"><ol>${(agent.howto || ["See general documentation"]).map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ol></div>
              <div class="btns"><button class="btn dl-profile">Download Profile JSON</button></div>
            </details>
        `;
        
        // Karte zusammenbauen
        el.innerHTML = `
          <div class="card-head">
            <div>
              <div class="card-title">${agent.id} — ${agent.title}</div>
              <div class="meta">${taskBadge}${personalityBadge}${originBadge}</div>
            </div>
            <div class="row">${tagsHtml}</div>
          </div>
          <div class="accordion">${detailsContent}</div>
        `;
        
        // EVENT LISTENER (Sicher hinzufügen)
        const copyBtn = el.querySelector('.copy-prompt');
        if(copyBtn) {
            copyBtn.addEventListener('click', async () => {
                await navigator.clipboard.writeText(agent.prompt);
                toast("Prompt copied!");
            });
        }
        
        const dlTxtBtn = el.querySelector('.dl-txt');
        if(dlTxtBtn) {
             dlTxtBtn.addEventListener('click', () => downloadText(agent.prompt, `${agent.id}_prompt.txt`));
        }

        const dlProfileBtn = el.querySelector('.dl-profile');
        if(dlProfileBtn) {
            dlProfileBtn.addEventListener('click', () => {
                downloadObject(agent, `${agent.id}_profile.json`);
            });
        }

        cardsContainer.appendChild(el);
      });
    }

    // Initiales Rendern aufrufen
    render();


    // --- LISTENERS (Nur wenn Elemente existieren) ---

    const searchInput = qs('#search');
    if(searchInput) {
        searchInput.addEventListener('input', e => {
            searchTerm = e.target.value.trim();
            render();
            drawChartSafe(); // Chart neu zeichnen wenn gefiltert wird
        });
    }

    qsa('.chip').forEach(ch=>{
      ch.addEventListener('click', ()=>{
        qsa('.chip').forEach(x=>x.classList.remove('active'));
        ch.classList.add('active');
        activeTag = ch.dataset.tag;
        render();
        drawChartSafe();
      });
    });

    const exportBtn = qs('#exportVisible');
    if(exportBtn) {
        exportBtn.addEventListener('click', ()=>{
          const visible = AGENTS.filter(matches);
          downloadObject({date: new Date(), agents: visible}, 'agents_export.json');
        });
    }

    // --- CHART LOGIK ---
    const chartCanvas = qs('#chart');
    
    // Wrapper-Funktion, damit wir sie überall aufrufen können
    function drawChartSafe() {
        if(!chartCanvas) return; // Abbrechen wenn kein Canvas da ist
        
        const ctx = chartCanvas.getContext('2d');
        // Canvas Größe anpassen
        const W = chartCanvas.width = chartCanvas.clientWidth * (window.devicePixelRatio||1);
        const H = chartCanvas.height = 160 * (window.devicePixelRatio||1);
        
        // Filtern nach Agenten, die überhaupt einen Score haben
        const visible = AGENTS.filter(matches).filter(a => a.honesty_score_demo !== undefined);
        
        if(visible.length === 0) {
            ctx.clearRect(0,0,W,H);
            return; 
        }
        
        const pad = 16; 
        const values = visible.map(a => a.honesty_score_demo);
        // Einfache Balkenberechnung
        const barW = (W - pad*2) / values.length - 5;
        
        ctx.clearRect(0,0,W,H); // Reset
        
        values.forEach((v, i) => {
            // Farbe: abwechselnd TUHH Cyan / Accent
            ctx.fillStyle = i%2 ? '#00B5B0' : '#37E3E0';
            const barH = v * (H - pad*2);
            const x = pad + i * (barW + 5);
            const y = H - pad - barH;
            
            ctx.fillRect(x, y, barW, barH);
            
            // Label unten
            ctx.fillStyle = '#4B5563';
            ctx.font = "12px sans-serif";
            ctx.textAlign = "center";
            // ID als Label unter den Balken
            if(visible[i].id) ctx.fillText(visible[i].id, x + barW/2, H - 2);
        });
        
        // Achsenlinien
        ctx.strokeStyle = '#ddd';
        ctx.beginPath();
        ctx.moveTo(pad, H-pad); ctx.lineTo(W-pad, H-pad);
        ctx.stroke();
    }

    // Chart Initialisierung
    if(chartCanvas) {
        drawChartSafe();
        
        const refreshBtn = qs('#refreshChart');
        if(refreshBtn) refreshBtn.addEventListener('click', () => {
            // Hier könnte man Noise hinzufügen, wir zeichnen einfach neu
            drawChartSafe();
        });
    }

} // --- ENDE IF cardsContainer ---


// ===================================================================
// 4. LOGIK FÜR FEEDBACK FORMULAR (Sidebar)
// Läuft nur, wenn das Formular existiert
// ===================================================================
const fbForm = qs('#feedbackForm');

if(fbForm) {
    fbForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      toast('Feedback simulated save (Local Only).');
      e.target.reset();
    });
    
    const fbExport = qs('#exportFeedback');
    if(fbExport) {
        fbExport.addEventListener('click', () => toast("No feedback to export yet"));
    }
}