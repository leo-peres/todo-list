import Project from "./project.js";

export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "project-creation-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = "Create your project"

    const form = document.createElement("form");
    form.id = "project-creation-form";

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("form-entry-div");
    nameDiv.innerHTML = "<label>Name</label>";
    
    const nameInput = document.createElement("input");
    nameDiv.append(nameInput);

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("ok-btn");
    submitBtn.innerText = "OK";

    submitBtn.addEventListener("click", (evt) => {

        evt.preventDefault();

        let name = nameInput.value;
        if(name) {
            nameInput.value = "";
            const newProject = new Project(pageController.getProjectId(), name);
            pageController.addProject(newProject);
            pageController.loadProjectPage(newProject);
        }

    });

    form.append(nameDiv);
    form.append(submitBtn);

    mainDiv.append(header);
    mainDiv.append(form);

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

    }

    return {

        load,
        update

    };

}