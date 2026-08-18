const duckButton = document.querySelector("[data-duck]");
const boredDuck = document.querySelector("[data-duck-bored]");
const alertDuck = document.querySelector("[data-duck-alert]");
const tabs = [...document.querySelectorAll("[data-tab]")];
const panels = [...document.querySelectorAll("[data-panel]")];

function activateTab(name) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  panels.forEach((panel) => {
    const active = panel.dataset.panel === name;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

if (duckButton && boredDuck && alertDuck) {
  duckButton.addEventListener("click", () => {
    boredDuck.classList.remove("is-visible");
    alertDuck.classList.add("is-visible");

    window.setTimeout(() => {
      alertDuck.classList.remove("is-visible");
      boredDuck.classList.add("is-visible");
    }, 420);
  });
}
