export default class Menu {
  #menu_button;
  #menu_container;

  #media_break;
  #max_height;

  #is_mobile = false;
  #is_open = true;

  constructor() {
    this.#setup_layout();
    this.#setup_events();
  }

  #setup_layout() {
    const padding = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--padding")
        .replace("px", "")
    );
    this.#max_height =
      window.innerHeight -
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--header-height")
          .replace("px", "")
      ) -
      padding * 2;
    this.#media_break = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--media-break")
        .replace("px", "")
    );

    this.#menu_button = document.querySelector("#menu-button");
    this.#menu_container = document.querySelector("nav");
  }

  #setup_events() {
    this.#menu_button.onclick = () => {
      this.#is_open ? this.close() : this.open();
    };

    window.addEventListener("resize", () => this.#on_resize());

    const items = this.#menu_container.querySelectorAll("a");
    items.forEach((item) => {
      item.onclick = () => {
        if (this.#is_mobile) this.close();
      };
    });

    this.#on_resize();
  }

  #on_resize() {
    this.#is_mobile = window.innerWidth <= this.#media_break;

    if (this.#is_mobile && this.#is_open) {
      if (this.#is_open) {
        this.close();
      }
      this.#menu_container.style.height = `${this.#max_height}px`;
    } else {
      if (!this.#is_open) {
        this.open();
      }
      this.#menu_container.style.height = `auto`;
    }
  }

  open() {
    if (this.#is_open) return;
    this.#is_open = true;
    this.#menu_container.style.transform = `translateX(0)`;
    this.#menu_button.style.rotate = "90deg";
  }

  close() {
    if (!this.#is_open) return;
    this.#is_open = false;
    this.#menu_container.style.transform = `translateX(100%)`;
    this.#menu_button.style.rotate = "0deg";
  }
}
