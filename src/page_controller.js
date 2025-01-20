import storage from "./storage.js";

export default (projectPage) => {

    const todoStorage = storage("todos");
    const projectStorage = storage("projects")

    const addTodo = (newTodo) => {
        todoStorage.add(newTodo);
    }

    const removeTodo = (oldTodo) => {
        todoStorage.remove(oldTodo);
    }

    const loadTodos = (pred = () => true) => {
        return todoStorage.load(pred);
    }

    const addProject = (newProject) => {
        projectStorage.add(newProject);
    }

    const removeProject = (oldProject) => {
        projectStorage.remove(oldProject);
    }

    const loadProjects = () => {
        return projectStorage.load();
    }

    const addListener = (page) => {
        todoStorage.addPage(page);
        projectStorage.addPage(page);
    }

    const setProjectPage = (_projectPage) => {
        projectPage = _projectPage;
    }

    const setActiveProject = (project) => {
        projectPage.setProject(project);
    }

    const loadProjectPage = (project) => {
        setActiveProject(project);
        projectPage.load();
    }

    return {

        addTodo,
        removeTodo,
        loadTodos,
        addProject,
        removeProject,
        loadProjects,
        addListener,
        setProjectPage,
        setActiveProject,
        loadProjectPage

    };

}