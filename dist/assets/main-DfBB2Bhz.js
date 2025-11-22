(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const H=`
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
`;function P(){document.body.insertAdjacentHTML("afterbegin",H)}P();let h=[];async function _(){try{const[o,i]=await Promise.all([fetch("./agents_synthetic_baseline.json"),fetch("./agents_human_mirror.json")]);if(!o.ok||!i.ok)throw new Error("Fehler beim Laden der JSON-Dateien");const r=await o.json(),a=await i.json();console.log("--------------------------------"),console.log("DEBUG: Start Main.js"),console.log("Synthetische Daten:",r),console.log("Human Mirror Daten:",a);const s=Array.isArray(r)?r:[],n=Array.isArray(a)?a:[],l=Array.isArray(n[0])?n.flat():n;h=[...s,...l],console.log("Anzahl geladener Agenten:",h.length),R()}catch(o){console.error("Fehler beim Laden der Agenten-Daten:",o),h=[],R()}}const m=o=>document.querySelector(o),S=o=>Array.from(document.querySelectorAll(o));function k(o="Copied to clipboard"){const i=m("#toast");i&&(i.textContent=o,i.classList.add("show"),setTimeout(()=>i.classList.remove("show"),1400))}function O(o,i){const r=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),a=URL.createObjectURL(r),s=document.createElement("a");s.href=a,s.download=i,s.click(),URL.revokeObjectURL(a)}function N(o,i){const r=new Blob([o],{type:"text/plain"}),a=URL.createObjectURL(r),s=document.createElement("a");s.href=a,s.download=i,s.click(),URL.revokeObjectURL(a)}function j(o){return o?o.toString().replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i]):""}const A=m("#cards");if(A){let r=function(t){const p=t.tags?t.tags.join(" "):"",c=(t.id+" "+t.title+" "+(t.personality||"")+" "+(t.task||"")+" "+(t.origin||"")+" "+p).toLowerCase().includes(i.toLowerCase()),d=o==="all"||t.tags&&t.tags.includes(o);return c&&d},a=function(){A.innerHTML="";const t=h.filter(r),p=m("#resultCount");p&&(p.textContent=`${t.length} agent${t.length===1?"":"s"}`),t.forEach(e=>{const c=document.createElement("article");c.className="card";const d=e.task?`<span class="badge">Task: ${e.task}</span>`:"",w=e.personality?`<span class="badge">Persona: ${e.personality}</span>`:"",b=e.origin?`<span class="badge">Origin: ${e.origin}</span>`:"",f=e.tags?e.tags.map(L=>`<span class="pill">#${L}</span>`).join(""):"";let u="";if(e.hexaco||e.demographics||e.reflections){let L=e.hexaco?`<h4>HEXACO</h4><div class="sec small mono" style="font-size:12px">${Object.entries(e.hexaco).map(([v,E])=>`<b>${v}</b>: ${E}`).join(" | ")}</div>`:"",T=e.demographics?`<h4>Demographics</h4><div class="sec small mono" style="font-size:12px">${Object.entries(e.demographics).map(([v,E])=>`<b>${v}</b>: ${E}`).join("<br>")}</div>`:"",C=e.reflections?`<h4>Reflections</h4>${e.reflections.map(v=>`<div class="small"><i>${v.topic}:</i> ${v.text}</div>`).join("")}`:"";u+=`<details><summary>Demographics & Traits</summary><div class="sec" style="display:grid; gap:10px">${T}${L}${C}</div></details>`}e.prompt&&(u+=`
                <details>
                  <summary>Prompt template</summary>
                  <div class="sec mono">${j(e.prompt)}</div>
                  <div class="btns">
                    <button class="btn copy-prompt">Copy prompt</button>
                    <button class="btn dl-txt">Download .txt</button>
                  </div>
                </details>`),e.example_output&&(u+=`
               <details>
                 <summary>Example output</summary>
                 <div class="sec mono">${j(JSON.stringify(e.example_output,null,2))}</div>
               </details>`),u+=`
            <details>
              <summary>How to reproduce</summary>
              <div class="sec"><ol>${(e.howto||["See general documentation"]).map(L=>`<li>${j(L)}</li>`).join("")}</ol></div>
              <div class="btns"><button class="btn dl-profile">Download Profile JSON</button></div>
            </details>
        `,c.innerHTML=`
          <div class="card-head">
            <div>
              <div class="card-title">${e.id} — ${e.title}</div>
              <div class="meta">${d}${w}${b}</div>
            </div>
            <div class="row">${f}</div>
          </div>
          <div class="accordion">${u}</div>
        `;const g=c.querySelector(".copy-prompt");g&&g.addEventListener("click",async()=>{await navigator.clipboard.writeText(e.prompt),k("Prompt copied!")});const x=c.querySelector(".dl-txt");x&&x.addEventListener("click",()=>N(e.prompt,`${e.id}_prompt.txt`));const $=c.querySelector(".dl-profile");$&&$.addEventListener("click",()=>{O(e,`${e.id}_profile.json`)}),A.appendChild(c)})},y=function(){if(!l)return;const t=l.getContext("2d"),p=l.width=l.clientWidth*(window.devicePixelRatio||1),e=l.height=160*(window.devicePixelRatio||1),c=h.filter(r).filter(f=>f.honesty_score_demo!==void 0);if(c.length===0){t.clearRect(0,0,p,e);return}const d=16,w=c.map(f=>f.honesty_score_demo),b=(p-d*2)/w.length-5;t.clearRect(0,0,p,e),w.forEach((f,u)=>{t.fillStyle=u%2?"#00B5B0":"#37E3E0";const g=f*(e-d*2),x=d+u*(b+5),$=e-d-g;t.fillRect(x,$,b,g),t.fillStyle="#4B5563",t.font="12px sans-serif",t.textAlign="center",c[u].id&&t.fillText(c[u].id,x+b/2,e-2)}),t.strokeStyle="#ddd",t.beginPath(),t.moveTo(d,e-d),t.lineTo(p-d,e-d),t.stroke()};var U=r,D=a,M=y;let o="all",i="";const s=m("#search");s&&s.addEventListener("input",t=>{i=t.target.value.trim(),a(),y()}),S(".chip").forEach(t=>{t.addEventListener("click",()=>{S(".chip").forEach(p=>p.classList.remove("active")),t.classList.add("active"),o=t.dataset.tag,a(),y()})});const n=m("#exportVisible");n&&n.addEventListener("click",()=>{const t=h.filter(r);O({date:new Date,agents:t},"agents_export.json")});const l=m("#chart");if(l){y();const t=m("#refreshChart");t&&t.addEventListener("click",()=>{y()})}}const B=m("#feedbackForm");if(B){B.addEventListener("submit",i=>{i.preventDefault(),k("Feedback simulated save (Local Only)."),i.target.reset()});const o=m("#exportFeedback");o&&o.addEventListener("click",()=>k("No feedback to export yet"))}function R(){const o=m("#cards");o&&(h.length>0?(D(),M()):o.innerHTML='<div style="padding:20px; color:#999; grid-column:1/-1; text-align:center">Keine Agenten-Daten gefunden.</div>')}_();
