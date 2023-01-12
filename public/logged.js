import Hero from "./Hero.js";
import Menu from "./Menu.js";
import Modal from "./Modal.js";
import Tabs from "./Tabs.js";

let modal;

const setup = () => {
  const hero_container = document.querySelector("#hero");
  const hero_items = hero_container.querySelectorAll(".hero-item");

  hero_container.querySelector(".hero-add-button").onclick = () => modal.open("add-hero");

  hero_items.forEach((item) => {
    item.querySelector(".delete-button").onclick = (e) => {
      modal.open("delete-hero", {
        id: item.id,
        image: item.querySelector("img").src,
      });
    };
    item.querySelector(".update-button").onclick = (e) => {
      console.log(item.querySelector("img"));
      modal.open("update-hero", {
        id: item.id,
        image: item.querySelector("img").src,
        link: item.querySelector("a").href,
        is_active: item.querySelector("#hero-item-is-active").value,
      });
    };
  });

  const news_container = document.querySelector("#news");
  const news_items = news_container.querySelectorAll(".news-item");

  news_container.querySelector(".news-add-button").onclick = () => {
    console.log("ckick news");
    modal.open("add-news");
  };
  news_items.forEach((item) => {
    item.querySelector(".delete-button").onclick = (e) => {
      modal.open("delete-news", {
        id: item.id,
        content: item.querySelector("p").innerText,
      });
    };
    item.querySelector(".update-button").onclick = (e) => {
      modal.open("update-news", {
        id: item.id,
        content: item.querySelector("p").innerText,
      });
    };
  });

  const events_container = document.querySelector("#events");
  const event_items = events_container.querySelectorAll(".event-item");

  events_container.querySelector(".event-add-button").onclick = () => {
    modal.open("add-event");
  };
  event_items.forEach((item) => {
    item.querySelector(".delete-button").onclick = (e) => {
      modal.open("delete-event", {
        id: item.id,
        name: item.querySelector("a").innerText,
      });
    };
    item.querySelector(".update-button").onclick = (e) => {
      modal.open("update-event", {
        id: item.id,
        name: item.querySelector("#event_name").value,
        link: item.querySelector("#event_link").value,
        type: item.type,
        status: item.status,
      });
    };
  });
};

window.onload = () => {
  new Menu();
  const hero = new Hero();
  // hero.goto(0);
  new Tabs();

  modal = new Modal();

  setup();
  document.body.style.visibility = "visible";
  document.body.style.opacity = 1;
};
