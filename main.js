const duckButtons = [...document.querySelectorAll("[data-duck]")];
const boredDuck = document.querySelector("[data-duck-bored]");
const alertDuck = document.querySelector("[data-duck-alert]");
const projectRows = [...document.querySelectorAll("[data-project]")];
const previews = [...document.querySelectorAll("[data-preview]")];
const previewPath = document.querySelector("[data-preview-path]");
const status = document.querySelector("[data-status]");

function selectProject(name) {
  projectRows.forEach((row) => {
    const active = row.dataset.project === name;
    row.classList.toggle("is-selected", active);
    row.setAttribute("aria-selected", String(active));
  });

  previews.forEach((preview) => {
    preview.hidden = preview.dataset.preview !== name;
  });

  const filename = name === "about" ? "about.txt" : name === "contact" ? "contact.txt" : `${name}-gpt`;
  previewPath.textContent = `~/jellybytes/experiments/${filename}`;
  status.textContent = `${filename} selected · ready to inspect`;
}

projectRows.forEach((row) => {
  row.addEventListener("click", () => selectProject(row.dataset.project));
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;
  const currentIndex = projectRows.findIndex((row) => row.classList.contains("is-selected"));
  const direction = event.key === "ArrowDown" ? 1 : -1;
  const nextIndex = (currentIndex + direction + projectRows.length) % projectRows.length;
  event.preventDefault();
  projectRows[nextIndex].focus();
  selectProject(projectRows[nextIndex].dataset.project);
});

if (duckButtons.length && boredDuck && alertDuck) {
  duckButtons.forEach((duckButton) => duckButton.addEventListener("click", () => {
    boredDuck.classList.remove("is-visible");
    alertDuck.classList.add("is-visible");

    window.setTimeout(() => {
      alertDuck.classList.remove("is-visible");
      boredDuck.classList.add("is-visible");
    }, 420);
  }));
}
