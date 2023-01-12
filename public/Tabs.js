export default class Tabs {
  #tabs;
  constructor() {
    this.#setup_layout();
  }

  #setup_layout() {
    this.#tabs = document.querySelectorAll(".tab-item");
    const contents = document.querySelectorAll(".tab-content");
    let current_tab = this.#tabs[0];
    let current_content = contents[0];
    const on_tab = (index) => {
      current_tab.className = "tab-item";
      current_content.className = "tab-content";

      current_tab = this.#tabs[index];
      current_content = contents[index];

      current_tab.className = "tab-item active";
      current_content.className = "tab-content active";
    };
    this.#tabs.forEach((tab, index) => {
      tab.onclick = () => {
        on_tab(index);
      };
    });
    this.open_tab(0);
  }

  open_tab(index) {
    this.#tabs[index].click();
  }
}
