import {format} from "date-fns";

export default class {
    
    constructor(todo, deleteTodoFunction, todoStorage) {
    
        this.todo = todo;
    
        this.todoStorage = todoStorage;

        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("todo-card-parent-div");

        this.titleContainer = document.createElement("div");
        this.titleContainer.classList.add("todo-card-field");
        this.titleContainer.classList.add("todo-card-title");
        this.titleContainer.innerText = todo.title;

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
            {name: "Rename", onclickFunction: () => {this.enterRenameTitleMode()}},
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

        const toggleOptionsShow = () => {
            if(optionsDivOpen)
                this.parentDiv.removeChild(optionsDiv);
            else    
                this.parentDiv.append(optionsDiv);
            optionsDivOpen = !optionsDivOpen;
        }

        dotsBtn.addEventListener("click", toggleOptionsShow);
        optionsDiv.addEventListener("click", toggleOptionsShow)

        optionsDiv.append(optionsList);

        this.parentDiv.append(this.titleContainer);
        this.parentDiv.append(dateContainer);
        this.parentDiv.append(textContainer);
        this.parentDiv.append(dotsBtn);

        this.titleTextInputDiv = document.createElement("div");
        this.titleTextInputDiv.classList.add("todo-card-title-text-input-div");

        this.titleTextInput = document.createElement("input");
        this.titleTextInput.classList.add("todo-card-title-text-input");

        this.titleOKBtn = document.createElement("button");
        this.titleOKBtn.innerText = "OK";

        this.titleTextInputDiv.append(this.titleTextInput);
        this.titleTextInputDiv.append(this.titleOKBtn);

        this.titleTextInput.addEventListener("input", () => {
            if(this.titleTextInput.value.length > 25)
                this.titleTextInput.value = this.titleTextInput.value.slice(0, -1);
        });

        this.titleOKBtn.addEventListener("click", () => {this.toggleRenameTitleMode()});

        document.addEventListener("keypress", (evt) => {
            if(evt.key === "Enter" && document.activeElement === this.titleTextInput)
                this.toggleRenameTitleMode();
        });

    }

    toggleRenameTitleMode() {
        if(this.titleContainer.hasAttribute("rename")) {
            if(this.titleTextInput.value) {
                this.todo.title = this.titleTextInput.value;
                this.todoStorage.updateTodo(this.todo);
            }
            this.titleContainer.removeAttribute("rename");
            this.titleContainer.innerHTML = this.todo.title;
        }
        else
            this.enterRenameTitleMode();
    }

    enterRenameTitleMode() {
        if(!this.titleContainer.hasAttribute("rename")) {
            this.titleContainer.setAttribute("rename", "");
            this.titleContainer.innerHTML = "";
            this.titleContainer.append(this.titleTextInputDiv);
            this.titleTextInput.value = this.todo.title;
        }
    }

}