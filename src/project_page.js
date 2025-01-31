import {format} from "date-fns";

import TodoCard from "./todo_card.js";


const todoListView = (todo) => {

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("todo-list-view");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("todo-list-view-title");
    titleDiv.innerText = todo.title;

    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("todo-list-view-due-date");
    dueDateDiv.innerText = format(todo.dueDate, "dd/MM/yyyy");

    parentDiv.append(titleDiv);
    parentDiv.append(dueDateDiv);

    return {

        todo,
        parentDiv

    };

}

export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "project-page-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = ""

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("project-page-btn-div");

    const addBtn = document.createElement("button");
    addBtn.innerText = "Add task";

    addBtn.addEventListener("click", () => {
        const createTaskPage = pageController.getCreateTaskPage(project);
        createTaskPage.load();
    });

    const toggleModeBtn = document.createElement("button");
    toggleModeBtn.classList.add("toggle-view-mode-btn");
    //toggleModeBtn.setAttribute("card", "");

    toggleModeBtn.addEventListener("click", () => {

        cardView = !cardView;
        const auxArray = ["card", "list"];

        tasksDiv.removeAttribute(auxArray[0+cardView]);
        tasksDiv.setAttribute(auxArray[1-cardView], "");

        toggleModeBtn.removeAttribute(auxArray[0+cardView]);
        toggleModeBtn.setAttribute(auxArray[1-cardView], "");

        update();

    })

    btnDiv.append(addBtn);
    btnDiv.append(toggleModeBtn);

    const tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks-div");

    mainDiv.append(header);
    mainDiv.append(btnDiv);
    mainDiv.append(tasksDiv);

    let project = null;

    let cardView = false;
    if(cardView) {
        tasksDiv.setAttribute("card", "")
        toggleModeBtn.setAttribute("card", "");
    }
    else {
        tasksDiv.setAttribute("list", "");
        toggleModeBtn.setAttribute("list", "");
    }

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

        header.innerText = project.name;

        const todos = pageController.loadTodos((x) => x.project.id === project.id);

        tasksDiv.innerHTML = "";
        for(const todo of todos) {
            if(cardView) {
                const card = new TodoCard(todo, () => {
                    pageController.removeTodo(todo);
                    update();
                }, pageController);
                tasksDiv.append(card.parentDiv);
            }
            else {

                const listView = todoListView(todo);
                tasksDiv.append(listView.parentDiv);

                listView.parentDiv.addEventListener("click", () => {pageController.loadTaskPage(todo);});

            }
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