import "./style.css";
import _home from "./home.js";
import _menu from "./menu.js";
import _todoStorage from "./todo_storage.js";

const todoStorage = _todoStorage();

//const menu = _menu(todoStorage);
_menu(todoStorage);
const home = _home(todoStorage);

const pages = [home];

for(const page of pages)
    todoStorage.addPage(page);