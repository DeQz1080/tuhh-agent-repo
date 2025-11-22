(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const C=`
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
`;function R(){document.body.insertAdjacentHTML("afterbegin",C)}R();let l=[];async function T(){try{console.log("🔄 Starte Laden der Agenten-Daten...");const[s,n]=await Promise.all([fetch("./agents_synthetic_baseline.json"),fetch("./agents_human_mirror.json")]);if(console.log("📡 Response Status:",{synthetic:s.status,humanMirror:n.status}),!s.ok)throw console.error("❌ Fehler beim Laden von agents_synthetic_baseline.json:",s.status,s.statusText),new Error(`Fehler beim Laden von synthetic: ${s.status}`);if(!n.ok)throw console.error("❌ Fehler beim Laden von agents_human_mirror.json:",n.status,n.statusText),new Error(`Fehler beim Laden von humanMirror: ${n.status}`);const r=await s.json(),t=await n.json();console.log("✅ Daten geladen:"),console.log("  - Synthetische Agenten:",r?.length||0),console.log("  - Human Mirror Agenten:",t?.length||0);const e=Array.isArray(r)?r:[],o=Array.isArray(t)?t:[],i=Array.isArray(o[0])?o.flat():o;l=[...e,...i],console.log("📊 Gesamtanzahl geladener Agenten:",l.length),console.log("🚀 Initialisiere App..."),H()}catch(s){console.error("❌ Fehler beim Laden der Agenten-Daten:",s),console.error("Stack:",s.stack),l=[],H()}}T();const a=s=>document.querySelector(s),E=s=>Array.from(document.querySelectorAll(s));function x(s="Copied to clipboard"){const n=a("#toast");n&&(n.textContent=s,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1400))}function _(s,n){const r=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),t=URL.createObjectURL(r),e=document.createElement("a");e.href=t,e.download=n,e.click(),URL.revokeObjectURL(t)}function O(s,n){const r=new Blob([s],{type:"text/plain"}),t=URL.createObjectURL(r),e=document.createElement("a");e.href=t,e.download=n,e.click(),URL.revokeObjectURL(t)}function y(s){return s?s.toString().replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]):""}let L="all",k="";function $(s){const n=s.tags?s.tags.join(" "):"",t=(s.id+" "+s.title+" "+(s.personality||"")+" "+(s.task||"")+" "+(s.origin||"")+" "+n).toLowerCase().includes(k.toLowerCase()),e=L==="all"||s.tags&&s.tags.includes(L);return t&&e}function w(){const s=a("#cards");if(!s)return;s.innerHTML="";const n=l.filter($),r=a("#resultCount");r&&(r.textContent=`${n.length} agent${n.length===1?"":"s"}`),n.forEach(t=>{const e=document.createElement("article");e.className="card";const o=t.task?`<span class="badge">Task: ${t.task}</span>`:"",i=t.personality?`<span class="badge">Persona: ${t.personality}</span>`:"",u=t.origin?`<span class="badge">Origin: ${t.origin}</span>`:"",d=t.tags?t.tags.map(f=>`<span class="pill">#${f}</span>`).join(""):"";let c="";if(t.hexaco||t.demographics||t.reflections){let f=t.hexaco?`<h4>HEXACO</h4><div class="sec small mono" style="font-size:12px">${Object.entries(t.hexaco).map(([p,b])=>`<b>${p}</b>: ${b}`).join(" | ")}</div>`:"",S=t.demographics?`<h4>Demographics</h4><div class="sec small mono" style="font-size:12px">${Object.entries(t.demographics).map(([p,b])=>`<b>${p}</b>: ${b}`).join("<br>")}</div>`:"",j=t.reflections?`<h4>Reflections</h4>${t.reflections.map(p=>`<div class="small"><i>${p.topic}:</i> ${p.text}</div>`).join("")}`:"";c+=`<details><summary>Demographics & Traits</summary><div class="sec" style="display:grid; gap:10px">${S}${f}${j}</div></details>`}t.prompt&&(c+=`
                <details>
                  <summary>Prompt template</summary>
                  <div class="sec mono">${y(t.prompt)}</div>
                  <div class="btns">
                    <button class="btn copy-prompt">Copy prompt</button>
                    <button class="btn dl-txt">Download .txt</button>
                  </div>
                </details>`),t.example_output&&(c+=`
               <details>
                 <summary>Example output</summary>
                 <div class="sec mono">${y(JSON.stringify(t.example_output,null,2))}</div>
               </details>`),c+=`
            <details>
              <summary>How to reproduce</summary>
              <div class="sec"><ol>${(t.howto||["See general documentation"]).map(f=>`<li>${y(f)}</li>`).join("")}</ol></div>
              <div class="btns"><button class="btn dl-profile">Download Profile JSON</button></div>
            </details>
        `,e.innerHTML=`
          <div class="card-head">
            <div>
              <div class="card-title">${t.id} — ${t.title}</div>
              <div class="meta">${o}${i}${u}</div>
            </div>
            <div class="row">${d}</div>
          </div>
          <div class="accordion">${c}</div>
        `;const m=e.querySelector(".copy-prompt");m&&m.addEventListener("click",async()=>{await navigator.clipboard.writeText(t.prompt),x("Prompt copied!")});const h=e.querySelector(".dl-txt");h&&h.addEventListener("click",()=>O(t.prompt,`${t.id}_prompt.txt`));const v=e.querySelector(".dl-profile");v&&v.addEventListener("click",()=>{_(t,`${t.id}_profile.json`)}),s.appendChild(e)})}function g(){const s=a("#chart");if(!s)return;const n=s.getContext("2d"),r=s.width=s.clientWidth*(window.devicePixelRatio||1),t=s.height=160*(window.devicePixelRatio||1),e=l.filter($).filter(d=>d.honesty_score_demo!==void 0);if(e.length===0){n.clearRect(0,0,r,t);return}const o=16,i=e.map(d=>d.honesty_score_demo),u=(r-o*2)/i.length-5;n.clearRect(0,0,r,t),i.forEach((d,c)=>{n.fillStyle=c%2?"#00B5B0":"#37E3E0";const m=d*(t-o*2),h=o+c*(u+5),v=t-o-m;n.fillRect(h,v,u,m),n.fillStyle="#4B5563",n.font="12px sans-serif",n.textAlign="center",e[c].id&&n.fillText(e[c].id,h+u/2,t-2)}),n.strokeStyle="#ddd",n.beginPath(),n.moveTo(o,t-o),n.lineTo(r-o,t-o),n.stroke()}function B(){if(!a("#cards"))return;const n=a("#search");n&&(n.removeEventListener("input",n._inputHandler),n._inputHandler=e=>{k=e.target.value.trim(),w(),g()},n.addEventListener("input",n._inputHandler)),E(".chip").forEach(e=>{e.removeEventListener("click",e._chipHandler),e._chipHandler=()=>{E(".chip").forEach(o=>o.classList.remove("active")),e.classList.add("active"),L=e.dataset.tag,w(),g()},e.addEventListener("click",e._chipHandler)});const r=a("#exportVisible");if(r&&(r.removeEventListener("click",r._exportHandler),r._exportHandler=()=>{const e=l.filter($);_({date:new Date,agents:e},"agents_export.json")},r.addEventListener("click",r._exportHandler)),a("#chart")){const e=a("#refreshChart");e&&(e.removeEventListener("click",e._refreshHandler),e._refreshHandler=()=>{g()},e.addEventListener("click",e._refreshHandler))}}const A=a("#feedbackForm");if(A){A.addEventListener("submit",n=>{n.preventDefault(),x("Feedback simulated save (Local Only)."),n.target.reset()});const s=a("#exportFeedback");s&&s.addEventListener("click",()=>x("No feedback to export yet"))}function H(){console.log("🔧 initApp() aufgerufen, AGENTS.length:",l.length);const s=a("#cards");s?(console.log("✅ cardsContainer gefunden"),B(),l.length>0?(console.log("🎨 Rendere Agenten..."),w(),g(),console.log("✅ Rendering abgeschlossen")):(console.warn("⚠️ Keine Agenten-Daten vorhanden"),s.innerHTML='<div style="padding:20px; color:#999; grid-column:1/-1; text-align:center">Keine Agenten-Daten gefunden.</div>')):console.warn("⚠️ cardsContainer nicht gefunden - möglicherweise nicht auf der Hauptseite")}
