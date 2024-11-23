export default class {
    
    constructor(todo) {
    
        this.todo = todo
    
        this.parentDiv = document.createElement("div");
        this.parentDiv.classList.add("todo-card-parent-div");

        const textContainer = document.createElement("div");
        textContainer.classList.add("todo-card-text");

        textContainer.innerText = todo.text;

        this.parentDiv.append(textContainer);

    }

}