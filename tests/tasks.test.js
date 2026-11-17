const { addTask, toggleTask, removeTask, countPending, filterTasks } = require("../public/tasks");

describe("addTask", () => {
  test("adiciona uma tarefa com id incremental", () => {
    let t = addTask([], "Estudar CI/CD");
    t = addTask(t, "Fazer a P2");
    expect(t).toHaveLength(2);
    expect(t[1]).toEqual({ id: 2, text: "Fazer a P2", done: false });
  });

  test("remove espaços extras do texto", () => {
    expect(addTask([], "  teste  ")[0].text).toBe("teste");
  });

  test("lança erro para texto vazio", () => {
    expect(() => addTask([], "   ")).toThrow("vazio");
  });

  test("não altera o array original", () => {
    const original = [];
    addTask(original, "a");
    expect(original).toHaveLength(0);
  });
});

describe("toggleTask", () => {
  test("alterna o estado de conclusão", () => {
    const t = addTask([], "a");
    expect(toggleTask(t, 1)[0].done).toBe(false);
    expect(toggleTask(toggleTask(t, 1), 1)[0].done).toBe(false);
  });
});

describe("removeTask", () => {
  test("remove apenas a tarefa indicada", () => {
    const t = addTask(addTask([], "a"), "b");
    const r = removeTask(t, 1);
    expect(r).toHaveLength(1);
    expect(r[0].text).toBe("b");
  });
});

describe("countPending e filterTasks", () => {
  const base = toggleTask(addTask(addTask(addTask([], "a"), "b"), "c"), 2);

  test("conta apenas as pendentes", () => {
    expect(countPending(base)).toBe(2);
  });

  test("filtra por estado", () => {
    expect(filterTasks(base, "pending")).toHaveLength(2);
    expect(filterTasks(base, "done")).toHaveLength(1);
    expect(filterTasks(base, "all")).toHaveLength(3);
  });
});
