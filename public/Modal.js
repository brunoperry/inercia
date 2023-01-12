export default class Modal {
  #view;
  #forms_container;
  #is_opened = false;
  #current_form = null;

  #container = null;
  #overlay = null;

  constructor() {
    this.#view = document.querySelector("#modal");

    this.#overlay = this.#view.querySelector(".overlay");
    this.#container = this.#view.querySelector(".container");

    this.#forms_container = Array.prototype.slice.call(
      this.#view.querySelectorAll("form")
    );

    this.SPEED =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--speed")
          .replace("s", "")
      ) * 1000;

    const close_buttons = this.#view.querySelectorAll(".close-button");
    close_buttons.forEach((button) => {
      button.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      };
    });
    this.#view.querySelector(".overlay").onclick = () => this.close();
  }

  open(type = "default", data = null) {
    this.#current_form = this.#forms_container.filter((f) => f.id === `form-${type}`)[0];
    if (!this.#current_form) return;

    this.#current_form.style.display = "grid";

    switch (type) {
      case "delete-news":
        this.#current_form.querySelector("input").value = data.id;
        this.#current_form.querySelector(".dimmed").innerText = data.content;
        break;
      case "update-news":
        this.#current_form.querySelector("textarea").value = data.content;
        this.#current_form.querySelector("input").value = data.id;
        break;
      case "delete-hero":
        this.#current_form.querySelector("input").value = data.id;
        this.#current_form.querySelector("img").src = data.image;
        break;
      case "update-hero":
        this.#current_form.querySelector("input").value = data.id;
        this.#current_form.querySelector("#banner_image").value = data.image;
        this.#current_form.querySelector("#banner_link").value = data.link;

        data.is_active === "true"
          ? this.#current_form.querySelector("#active-banner").click()
          : this.#current_form.querySelector("#inactive-banner").click();

        break;
      case "delete-event":
        this.#current_form.querySelector(".dimmed").innerText = data.name;
        // this.#current_form.querySelector(".dimmed").innerText = data.content;
        break;
      case "update-event":
        // this.#current_form.querySelector("textarea").value = data.content;
        // this.#current_form.querySelector("input").value = data.id;
        break;
    }

    this.#show();

    if (!data) return;
  }

  #show() {
    if (this.#is_opened) return;
    this.#view.style.display = "flex";
    requestAnimationFrame(() => {
      this.#container.style.transform = "scaleX(1)";
      this.#overlay.style.opacity = 1;
      setTimeout(() => {
        this.#current_form.style.opacity = 1;
      }, this.SPEED);
    });
    this.#is_opened = true;
  }

  #hide() {
    if (!this.#is_opened) return;
    this.#forms_container.forEach((form) => {
      form.style.display = "none";
    });
    this.#view.style.display = "none";
    this.#container.style.transform = "scaleX(0)";
    this.#current_form.style.opacity = 0;
    this.#overlay.style.opacity = 0;
    this.#is_opened = false;
  }

  close() {
    this.#hide();
  }
}
