import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default (todoStorage) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "home-main-div";
    mainDiv.classList.add("content-main-div");

    const todos = [];
    const todoCards = [];

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {


        /*
        todos.length = 0;

        const hasTodoCard = (todo) => {
            let index = todoCards.findIndex((x) => x.todo === todo);
            return index >= 0;
        }

        for(let i = 0; i < todoCards.length; i++) {
            const todoCard = todoCards[i];
            if(todoCard.isDeleted()) {
                mainDiv.removeChild(todoCard.parentDiv);
                todoCards.splice(i, 1);
                i = i - 1;
            }
        }

        for(const todo of todoStorage.load()) {
            todos.push(todo);
            if(!hasTodoCard(todo)) {
                const newTodoCard = new TodoCard(todo, () => {todoStorage.remove(todo);}, todoStorage);
                mainDiv.append(newTodoCard.parentDiv);
                todoCards.push(newTodoCard);
            }
        }
        */
        
    }
    return {

        load,
        update

    };

}