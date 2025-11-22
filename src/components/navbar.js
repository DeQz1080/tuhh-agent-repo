// src/components/navbar.js

// Der gesamte HTML-Code aus dem alten <header>-Tag.
// Wichtig: Wir ergänzen die Navigation zu Projects/Resources.
export const NAV_HTML = `
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
`;

// Funktion zum Einfügen des Headers in den Body.
export function setupNavbar() {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
}