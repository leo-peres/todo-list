import "./style.css";
import _home from "./home.js";
import _menu from "./menu.js";
import _pageController from "./page_controller.js";
import _projectCreation from "./project_creation.js";
import _projectPage from "./project_page.js";
import _projects from "./projects_page.js";

const pageController = _pageController();

const home = _home(pageController);
pageController.addListener(home);

const menu = _menu(pageController);
pageController.addListener(menu);

const projectCreation = _projectCreation(pageController);

const projects = _projects(pageController);
pageController.addListener(projects);

const projectPage = _projectPage(pageController);
pageController.setProjectPage(projectPage);

const pages = [menu, home, projects];

const homeNav = document.getElementById("menu-home-nav");
homeNav.addEventListener("click", () => {home.load();});

const projectsNav = document.querySelector("#menu-projects-nav-btn nav");
projectsNav.addEventListener("click", () => {projects.load();});

const addProjectBtn = document.querySelector("#menu-projects-nav-btn button");
addProjectBtn.addEventListener("click", () => {projectCreation.load();});

home.load();