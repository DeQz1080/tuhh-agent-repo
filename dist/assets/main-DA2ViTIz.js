(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const T=`
    <header>
      <div class="wrap">
        <div class="row">
          <div class="brand">
            <div class="logo" aria-hidden="true"></div>
            <div>
              <h1>TUHH Behavioral Agent Repository — MVP</h1>
              <div class="sub">Standardized generative agents for research &amp; teaching • Local demo (no backend)</div>
            </div>
          </div>
          <nav>
            <a href="./index.html" style="font-weight:600; color:#003B5C; margin-left:15px; text-decoration:none">Repository</a>
            <a href="./projects.html" style="color:#00B5B0; margin-left:15px; text-decoration:none">Projects</a>
            <a href="./resources.html" style="color:#00B5B0; margin-left:15px; text-decoration:none">Resources</a>
          </nav>
        </div>
        <div class="toolbar">
          <input id="search" type="search" placeholder="Search agents, traits, tasks, topics…" />
          <button class="chip active" data-tag="all">All</button>
          <button class="chip" data-tag="honesty">Honesty</button>
          <button class="chip" data-tag="climate">Climate</button>
          <button class="chip" data-tag="social-norms">Social Norms</button>
          <button class="chip" data-tag="teaching">Teaching</button>
          <span class="pill" id="resultCount">0 agents</span>
        </div>
      </div>
    </header>
`;function O(){document.body.insertAdjacentHTML("afterbegin",T)}O();let l=[];async function B(){try{console.log("🔄 Starte Laden der Agenten-Daten...");const[t,o]=await Promise.all([fetch("./agents_synthetic_baseline.json"),fetch("./agents_human_mirror.json")]);if(console.log("📡 Response Status:",{synthetic:t.status,humanMirror:o.status}),!t.ok)throw console.error("❌ Fehler beim Laden von agents_synthetic_baseline.json:",t.status,t.statusText),new Error(`Fehler beim Laden von synthetic: ${t.status}`);if(!o.ok)throw console.error("❌ Fehler beim Laden von agents_human_mirror.json:",o.status,o.statusText),new Error(`Fehler beim Laden von humanMirror: ${o.status}`);const a=await t.json(),e=await o.json();console.log("✅ Daten geladen:"),console.log("  - Synthetische Agenten:",a?.length||0),console.log("  - Human Mirror Agenten:",e?.length||0);const s=Array.isArray(a)?a:[],n=Array.isArray(e)?e:[],i=Array.isArray(n[0])?n.flat():n;l=[...s,...i],console.log("📊 Gesamtanzahl geladener Agenten:",l.length),console.log("🚀 Initialisiere App..."),S()}catch(t){console.error("❌ Fehler beim Laden der Agenten-Daten:",t),console.error("Stack:",t.stack),l=[],S()}}const r=t=>document.querySelector(t),A=t=>Array.from(document.querySelectorAll(t));function x(t="Copied to clipboard"){const o=r("#toast");o&&(o.textContent=t,o.classList.add("show"),setTimeout(()=>o.classList.remove("show"),1400))}function j(t,o){const a=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=URL.createObjectURL(a),s=document.createElement("a");s.href=e,s.download=o,s.click(),URL.revokeObjectURL(e)}function H(t,o){const a=new Blob([t],{type:"text/plain"}),e=URL.createObjectURL(a),s=document.createElement("a");s.href=e,s.download=o,s.click(),URL.revokeObjectURL(e)}function y(t){return t?t.toString().replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]):""}let L="all",k="";function $(t){const o=t.tags?t.tags.join(" "):"",e=(t.id+" "+t.title+" "+(t.personality||"")+" "+(t.task||"")+" "+(t.origin||"")+" "+o).toLowerCase().includes(k.toLowerCase()),s=L==="all"||t.tags&&t.tags.includes(L);return e&&s}function w(){const t=r("#cards");if(!t)return;t.innerHTML="";const o=l.filter($),a=r("#resultCount");a&&(a.textContent=`${o.length} agent${o.length===1?"":"s"}`),o.forEach(e=>{const s=document.createElement("article");s.className="card";const n=e.task?`<span class="badge">Task: ${e.task}</span>`:"",i=e.personality?`<span class="badge">Persona: ${e.personality}</span>`:"",u=e.origin?`<span class="badge">Origin: ${e.origin}</span>`:"",d=e.tags?e.tags.map(f=>`<span class="pill">#${f}</span>`).join(""):"";let c="";if(e.hexaco||e.demographics||e.reflections){let f=e.hexaco?`<h4>HEXACO</h4><div class="sec small mono" style="font-size:12px">${Object.entries(e.hexaco).map(([p,b])=>`<b>${p}</b>: ${b}`).join(" | ")}</div>`:"",C=e.demographics?`<h4>Demographics</h4><div class="sec small mono" style="font-size:12px">${Object.entries(e.demographics).map(([p,b])=>`<b>${p}</b>: ${b}`).join("<br>")}</div>`:"",R=e.reflections?`<h4>Reflections</h4>${e.reflections.map(p=>`<div class="small"><i>${p.topic}:</i> ${p.text}</div>`).join("")}`:"";c+=`<details><summary>Demographics & Traits</summary><div class="sec" style="display:grid; gap:10px">${C}${f}${R}</div></details>`}e.prompt&&(c+=`
                <details>
                  <summary>Prompt template</summary>
                  <div class="sec mono">${y(e.prompt)}</div>
                  <div class="btns">
                    <button class="btn copy-prompt">Copy prompt</button>
                    <button class="btn dl-txt">Download .txt</button>
                  </div>
                </details>`),e.example_output&&(c+=`
               <details>
                 <summary>Example output</summary>
                 <div class="sec mono">${y(JSON.stringify(e.example_output,null,2))}</div>
               </details>`),c+=`
            <details>
              <summary>How to reproduce</summary>
              <div class="sec"><ol>${(e.howto||["See general documentation"]).map(f=>`<li>${y(f)}</li>`).join("")}</ol></div>
              <div class="btns"><button class="btn dl-profile">Download Profile JSON</button></div>
            </details>
        `,s.innerHTML=`
          <div class="card-head">
            <div>
              <div class="card-title">${e.id} — ${e.title}</div>
              <div class="meta">${n}${i}${u}</div>
            </div>
            <div class="row">${d}</div>
          </div>
          <div class="accordion">${c}</div>
        `;const h=s.querySelector(".copy-prompt");h&&h.addEventListener("click",async()=>{await navigator.clipboard.writeText(e.prompt),x("Prompt copied!")});const m=s.querySelector(".dl-txt");m&&m.addEventListener("click",()=>H(e.prompt,`${e.id}_prompt.txt`));const v=s.querySelector(".dl-profile");v&&v.addEventListener("click",()=>{j(e,`${e.id}_profile.json`)}),t.appendChild(s)})}function g(){const t=r("#chart");if(!t)return;const o=t.getContext("2d"),a=t.width=t.clientWidth*(window.devicePixelRatio||1),e=t.height=160*(window.devicePixelRatio||1),s=l.filter($).filter(d=>d.honesty_score_demo!==void 0);if(s.length===0){o.clearRect(0,0,a,e);return}const n=16,i=s.map(d=>d.honesty_score_demo),u=(a-n*2)/i.length-5;o.clearRect(0,0,a,e),i.forEach((d,c)=>{o.fillStyle=c%2?"#00B5B0":"#37E3E0";const h=d*(e-n*2),m=n+c*(u+5),v=e-n-h;o.fillRect(m,v,u,h),o.fillStyle="#4B5563",o.font="12px sans-serif",o.textAlign="center",s[c].id&&o.fillText(s[c].id,m+u/2,e-2)}),o.strokeStyle="#ddd",o.beginPath(),o.moveTo(n,e-n),o.lineTo(a-n,e-n),o.stroke()}const _=r("#cards");if(_){const t=r("#search");t&&t.addEventListener("input",e=>{k=e.target.value.trim(),w(),g()}),A(".chip").forEach(e=>{e.addEventListener("click",()=>{A(".chip").forEach(s=>s.classList.remove("active")),e.classList.add("active"),L=e.dataset.tag,w(),g()})});const o=r("#exportVisible");if(o&&o.addEventListener("click",()=>{const e=l.filter($);j({date:new Date,agents:e},"agents_export.json")}),r("#chart")){const e=r("#refreshChart");e&&e.addEventListener("click",()=>{g()})}}const E=r("#feedbackForm");if(E){E.addEventListener("submit",o=>{o.preventDefault(),x("Feedback simulated save (Local Only)."),o.target.reset()});const t=r("#exportFeedback");t&&t.addEventListener("click",()=>x("No feedback to export yet"))}function S(){console.log("🔧 initApp() aufgerufen, AGENTS.length:",l.length);const t=r("#cards");t?(console.log("✅ cardsContainer gefunden"),l.length>0?(console.log("🎨 Rendere Agenten..."),w(),g(),console.log("✅ Rendering abgeschlossen")):(console.warn("⚠️ Keine Agenten-Daten vorhanden"),t.innerHTML='<div style="padding:20px; color:#999; grid-column:1/-1; text-align:center">Keine Agenten-Daten gefunden.</div>')):console.warn("⚠️ cardsContainer nicht gefunden - möglicherweise nicht auf der Hauptseite")}B();
