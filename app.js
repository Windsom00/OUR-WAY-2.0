// ─── State ────────────────────────────────────────────────────────────────────

let selectedPhaseId    = "opportunity";
let selectedCategoryId = "all";
let query              = "";

// ─── DOM references ───────────────────────────────────────────────────────────

const bidTrack      = document.getElementById("bidTrack");
const realTrack     = document.getElementById("realTrack");
const categoryGrid  = document.getElementById("categoryGrid");
const matrixHead    = document.getElementById("matrixHead");
const matrixTitle   = document.getElementById("matrixTitle");
const matrixSubtitle= document.getElementById("matrixSubtitle");
const checklistTable= document.getElementById("checklistTable");
const procedureList = document.getElementById("procedureList");
const boardTitle    = document.getElementById("boardTitle");
const taskCount     = document.getElementById("taskCount");
const selectionBody = document.getElementById("selectionBody");
const drawer        = document.getElementById("drawer");
const drawerTitle   = document.getElementById("drawerTitle");
const drawerMeta    = document.getElementById("drawerMeta");
const drawerBody    = document.getElementById("drawerBody");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function phaseById(id) {
  return phases.find(phase => phase.id === id);
}

function categoryById(id) {
  return categories.find(category => category.id === id);
}

function taskKey(phase, category, task) {
  return `plc.done.${phase.id}.${category.id}.${encodeURIComponent(task)}`;
}

function isTaskDone(phase, category, task) {
  return localStorage.getItem(taskKey(phase, category, task)) === "true";
}

function setTaskDone(phase, category, task, done) {
  localStorage.setItem(taskKey(phase, category, task), done ? "true" : "false");
}

function doneCount(phase, category) {
  return (phase.data[category.id] || []).filter(task => isTaskDone(phase, category, task)).length;
}

function matchesQuery(phase, category, task) {
  if (!query) return true;
  const haystack = [phase.title, phase.kicker, category.name, category.code, task].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

// ─── Render: phase tracks ─────────────────────────────────────────────────────

function renderPhaseTracks() {
  bidTrack.innerHTML  = "";
  realTrack.innerHTML = "";

  phases.forEach(phase => {
    const node = document.createElement("button");
    node.type      = "button";
    node.className = `phase-node ${phase.color}${phase.id === selectedPhaseId ? " active" : ""}`;
    node.innerHTML = `
      <span class="phase-title">${phase.title}</span>
      <span class="phase-kicker">${phase.kicker || "&nbsp;"}</span>
      <span class="phase-note">${phase.note}</span>
    `;
    node.addEventListener("click", () => {
      window.open(`matrix.html?phase=${phase.id}`, "_blank");
    });

    if (phase.stream === "bid") {
      bidTrack.appendChild(node);
    } else {
      realTrack.appendChild(node);
    }
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
      if (proc.link) {
        window.open(proc.link, "_blank");
      }
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
