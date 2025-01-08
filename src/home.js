import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default (todoStorage) => {

    const contentDiv = document.getElementById("content");

    const todos = [];
    const todoCards = [];

    const update = () => {

        todos.length = 0;

        const hasTodoCard = (todo) => {
            let index = todoCards.findIndex((x) => x.todo === todo);
            return index >= 0;
        }

        for(let i = 0; i < todoCards.length; i++) {
            const todoCard = todoCards[i];
            if(todoCard.isDeleted()) {
                contentDiv.removeChild(todoCard.parentDiv);
                todoCards.splice(i, 1);
                i = i - 1;
            }
        }

        for(const todo of todoStorage.load()) {
            todos.push(todo);
            if(!hasTodoCard(todo)) {
                const newTodoCard = new TodoCard(todo, () => {todoStorage.remove(todo);}, todoStorage);
                contentDiv.append(newTodoCard.parentDiv);
                todoCards.push(newTodoCard);
            }
        }
    }

    update();

    return {

        update

    };

}