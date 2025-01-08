import {format} from "date-fns";

export default class {
    
    constructor(todo, deleteTodoFunction, todoStorage) {
    
        this.todo = todo;
        this.todoStorage = todoStorage;
        this.deleted = false;

        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("todo-card-parent-div");

        //////////////////

        this.titleField = this.#createCardField("todo-card-title", this.todo.title, () => {this.#toggleEditTitleMode();});

        //this.titleField.editDiv.classList.add("todo-card-title-txt-input-div");
        //this.titleField.input.classList.add("todo-card-title-txt-input");

        this.titleField.input.addEventListener("input", () => {
            if(this.titleField.input.value.length > 25)
                this.titleField.input.value = this.titleField.input.value.slice(0, -1);
        });

        this.titleField.okBtn.addEventListener("click", () => {this.#toggleEditTitleMode()});

        document.addEventListener("keypress", (evt) => {
            if(evt.key === "Enter" && document.activeElement === this.titleField.input)
                this.#toggleEditTitleMode();
        });

        //////////////////

        this.dueDateField = this.#createCardField("todo-card-due-date", `Due date: ${format(todo.dueDate, "dd/MM/yyyy")}`, () => {this.#enterEditDueDateMode();});

        //this.dueDateField.editDiv.classList.add("todo-card-due-date-edit-div");

        this.dueDateField.input.setAttribute("type", "date");

        this.dueDateField.okBtn.addEventListener("click", () => {this.#toggleEditDueDateMode()});

        document.addEventListener("keypress", (evt) => {
            if(evt.key === "Enter" && document.activeElement === this.dueDateField.input)
                this.#toggleEditDueDateMode();
        });

        //////////////////

        this.txtField = this.#createCardField("todo-card-txt", this.todo.text, () => {this.#toggleEditTxtMode()}, true);

        //this.txtField.input.classList.add("todo-card-txt-input");

        this.txtField.okBtn.addEventListener("click", () => {this.#toggleEditTxtMode();});

        document.addEventListener("keypress", (evt) => {
            if(evt.key === "Enter" && document.activeElement === this.txtField.input)
                this.#toggleEditTxtMode();
        });

        //////////////////

        const dotsBtn = document.createElement("button");
        dotsBtn.classList.add("dots-btn");

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("todo-card-options-div");

        const optionsList = document.createElement("ul");

        const options = [
            {name: "Rename", onclickFunction: () => {this.enterRenameTitleMode()}},
            {name: "Delete", onclickFunction: () => {
                this.deleted = true;
                deleteTodoFunction();
            }}
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

        this.parentDiv.append(this.titleField.wrapper);
        this.parentDiv.append(this.dueDateField.wrapper);
        this.parentDiv.append(this.txtField.wrapper);
        this.parentDiv.append(dotsBtn);

    }

    #createCardField(fieldClass, fieldTxt, editOnClick, textArea=false) {

        const wrapper = document.createElement("div");
        wrapper.classList.add("todo-card-field");
        wrapper.classList.add(fieldClass);

        const txtDiv = document.createElement("div");
        txtDiv.innerText = fieldTxt;

        const editBtn = document.createElement("button");
        editBtn.classList.add("todo-card-edit-btn");
        editBtn.onclick = () => {editOnClick();};

        wrapper.append(txtDiv);

        wrapper.onmouseenter = () => {if(!wrapper.hasAttribute("edit")) wrapper.append(editBtn);};
        wrapper.onmouseleave = () => {if(!wrapper.hasAttribute("edit")) wrapper.removeChild(editBtn);};

        const editDiv = document.createElement("div");
        editDiv.classList.add("todo-card-edit-div");
        const input = textArea ? document.createElement("textarea") : document.createElement("input");
        input.classList.add("todo-card-input");
        const okBtn = document.createElement("button");
        okBtn.classList.add("todo-card-ok-btn");
        okBtn.innerText = "OK";

        editDiv.append(input);
        editDiv.append(okBtn);

        return {wrapper, txtDiv, editBtn, editDiv, input, okBtn};

    }

    #toggleEditTitleMode() {
        if(this.titleField.wrapper.hasAttribute("edit")) {
            if(this.titleField.input.value) {
                this.todo.title = this.titleField.input.value;
                this.todoStorage.save();
            }
            this.titleField.wrapper.removeAttribute("edit");
            this.titleField.txtDiv.innerHTML = this.todo.title;
            this.titleField.wrapper.innerHTML = "";
            this.titleField.wrapper.append(this.titleField.txtDiv);
            this.titleField.wrapper.append(this.titleField.editBtn);
        }
        else
            this.#enterEditTitleMode();
    }

    #enterEditTitleMode() {
        if(!this.titleField.wrapper.hasAttribute("edit")) {
            this.titleField.wrapper.setAttribute("edit", "");
            this.titleField.wrapper.innerHTML = "";
            this.titleField.wrapper.append(this.titleField.editDiv);
            this.titleField.input.value = this.todo.title;
        }
    }

    #toggleEditDueDateMode() {
        if(this.dueDateField.wrapper.hasAttribute("edit")) {
            if(this.dueDateField.input.value) {
                const auxArr = this.dueDateField.input.value.split("-");
                this.todo.dueDate = new Date(auxArr[0], auxArr[1] - 1, auxArr[2]);
                this.todoStorage.save();
            }
            this.dueDateField.wrapper.removeAttribute("edit");
            this.dueDateField.txtDiv.innerHTML = `Due date: ${format(this.todo.dueDate, "dd/MM/yyyy")}`;
            this.dueDateField.wrapper.innerHTML = "";
            this.dueDateField.wrapper.append(this.dueDateField.txtDiv);
            this.dueDateField.wrapper.append(this.dueDateField.editBtn);
        }
        else
            this.#enterEditDueDateMode();
    }

    #enterEditDueDateMode() {
        if(!this.dueDateField.wrapper.hasAttribute("edit")) {
            this.dueDateField.wrapper.setAttribute("edit", "");
            this.dueDateField.wrapper.innerHTML = "";
            this.dueDateField.wrapper.append(this.dueDateField.editDiv);
            this.dueDateField.input.value = format(this.todo.dueDate, "yyyy-MM-dd");
        }
    }

    #toggleEditTxtMode() {
        if(this.txtField.wrapper.hasAttribute("edit")) {

            this.todo.text = this.txtField.input.value;
            this.todoStorage.save();

            this.txtField.wrapper.removeAttribute("edit");
            this.txtField.txtDiv.innerHTML = this.todo.text;
            this.txtField.wrapper.innerHTML = "";
            this.txtField.wrapper.append(this.txtField.txtDiv);
            this.txtField.wrapper.append(this.txtField.editBtn);

        }
        else
            this.#enterEditTxtMode();
    }

    #enterEditTxtMode() {
        if(!this.txtField.wrapper.hasAttribute("edit")) {
            this.txtField.wrapper.setAttribute("edit", "");
            this.txtField.wrapper.innerHTML = "";
            this.txtField.wrapper.append(this.txtField.editDiv);
            this.txtField.input.value = this.todo.text;
        }
    }

    isDeleted() {
        return this.deleted;
    }

}