export default () => {

    const pages = [];

    const add = (newTodo) => {
        todos.push(newTodo);
        save();
    }

    const remove = (oldTodo) => {
        let index = todos.findIndex(todo => todo === oldTodo);
        if(index)
            todos.splice(index, 1);
        save();
    }

    const save = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
        for(const page of pages)
            page.update();
    }

    const load = () => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    }

    const addPage = (newPage) => {
        pages.push(newPage);
    }

    const todos = load();

    return {

        add,
        remove,
        load,
        addPage

    };

}