export default class {

    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

}