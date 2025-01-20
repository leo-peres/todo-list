import Todo from "./todo.js";
import TodoCard from "./todo_card.js";

export default (pageController) => {

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
        
    }
    
    return {

        load,
        update

    };

}