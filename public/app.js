// Interface: conecta o DOM com a lógica de tasks.js
let tasks = [];
let filter = "all";

try {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (e) {
  tasks = [];
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const counter = document.getElementById("counter");
const error = document.getElementById("error");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  Tasks.filterTasks(tasks, filter).forEach((t) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = t.text;
    span.addEventListener("click", () => {
      tasks = Tasks.toggleTask(tasks, t.id);
      save();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "Remover";
    del.addEventListener("click", () => {
      tasks = Tasks.removeTask(tasks, t.id);
      save();
      render();
    });

    li.append(span, del);
    list.appendChild(li);
  });
  counter.textContent = Tasks.countPending(tasks) + " pendente(s)";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    tasks = Tasks.addTask(tasks, input.value);
    error.textContent = "";
    input.value = "";
    save();
    render();
  } catch (err) {
    error.textContent = err.message;
  }
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    render();
  });
});

render();
