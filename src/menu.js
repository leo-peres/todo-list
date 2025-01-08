import Todo from "./todo.js";
import Project from "./project.js"

export default (todoStorage, projectStorage) => {

    const addTaskBtn = document.getElementById("menu-add-task");
    addTaskBtn.addEventListener("click", () => {
        const newTodo = new Todo("Test TODO card", new Date(2024, 10, 25), "This is a test TODO card", 0);
        todoStorage.add(newTodo);
    });

    const projectsUl = document.getElementById("menu-projects-list");

    const updateProjectsList = () => {
        projectsUl.innerHTML = "";
        const projects = projectStorage.load();
        for(const project of projects) {
            const li = document.createElement("li");
            const nav = document.createElement("nav");
            nav.innerText = project.name;
            li.append(nav);
            projectsUl.append(li);
        }
    }

    const addProjectBtn = document.querySelector("#menu-projects-nav-btn button");
    addProjectBtn.addEventListener("click", () => {
        const newProject = new Project("project");
        projectStorage.add(newProject);
        updateProjectsList();
    })

    updateProjectsList();

}