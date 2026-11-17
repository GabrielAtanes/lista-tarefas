// Lógica pura da lista de tarefas (sem DOM), fácil de testar.
(function (root) {
  function addTask(tasks, text) {
    const clean = String(text || "").trim();
    if (!clean) throw new Error("O texto da tarefa não pode ser vazio");
    const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    return [...tasks, { id: nextId, text: clean, done: false }];
  }

  function toggleTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
  }

  function countPending(tasks) {
    return tasks.filter((t) => !t.done).length;
  }

  function filterTasks(tasks, filter) {
    if (filter === "pending") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }

  const api = { addTask, toggleTask, removeTask, countPending, filterTasks };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api; // Node / Jest
  } else {
    root.Tasks = api; // navegador
  }
})(typeof window !== "undefined" ? window : globalThis);
