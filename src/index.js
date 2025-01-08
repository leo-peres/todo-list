import "./style.css";
import _home from "./home.js";
import _menu from "./menu.js";
import storage from "./storage.js";

const todoStorage = storage("todos");
const projectStorage = storage("projects");

_menu(todoStorage, projectStorage);
const home = _home(todoStorage);

const pages = [home];

for(const page of pages)
    todoStorage.addPage(page);