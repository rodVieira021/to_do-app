window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  let inputText = [];
  inputText = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = (task) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Del";

    const task_done_el = document.createElement("button");
    task_done_el.classList.add("done");
    task_done_el.innerHTML = "Done";

    task_actions_el.appendChild(task_done_el);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.prepend(task_el); //add the task as first

    input.value = "";

    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerHTML = "Edit";
        let newValue = task_input_el.value;
        inputText.splice(inputText.indexOf(task), 1);
        inputText.push(newValue);
        localStorage.setItem("tasks", JSON.stringify(inputText));
      }
    });

    task_done_el.addEventListener("click", () => {
      task_input_el.style.textDecoration = "line-through";
      task_edit_el.remove();
      task_done_el.remove();
    });

    task_delete_el.addEventListener("click", () => {
      list_el.removeChild(task_el);
    });
  };

  inputText.forEach((input) => {
    newTask(input);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let task = input.value;

    let textInput = () => {
      inputText.push(input.value);
    };
    textInput();

    localStorage.setItem("tasks", JSON.stringify(inputText));

    if (!task) {
      alert("Please fill out the task");
      return;
    }
    newTask(task);
  });
});
