export default class Gallery {
  #items;
  #current_item = 0;
  constructor() {
    this.#setup_layout();
  }

  #setup_layout() {
    const SPEED =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--speed")
          .replace("s", "")
      ) * 1000;
    const TIME_TO_NEXT = 3000;

    this.#items = document.querySelectorAll(".gallery-item");

    let prev_item;
    this.#items[this.#current_item].style.transform = "translateX(0)";
    this.#items[this.#current_item].style.visibility = "visible";
    let total_items = this.#items.length;
    setInterval(() => {
      prev_item = this.#current_item;
      this.#items[this.#current_item].style.transform = "translateX(-100%)";
      this.#current_item++;
      if (this.#current_item >= total_items) this.#current_item = 0;
      this.#items[this.#current_item].style.transform = "translateX(0)";
      this.#items[this.#current_item].style.visibility = "visible";

      setTimeout(() => {
        this.#items[prev_item].style.transform = "translateX(100%)";
        this.#items[prev_item].style.visibility = "hidden";
      }, SPEED);
    }, TIME_TO_NEXT);
  }

  goto(index) {}
}
