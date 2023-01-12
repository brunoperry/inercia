window.onload = () => {
  // build_forms();
};

const build_forms = () => {
  const header_height = document.querySelector("header").getBoundingClientRect().height;
  const controls_height = document
    .querySelector("#forms-controler")
    .getBoundingClientRect().height;
  const content_height = screen.height - (header_height + controls_height);

  const forms_container = document.querySelector("#forms-container");
  const forms = document.querySelectorAll(".form-item");
  const total_forms = forms.length;
  let current_form = 0;
  const form_width = forms[current_form].getBoundingClientRect().width;
  forms_container.style.width = `${form_width * total_forms}px`;
  forms_container.style.maxHeight = `${content_height}px`;

  const on_form = (index) => {
    forms_container.style.transform = `translateX(-${form_width * index}px)`;
    // let height = forms[current_form].getBoundingClientRect().height;
    // if (height < content_height) {
    //   height = content_height;
    // }

    // window.scrollTo(0, 0);
  };

  forms.forEach((form, i) => {
    form.style.width = `${form_width}px`;
    // form.style.height = `${content_height}px`;
    form.style.left = `${i * form_width}px`;
  });

  document.querySelector("#prev-btn").onclick = () => {
    current_form--;
    if (current_form < 0) current_form = 0;
    on_form(current_form);
  };
  document.querySelector("#next-btn").onclick = () => {
    current_form++;
    if (current_form >= total_forms) current_form = total_forms - 1;
    on_form(current_form);
  };

  on_form(current_form);
};
