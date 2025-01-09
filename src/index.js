import "./style.css";
import _home from "./home.js";
import _menu from "./menu.js";
import _projects from "./projects_page.js";
import storage from "./storage.js";

const todoStorage = storage("todos");
const projectStorage = storage("projects");

_menu(todoStorage, projectStorage);
const home = _home(todoStorage);
const projects = _projects(projectStorage);

const pages = [home, projects];

for(const page of pages)
    todoStorage.addPage(page);

const projectsNav = document.querySelector("#menu-projects-nav-btn nav");
projectsNav.addEventListener("click", () => {projects.load();});