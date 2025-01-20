export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "project-page-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = ""

    mainDiv.append(header);

    let project = null;

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

        header.innerText = project.name;

        const cards = pageController.loadTodos((x) => x.project === project);

        for(const card of cards) {
            mainDiv.append(card.parentDiv);
        }

    }

    const setProject = (_project) => {
        project = _project;
    }

    return {

        load,
        update,
        setProject

    };

}