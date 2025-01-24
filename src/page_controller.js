import storage from "./storage.js";
import taskCreation from "./task_creation.js";

const ider = (dataStorage) => {

    const getNewId = () => {

        const data = dataStorage.load();
        data.sort((x, y) => x.id - y.id);

        let newId = 1;
        if(data.length > 0) {
            while(newId <= data.length && newId == data[newId-1].id) {
                newId++;
            }
        }

        console.log(newId);
        console.log(data.length);

        return newId

    }

    return {

        getNewId

    };

}

const factory = (projectPage) => {

    const todoStorage = storage("todos");
    const projectStorage = storage("projects")

    const todoIder = ider(todoStorage);
    const projectIder = ider(projectStorage);

    let _this = null;

    const createTaskPages = [];

    const addTodo = (newTodo) => {
        todoStorage.add(newTodo);
    }

    const removeTodo = (oldTodo) => {
        todoStorage.remove(oldTodo);
    }

    const loadTodos = (pred = () => true) => {
        return todoStorage.load(pred);
    }

    const getTodoId = () => {
        return todoIder.getNewId();
    }

    const addProject = (newProject) => {
        projectStorage.add(newProject);
        updateProjects(this);
    }

    const removeProject = (oldProject) => {
        projectStorage.remove(oldProject);
        for(const todo of todoStorage.load().filter(x => x.project.id == oldProject.id))
            removeTodo(todo);
        updateProjects(this);
    }

    const loadProjects = () => {
        return projectStorage.load();
    }

    const updateProjects = () => {
        const projects = projectStorage.load();
        createTaskPages.length = 0;
        for(const project of projects) {
            const createTaskPage = taskCreation(_this, project);
            createTaskPages.push(createTaskPage);
        }
    }

    const getProjectId = () => {
        return projectIder.getNewId();
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

    const getCreateTaskPage = (project) => {
        let index = createTaskPages.findIndex(x => x.project.id === project.id);
        if(index > -1)
            return createTaskPages[index];
    }

    const setSelfReference = (selfReference) => {
        _this = selfReference;
    }

    return {

        addTodo,
        removeTodo,
        loadTodos,
        getTodoId,
        addProject,
        removeProject,
        loadProjects,
        updateProjects,
        getProjectId,
        addListener,
        setProjectPage,
        setActiveProject,
        loadProjectPage,
        getCreateTaskPage,
        setSelfReference

    };

}

export default (projectPage) => {

    const pageController = factory(projectPage);

    pageController.setSelfReference(pageController);
    delete pageController.setSelfReference;

    pageController.updateProjects();

    return pageController;

}