import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default (todoStorage) => {


    const contentDiv = document.getElementById("content");

    const todos = [];

    const update = () => {
        contentDiv.innerHTML = "";
        todos.length = 0;
        for(const todo of todoStorage.load()) {
            todos.push(todo);
            contentDiv.append(new TodoCard(todo, () => {todoStorage.remove(todo);}).parentDiv);
        }
    }

    update();

    return {

        update

    };

}