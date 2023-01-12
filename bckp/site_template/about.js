import Menu from "./Menu.js";

const MAX_WIDTH = parseFloat(
  getComputedStyle(document.documentElement)
    .getPropertyValue("--max-width")
    .replace("px", "")
);
let is_menu_open = false;

window.onload = () => {
  new Menu();
};
window.onresize = () => {
  is_menu_open = window.innerWidth < MAX_WIDTH;
};
