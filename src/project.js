export default class {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

}