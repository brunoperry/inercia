export default class Hero {
  #view;
  #items;
  #current_item = 0;
  #previous_item = null;
  #total_items = 0;

  #interval_id = null;
  #timeout_id = null;
  constructor() {
    this.#setup_layout();

    this.start();
  }

  #setup_layout() {
    this.#view = document.querySelector("#hero");
    this.#items = this.#view.querySelectorAll(".hero-item");

    const images = this.#view.querySelectorAll("img");
    const { height } = this.#view.getBoundingClientRect();
    images.forEach((img) => {
      const img_size = img.getBoundingClientRect();
      img.style.transform = `translateY(${height / 2 - img_size.height / 2}px)`;
    });
    this.#total_items = this.#items.length;
  }

  start() {
    if (this.#interval_id) return;

    const SPEED =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--speed")
          .replace("s", "")
      ) * 1000;
    const TIME_TO_NEXT = 3000;

    this.#items[this.#current_item].style.transform = "translateX(0)";
    this.#items[this.#current_item].style.visibility = "visible";

    this.#interval_id = setInterval(() => {
      this.#previous_item = this.#current_item;
      this.#items[this.#current_item].style.transform = "translateX(-100%)";
      this.#current_item++;
      if (this.#current_item >= this.#total_items) this.#current_item = 0;
      this.#items[this.#current_item].style.transform = "translateX(0)";
      this.#items[this.#current_item].style.visibility = "visible";

      this.#interval_id = null;
      this.#interval_id = setTimeout(() => {
        this.#items[this.#previous_item].style.transform = "translateX(100%)";
        this.#items[this.#previous_item].style.visibility = "hidden";
      }, SPEED);
    }, TIME_TO_NEXT);
  }

  stop() {
    if (!this.#interval_id) return;

    clearInterval(this.#interval_id);
    clearTimeout(this.#timeout_id);
    this.#interval_id = null;
    this.#timeout_id = null;
  }

  goto(index) {
    if (this.#interval_id) this.stop();

    if (this.#previous_item) {
      this.#items[this.#previous_item].style.transform = "translateX(100%)";
      this.#items[this.#previous_item].style.visibility = "hidden";
    }
    this.#current_item = index;
    if (this.#current_item >= this.#total_items) this.#current_item = 0;

    console.log(this.#items);
    this.#items[this.#current_item].style.transform = "translateX(0)";
    this.#items[this.#current_item].style.visibility = "visible";

    // this.start();
  }
}
