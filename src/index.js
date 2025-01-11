import "./style.css";
import _home from "./home.js";
import _menu from "./menu.js";
import _project_creation from "./project_creation.js";
import _projects from "./projects_page.js";
import storage from "./storage.js";

const todoStorage = storage("todos");
const projectStorage = storage("projects");

const menu = _menu(todoStorage, projectStorage);
const home = _home(todoStorage);
const project_creation = _project_creation(projectStorage);
const projects = _projects(projectStorage);

const pages = [menu, home, projects];

for(const page of pages) {
    todoStorage.addPage(page);
    projectStorage.addPage(page);
}

const homeNav = document.getElementById("menu-home-nav");
homeNav.addEventListener("click", () => {home.load();});

const projectsNav = document.querySelector("#menu-projects-nav-btn nav");
projectsNav.addEventListener("click", () => {projects.load();});

const addProjectBtn = document.querySelector("#menu-projects-nav-btn button");
addProjectBtn.addEventListener("click", () => {project_creation.load();});

home.load();