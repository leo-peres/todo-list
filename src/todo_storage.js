export default () => {

    const pages = [];

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const add = (newTodo) => {
        todos.push(newTodo);
        save();
    }

    const remove = (oldTodo) => {
        let index = todos.findIndex(todo => todo === oldTodo);
        if(index >= 0)
            todos.splice(index, 1);
        save();
    }

    const updateTodo = (todo) => {
        let index = todos.findIndex(_todo => _todo ===  todo);
        if(index >= 0)
            todos[index].title = todo.title;
        save();
    }

    const save = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
        for(const page of pages)
            page.update();
    }

    const load = () => {
        return todos;
    }

    const addPage = (newPage) => {
        pages.push(newPage);
    }

    return {

        add,
        remove,
        updateTodo,
        save,
        load,
        addPage

    };

}