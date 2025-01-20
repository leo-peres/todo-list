export default (name) => {

    const pages = [];

    const data = JSON.parse(localStorage.getItem(name)) || [];

    const add = (newData) => {
        data.push(newData);
        save();
    }

    const remove = (oldData) => {
        let index = data.findIndex(data => data === oldData);
        if(index >= 0)
            data.splice(index, 1);
        save();
    }

    const save = () => {
        localStorage.setItem(name, JSON.stringify(data));
        for(const page of pages)
            page.update();
    }

    const load = (pred = () => true) => {
        return data.filter((x) => pred(x));
    }

    const addPage = (newPage) => {
        pages.push(newPage);
    }

    return {

        add,
        remove,
        save,
        load,
        addPage

    };

}