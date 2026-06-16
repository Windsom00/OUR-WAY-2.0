// Render procedures
const procContainer = document.getElementById("procedureButtons");
Home_procedures.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "btn-procedure";
    btn.textContent = p.name;
    btn.onclick = () => window.open(p.link, "_blank");
    procContainer.appendChild(btn);
});

// Render meetings by level
const meetContainer = document.getElementById("meetingLevels");
    levels.forEach(lvl => {
        const col = document.createElement("div");
        col.className = "meetings-col";
        col.innerHTML = `<div class="row-arrow2">↓</div>`;

        const pairs = [
  { internal: meetings[0], client: meetings[1] },
  { internal: meetings[2], client: meetings[3] },
  { internal: meetings[4], client: meetings[5] },
];

pairs.forEach((pair, pairIndex) => {
  [pair.internal, pair.client].forEach(m => {
    const btn = document.createElement("button");
    btn.className = "btn-meeting";
    btn.textContent = `${m.label} ${lvl}`;
    btn.onclick = () => window.open(m.link, "_blank");
    col.appendChild(btn);
  });

  // Espace après chaque paire sauf la dernière
  if (pairIndex < pairs.length - 1) {
    const spacer = document.createElement("div");
    spacer.style.marginBottom = "8px";
    col.appendChild(spacer);
  }
});

        meetContainer.appendChild(col);
    });