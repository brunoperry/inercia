import Gallery from "./Gallery.js";
import Menu from "./Menu.js";

const SPEED =
  parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--speed")
      .replace("s", "")
  ) * 1000;

window.onload = () => {
  new Menu();
  new Gallery();
  // create_gallery();
  create_events();
};

const create_gallery = () => {
  const items = document.querySelectorAll(".gallery-item");

  let prev_item;
  let current_item = 0;
  items[current_item].style.transform = "translateX(0)";
  items[current_item].style.visibility = "visible";
  let total_items = items.length;
  setInterval(() => {
    prev_item = current_item;
    items[current_item].style.transform = "translateX(-100%)";
    current_item++;
    if (current_item >= total_items) current_item = 0;
    items[current_item].style.transform = "translateX(0)";
    items[current_item].style.visibility = "visible";

    setTimeout(() => {
      items[prev_item].style.transform = "translateX(100%)";
      items[prev_item].style.visibility = "hidden";
    }, SPEED);
  }, 3000);
};

const create_events = () => {
  const tabs = document.querySelectorAll(".tab-item");
  const contents = document.querySelectorAll(".tab-content");
  let current_tab = tabs[0];
  let current_content = contents[0];
  const on_tab = (index) => {
    current_tab.className = "tab-item";
    current_content.className = "tab-content";

    current_tab = tabs[index];
    current_content = contents[index];

    current_tab.className = "tab-item active";
    current_content.className = "tab-content active";
  };
  tabs.forEach((tab, index) => {
    tab.onclick = () => {
      on_tab(index);
    };
  });
  tabs[0].click();
};
