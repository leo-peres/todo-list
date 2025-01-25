import TodoCard from "./todo_card.js";

export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "project-page-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = ""

    const addBtn = document.createElement("button");
    addBtn.innerText = "Add task";

    addBtn.addEventListener("click", () => {
        const createTaskPage = pageController.getCreateTaskPage(project);
        createTaskPage.load();
    });

    const cardsDiv = document.createElement("div");
    cardsDiv.classList.add("cards-div");

    mainDiv.append(header);
    mainDiv.append(addBtn);
    mainDiv.append(cardsDiv);

    let project = null;

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

        header.innerText = project.name;

        const todos = pageController.loadTodos((x) => x.project.id === project.id);

        cardsDiv.innerHTML = "";
        for(const todo of todos) {
            const card = new TodoCard(todo, () => {
                pageController.removeTodo(todo);
                update();
            }, pageController);
            cardsDiv.append(card.parentDiv);
        }

    }

    const setProject = (_project) => {
        project = _project;
    }

    return {

        load,
        update,
        setProject

    };

}