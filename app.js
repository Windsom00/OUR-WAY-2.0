// ─── State ────────────────────────────────────────────────────────────────────

let selectedPhaseId    = "opportunity";
let selectedCategoryId = "all";
let query              = "";

// ─── DOM references ───────────────────────────────────────────────────────────

const bidTrack      = document.getElementById("bidTrack");
const realTrack     = document.getElementById("realTrack");
const procedureList = document.getElementById("procedureList");
const drawer        = document.getElementById("drawer");
const drawerTitle   = document.getElementById("drawerTitle");
const drawerMeta    = document.getElementById("drawerMeta");
const drawerBody    = document.getElementById("drawerBody");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gatesAfter(phaseId) {
  return gates.filter(g => g.afterPhase === phaseId);
}

// ─── Render: gate button ──────────────────────────────────────────────────────
function makeGateButton(gate) {
  const wrapper = document.createElement("div");
  const isRealGate = gate.stream === "real";
  wrapper.className = `gate-wrapper ${isRealGate ? "gate-wrapper--real" : "gate-wrapper--bid"}`;

  // Badge au-dessus du bouton
  const badge = document.createElement("span");
  badge.className = gate.badge === "Internal" ? "gate-node-badge" : "gate-node-badge2";
  badge.textContent = gate.badge;

  // Bouton contenant uniquement le symbole
  const btn = document.createElement("button");
  btn.type      = "button";
  btn.className = isRealGate ? "gate-node2" : "gate-node";
  btn.title     = gate.title;
  btn.innerHTML = `<span class="gate-node-symbol">${gate.symbol}</span>`;
  btn.addEventListener("click", () => window.open(gate.link, "_blank"));

  // Titre en dessous du bouton
  const title = document.createElement("p");
  if (gate.title == "Kick Off Meetings" || gate.title == "Project Reviews" || gate.title == "Closure Meetings") {
    title.className   = "gate-node-title2";
  }
  else if (gate.title == "Steering Comitees"){
    title.className   = "gate-node-title3";
  }
  else {
    title.className   = "gate-node-title";
  }
  title.innerHTML   = gate.title;
  wrapper.appendChild(badge);
  wrapper.appendChild(btn);
  wrapper.appendChild(title);

  return wrapper;
}

// ─── Render: phase tracks ─────────────────────────────────────────────────────

function renderPhaseTracks() {
  bidTrack.innerHTML  = "";
  realTrack.innerHTML = "";

  // BID phases (stream === "bid"), interleaved with gates
  const bidPhases = phases.filter(p => p.stream === "bid");
  bidPhases.forEach(phase => {
    const wrapper = document.createElement("div");
    wrapper.className = "phase-wrapper";

    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}`, "_blank");
    });

    const note = document.createElement("p");
    note.className = "phase-note";
    note.textContent = phase.note;

    wrapper.appendChild(node);
    wrapper.appendChild(note);
    bidTrack.appendChild(wrapper);  // (ou realTrack)

    // Insert gates that come after this phase
    gatesAfter(phase.id).filter(g => !g.stream || g.stream === "transition").forEach(gate => {
      bidTrack.appendChild(makeGateButton(gate));
    });
  });

  // REAL phases (stream === "real"), interleaved with gates
  const realPhases = phases.filter(p => p.stream === "real");
  realPhases.forEach(phase => {
    const wrapper = document.createElement("div");
    wrapper.className = "phase-wrapper";

    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}`, "_blank");
    });

    const note = document.createElement("p");
    note.className = "phase-note";
    note.textContent = phase.note;

    wrapper.appendChild(node);
    wrapper.appendChild(note);
    realTrack.appendChild(wrapper);  // (ou realTrack)

    // Insert gates that come after this phase (real stream)
    gatesAfter(phase.id).filter(g => g.stream === "real").forEach(gate => {
      realTrack.appendChild(makeGateButton(gate));
    });
  });
}

// ─── Render: procedure list ───────────────────────────────────────────────────

function renderProcedures() {
  procedureList.innerHTML = "";

  Procedure_link.forEach(proc => {
    const button = document.createElement("button");
    button.type      = "button";
    button.className = "procedure-button";
    button.textContent = proc.procedure;
    button.addEventListener("click", () => {
      if (proc.link) window.open(proc.link, "_blank");
    });
    procedureList.appendChild(button);
  });
}

// ─── Main render ──────────────────────────────────────────────────────────────

function render() {
  renderPhaseTracks();
  renderProcedures();
}

// ─── Event listeners ─────────────────────────────────────────────────────────

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDrawer();
});

// ─── Init ─────────────────────────────────────────────────────────────────────

render();
