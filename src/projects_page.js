export default (pageController) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "projects-page-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = "Projects"
    
    const projectsList = document.createElement("ul");
    projectsList.classList.add("projects-list");

    mainDiv.append(header);
    mainDiv.append(projectsList);

    const load = () => {

        contentDiv.innerHTML = "";
        contentDiv.append(mainDiv);

        update();

    }

    const update = () => {

        projectsList.innerHTML = "";

        const projects = pageController.loadProjects();
        for(const project of projects) {
            
            const li = document.createElement("li");
            
            const nav = document.createElement("nav");
            nav.innerText = project.name;

            nav.addEventListener("click", () => {pageController.loadProjectPage(project)});

            const delBtn = document.createElement("button");
            delBtn.classList.add("del-btn");

            delBtn.addEventListener("click", () => {pageController.removeProject(project)});
            
            li.append(nav);    
            li.append(delBtn);
            
            projectsList.append(li);
            
        }

    }

    return {

        load,
        update
    
    };

}