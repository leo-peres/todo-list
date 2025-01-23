export default class {
    
    constructor(id, title, dueDate, text, priority, project) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

}