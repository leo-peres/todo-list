import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default () => {

    const contentDiv = document.getElementById("content");

    const testTodo = new Todo("This is a test TODO card");
    const testTodoCard = new TodoCard(testTodo);

    contentDiv.append(testTodoCard.parentDiv);

}