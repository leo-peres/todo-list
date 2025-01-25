import Todo from "./todo.js";

export default (pageController) => {

    const addTaskBtn = document.getElementById("menu-add-task");
    /*
    addTaskBtn.addEventListener("click", () => {
        let id = pageController.getTodoId();
        const newTodo = new Todo(id, "Test TODO card", new Date(2024, 10, 25), "This is a test TODO card", 0, null);
        pageController.addTodo(newTodo);
    });
    */

    const projectsUl = document.getElementById("menu-projects-list");

    const update = () => {

        projectsUl.innerHTML = "";
        const projects = pageController.loadProjects();
        for(const project of projects) {

            const li = document.createElement("li");

            const nav = document.createElement("nav");
            nav.innerText = project.name;

            nav.addEventListener("click", () => {
                pageController.loadProjectPage(project);
            })

            li.append(nav);

            projectsUl.append(li);

        }

    }

    update();

    return {

        update

    }

}