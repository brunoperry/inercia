import Hero from "./Hero.js";
import Menu from "./Menu.js";
import Tabs from "./Tabs.js";

window.onload = () => {
  new Menu();
  new Hero();
  new Tabs();

  document.body.style.visibility = "visible";
  document.body.style.opacity = 1;
};
