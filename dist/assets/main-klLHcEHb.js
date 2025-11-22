(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const B=`
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
            <a href="/index.html" style="font-weight:600; color:#003B5C; margin-left:15px; text-decoration:none">Repository</a>
            <a href="/projects.html" style="color:#00B5B0; margin-left:15px; text-decoration:none">Projects</a>
            <a href="/resources.html" style="color:#00B5B0; margin-left:15px; text-decoration:none">Resources</a>
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
`;function R(){document.body.insertAdjacentHTML("afterbegin",B)}R();let d=[];async function T(){try{const[e,o]=await Promise.all([fetch("./agents_synthetic_baseline.json"),fetch("./agents_human_mirror.json")]);if(!e.ok||!o.ok)throw new Error("Fehler beim Laden der JSON-Dateien");const i=await e.json(),t=await o.json();console.log("--------------------------------"),console.log("DEBUG: Start Main.js"),console.log("Synthetische Daten:",i),console.log("Human Mirror Daten:",t);const s=Array.isArray(i)?i:[],n=Array.isArray(t)?t:[],r=Array.isArray(n[0])?n.flat():n;d=[...s,...r],console.log("Anzahl geladener Agenten:",d.length),A()}catch(e){console.error("Fehler beim Laden der Agenten-Daten:",e),d=[],A()}}const a=e=>document.querySelector(e),E=e=>Array.from(document.querySelectorAll(e));function x(e="Copied to clipboard"){const o=a("#toast");o&&(o.textContent=e,o.classList.add("show"),setTimeout(()=>o.classList.remove("show"),1400))}function S(e,o){const i=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=URL.createObjectURL(i),s=document.createElement("a");s.href=t,s.download=o,s.click(),URL.revokeObjectURL(t)}function H(e,o){const i=new Blob([e],{type:"text/plain"}),t=URL.createObjectURL(i),s=document.createElement("a");s.href=t,s.download=o,s.click(),URL.revokeObjectURL(t)}function g(e){return e?e.toString().replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]):""}let L="all",k="";function $(e){const o=e.tags?e.tags.join(" "):"",t=(e.id+" "+e.title+" "+(e.personality||"")+" "+(e.task||"")+" "+(e.origin||"")+" "+o).toLowerCase().includes(k.toLowerCase()),s=L==="all"||e.tags&&e.tags.includes(L);return t&&s}function w(){const e=a("#cards");if(!e)return;e.innerHTML="";const o=d.filter($),i=a("#resultCount");i&&(i.textContent=`${o.length} agent${o.length===1?"":"s"}`),o.forEach(t=>{const s=document.createElement("article");s.className="card";const n=t.task?`<span class="badge">Task: ${t.task}</span>`:"",r=t.personality?`<span class="badge">Persona: ${t.personality}</span>`:"",u=t.origin?`<span class="badge">Origin: ${t.origin}</span>`:"",l=t.tags?t.tags.map(h=>`<span class="pill">#${h}</span>`).join(""):"";let c="";if(t.hexaco||t.demographics||t.reflections){let h=t.hexaco?`<h4>HEXACO</h4><div class="sec small mono" style="font-size:12px">${Object.entries(t.hexaco).map(([p,b])=>`<b>${p}</b>: ${b}`).join(" | ")}</div>`:"",C=t.demographics?`<h4>Demographics</h4><div class="sec small mono" style="font-size:12px">${Object.entries(t.demographics).map(([p,b])=>`<b>${p}</b>: ${b}`).join("<br>")}</div>`:"",O=t.reflections?`<h4>Reflections</h4>${t.reflections.map(p=>`<div class="small"><i>${p.topic}:</i> ${p.text}</div>`).join("")}`:"";c+=`<details><summary>Demographics & Traits</summary><div class="sec" style="display:grid; gap:10px">${C}${h}${O}</div></details>`}t.prompt&&(c+=`
                <details>
                  <summary>Prompt template</summary>
                  <div class="sec mono">${g(t.prompt)}</div>
                  <div class="btns">
                    <button class="btn copy-prompt">Copy prompt</button>
                    <button class="btn dl-txt">Download .txt</button>
                  </div>
                </details>`),t.example_output&&(c+=`
               <details>
                 <summary>Example output</summary>
                 <div class="sec mono">${g(JSON.stringify(t.example_output,null,2))}</div>
               </details>`),c+=`
            <details>
              <summary>How to reproduce</summary>
              <div class="sec"><ol>${(t.howto||["See general documentation"]).map(h=>`<li>${g(h)}</li>`).join("")}</ol></div>
              <div class="btns"><button class="btn dl-profile">Download Profile JSON</button></div>
            </details>
        `,s.innerHTML=`
          <div class="card-head">
            <div>
              <div class="card-title">${t.id} — ${t.title}</div>
              <div class="meta">${n}${r}${u}</div>
            </div>
            <div class="row">${l}</div>
          </div>
          <div class="accordion">${c}</div>
        `;const m=s.querySelector(".copy-prompt");m&&m.addEventListener("click",async()=>{await navigator.clipboard.writeText(t.prompt),x("Prompt copied!")});const f=s.querySelector(".dl-txt");f&&f.addEventListener("click",()=>H(t.prompt,`${t.id}_prompt.txt`));const v=s.querySelector(".dl-profile");v&&v.addEventListener("click",()=>{S(t,`${t.id}_profile.json`)}),e.appendChild(s)})}function y(){const e=a("#chart");if(!e)return;const o=e.getContext("2d"),i=e.width=e.clientWidth*(window.devicePixelRatio||1),t=e.height=160*(window.devicePixelRatio||1),s=d.filter($).filter(l=>l.honesty_score_demo!==void 0);if(s.length===0){o.clearRect(0,0,i,t);return}const n=16,r=s.map(l=>l.honesty_score_demo),u=(i-n*2)/r.length-5;o.clearRect(0,0,i,t),r.forEach((l,c)=>{o.fillStyle=c%2?"#00B5B0":"#37E3E0";const m=l*(t-n*2),f=n+c*(u+5),v=t-n-m;o.fillRect(f,v,u,m),o.fillStyle="#4B5563",o.font="12px sans-serif",o.textAlign="center",s[c].id&&o.fillText(s[c].id,f+u/2,t-2)}),o.strokeStyle="#ddd",o.beginPath(),o.moveTo(n,t-n),o.lineTo(i-n,t-n),o.stroke()}const P=a("#cards");if(P){const e=a("#search");e&&e.addEventListener("input",t=>{k=t.target.value.trim(),w(),y()}),E(".chip").forEach(t=>{t.addEventListener("click",()=>{E(".chip").forEach(s=>s.classList.remove("active")),t.classList.add("active"),L=t.dataset.tag,w(),y()})});const o=a("#exportVisible");if(o&&o.addEventListener("click",()=>{const t=d.filter($);S({date:new Date,agents:t},"agents_export.json")}),a("#chart")){const t=a("#refreshChart");t&&t.addEventListener("click",()=>{y()})}}const j=a("#feedbackForm");if(j){j.addEventListener("submit",o=>{o.preventDefault(),x("Feedback simulated save (Local Only)."),o.target.reset()});const e=a("#exportFeedback");e&&e.addEventListener("click",()=>x("No feedback to export yet"))}function A(){const e=a("#cards");e&&(d.length>0?(w(),y()):e.innerHTML='<div style="padding:20px; color:#999; grid-column:1/-1; text-align:center">Keine Agenten-Daten gefunden.</div>')}T();
