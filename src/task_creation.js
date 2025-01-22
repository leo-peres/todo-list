export default (pageController, project) => {

    const contentDiv = document.getElementById("content");

    const mainDiv = document.createElement("div");
    mainDiv.id = "project-creation-main-div";
    mainDiv.classList.add("content-main-div");

    const header = document.createElement("h1");
    header.innerText = ""

    const form = document.createElement("form");
    form.classList.add("task-creation-form");
    form.id = "task-creation-form";

    //////////////

    const titleLabel = document.createElement("label");
    titleLabel.classList.add("form-entry-div");
    titleLabel.innerText = "Title";

    const titleInput = document.createElement("input");
    titleLabel.append(titleInput);

    //////////////

    const dueDateLabel = document.createElement("label");
    dueDateLabel.classList.add("form-entry-div");
    dueDateLabel.innerText = "Due date"

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateLabel.append(dueDateInput);

    //////////////

    const textLabel = document.createElement("label");
    textLabel.classList.add("form-entry-div");
    textLabel.innerText = "Text"

    const textInput = document.createElement("textarea");
    textInput.setAttribute("rows", 10);
    textLabel.append(textInput);

    //////////////

    const priorityLabel = document.createElement("label");
    priorityLabel.classList.add("form-entry-div");
    priorityLabel.innerText = "Priority";

    const priorityInput = document.createElement("select");
    priorityInput.innerHTML = '<option value="1">1</option>' +
                              '<option value="2">2</option>' +
                              '<option value="3">3</option>' +
                              '<option value="4">4</option>' +
                              '<option value="5">5</option>';
    priorityLabel.append(priorityInput);

    //////////////

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("ok-btn");
    submitBtn.innerText = "OK";

    submitBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
    });

    //////////////

    form.append(titleLabel);
    form.append(dueDateLabel);
    form.append(textLabel);
    form.append(priorityLabel);
    form.append(submitBtn);

    //////////////

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

        project,
        load,
        update

    };

}