export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "task-page-main-div";
    mainDiv.classList.add("content-main-div");

    /***delete***/
    const h = document.createElement("h1");
    mainDiv.append(h);
    /************/

    let todo = null;

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

        h.innerText = todo.title;

    }

    const setTask = (_todo) => {
        todo = _todo;
    }

    return {

        load,
        update,
        setTask

    };

}