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
  const btn = document.createElement("button");
  btn.type      = "button";
  if (gate.stream == "real"){
    btn.className = "gate-node2";
  }
  else{
    btn.className = "gate-node";
  }
  btn.title     = gate.title;
  if (gate.badge == "Internal")
    {
      btn.innerHTML = `
    <span class="gate-node-badge">${gate.badge}</span>
    <span class="gate-node-symbol">${gate.symbol}</span>
    <span class="gate-node-title">${gate.title}</span>
  `;}
  else {
    btn.innerHTML = `
    <span class="gate-node-badge2">${gate.badge}</span>
    <span class="gate-node-symbol">${gate.symbol}</span>
    <span class="gate-node-title">${gate.title}</span>
  `;}
  
  btn.addEventListener("click", () => window.open(gate.link, "_blank"));
  return btn;
}

// ─── Render: phase tracks ─────────────────────────────────────────────────────

function renderPhaseTracks() {
  bidTrack.innerHTML  = "";
  realTrack.innerHTML = "";

  // BID phases (stream === "bid"), interleaved with gates
  const bidPhases = phases.filter(p => p.stream === "bid");
  bidPhases.forEach(phase => {
    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
      <span class="phase-note">${phase.note}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}`, "_blank");
    });
    bidTrack.appendChild(node);

    // Insert gates that come after this phase
    gatesAfter(phase.id).filter(g => !g.stream || g.stream === "transition").forEach(gate => {
      bidTrack.appendChild(makeGateButton(gate));
    });
  });

  // REAL phases (stream === "real"), interleaved with gates
  const realPhases = phases.filter(p => p.stream === "real");
  realPhases.forEach(phase => {
    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === "handover" ? " phase-node--handover" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
      <span class="phase-note">${phase.note}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}`, "_blank");
    });
    realTrack.appendChild(node);

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
