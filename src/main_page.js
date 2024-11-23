import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default () => {

    const contentDiv = document.getElementById("content");

    const testTodo = new Todo("Test TODO card", new Date(2024, 10, 25), "This is a test TODO card", 0);
    const testTodoCard = new TodoCard(testTodo);

    contentDiv.append(testTodoCard.parentDiv);

}