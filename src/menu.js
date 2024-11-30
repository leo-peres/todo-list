import Todo from "./todo.js";

export default (todoStorage) => {

    const addTaskBtn = document.getElementById("menu-add-task");
    addTaskBtn.addEventListener("click", () => {
        const newTodo = new Todo("Test TODO card", new Date(2024, 10, 25), "This is a test TODO card", 0);
        todoStorage.add(newTodo);
    });

}