import {format} from "date-fns";

export default class {
    
    constructor(todo) {
    
        this.todo = todo
    
        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("todo-card-parent-div");

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("todo-card-title")
        titleContainer.innerText = todo.title;

        const dateContainer = document.createElement("div");
        dateContainer.classList.add("todo-card-due-date");
        dateContainer.innerText = `Due date: ${format(todo.dueDate, "dd/MM/yyyy")}`;

        const textContainer = document.createElement("div");
        textContainer.classList.add("todo-card-text");

        textContainer.innerText = todo.text;

        this.parentDiv.append(titleContainer);
        this.parentDiv.append(dateContainer);
        this.parentDiv.append(textContainer);

    }

}