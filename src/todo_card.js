import {format} from "date-fns";

export default class {
    
    constructor(todo, deleteTodoFunction) {
    
        this.todo = todo
    
        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("todo-card-parent-div");

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("todo-card-field");
        titleContainer.classList.add("todo-card-title");
        titleContainer.innerText = todo.title;

        const dateContainer = document.createElement("div");
        dateContainer.classList.add("todo-card-field");
        dateContainer.classList.add("todo-card-due-date");
        dateContainer.innerText = `Due date: ${format(todo.dueDate, "dd/MM/yyyy")}`;

        const textContainer = document.createElement("div");
        textContainer.classList.add("todo-card-field");
        textContainer.classList.add("todo-card-text");

        textContainer.innerText = todo.text;

        const dotsBtn = document.createElement("button");
        dotsBtn.classList.add("dots-btn");

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("todo-card-options-div");

        const optionsList = document.createElement("ul");

        const options = [
            {name: "Rename", onclickFunction: () => {console.log("rename");}},
            {name: "Delete", onclickFunction: deleteTodoFunction}
        ];

        for(const option of options) {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.classList.add("todo-card-option-btn")
            btn.innerText = option.name;
            btn.addEventListener("click", option.onclickFunction);
            li.append(btn);
            optionsList.append(li);
        }

        let optionsDivOpen = false;

        dotsBtn.addEventListener("click", () => {
            if(optionsDivOpen)
                this.parentDiv.removeChild(optionsDiv);
            else    
                this.parentDiv.append(optionsDiv);
            optionsDivOpen = !optionsDivOpen;
        });

        optionsDiv.append(optionsList);

        this.parentDiv.append(titleContainer);
        this.parentDiv.append(dateContainer);
        this.parentDiv.append(textContainer);
        this.parentDiv.append(dotsBtn);

    }

}