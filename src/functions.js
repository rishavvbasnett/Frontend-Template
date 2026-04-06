import { constructFrom } from "date-fns"

/* function to make DIVS */
function makeDiv(className) {
    const myDiv = document.createElement("div")
    myDiv.classList.add(className)
    return myDiv
}

/* function to make BUTTONS */
function makeBtn(className, textContent) {
    const myBtn = document.createElement("button")
    myBtn.classList.add(className)
    myBtn.textContent = textContent
    return myBtn
}

/* function to handle submit events */
function handleSubmit(form) {
    const formData = new FormData(form)
    return Object.fromEntries(formData)
}

/* function to make INPUT ELEMENTS with properties ready to use */
function createInput(type = "text", placeholder, required, id, name) {
    const input = document.createElement("input")
    input.type = type
    input.placeholder = placeholder
    input.required = required
    input.id = id
    input.name = name
    return input
}

/* function to make textArea */
function textArea(placeholder, required, id, name) {
    const textArea = document.createElement("textarea")
    textArea.placeholder = placeholder
    textArea.required = required
    textArea.id = id
    textArea.name = name
    return textArea
}
/* function to make OPTIONS FOR SELECT ELEMENTS */
function option(parent, value, text) {
    const option = document.createElement("option")
    option.value = value
    option.text = text
    parent.append(option)
    return option
}

/* function to make A DIALOG BOX*/
function makeDialog(type) {
    const Dialog = document.createElement("dialog")
    Dialog.classList.add(type)
    document.body.append(Dialog)
    return Dialog
}

/* Function to Make FORM */
function makeForm(parent, type) {
    const form = document.createElement("form")
    form.classList.add(type)

    /* Form to make new projects */
    if (type === "newProjectForm") {
        /* HEADING */
        const headingProjectForm = makeDiv("headingProjectForm")
        headingProjectForm.append("New Project")
        /* Project title */
        const projectTitle = createInput("text", "Project Title", true, "projectTitle", "projectTitle")
        /* ADD button */
        const addBtn = makeBtn("addBtn", "Add")
        /* Back button */
        const backBtn = makeBtn("backBtn", "Back")
        backBtn.type = "reset"
        backBtn.addEventListener("click", e => {
            parent.close()
        })

        form.append(headingProjectForm, projectTitle, addBtn, backBtn)

    } else {
        /* THE FORM FOR ADDING TASKS */
        /*HEADING */
        const headingTaskForm = makeDiv("headingTaskForm")
        headingTaskForm.append("New Task")
        /* Title */
        const taskTitle = createInput("text", "Title", true, "taskTitle", "taskTitle")
        /* DESCRIPTION */
        const description = textArea("Description", false, "description", "description")
        /* DUE DATE */
        const dueDate = createInput("date", "", true, "dueDate", "dueDate")
        /* PRIORITY */
        const priority = document.createElement("select")
        priority.id = "priority"
        priority.name = "priority"
        const option1 = option(priority, "low", "Low")
        const option2 = option(priority, "moderate", "Moderate")
        const option3 = option(priority, "high", "High")
        /* ADD button */
        const addBtn = makeBtn("addBtn", "Add")
        /* Back button */
        const backBtn = makeBtn("backBtn", "Back")
        backBtn.type = "reset"
        backBtn.addEventListener("click", e => {
            parent.close()
        })

        form.append(headingTaskForm, taskTitle, description, dueDate, priority, addBtn, backBtn)
    }
    parent.append(form)
    return form
}

/* function to make SVG elements */
function getSvg(code, name) {
    const template = document.createElement("template")
    template.innerHTML = code;

    const svg = template.content.querySelector("svg").cloneNode(true)
    svg.classList.add(name)
    return svg
}

/* function to make the CHECKMark icon */
function makeTick() {
    return getSvg(`
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5"/>
        </svg> `
        , "todoBox__svg--tick");
}

/* function to make the Edit icon */
function makeEdit() {
    return getSvg(`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke-linecap="round" stroke-linejoin="round"></g>
            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke-linecap="round" stroke-linejoin="round">
            </path> 
            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke-linecap="round" stroke-linejoin="round">  
            </path>
        </svg>`
        , "todoBox__svg--edit");
}

function makeDelete() {
    return getSvg(`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <path d="M10 12V17" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M14 12V17" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M4 7H20" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-linecap="round"     stroke-linejoin="round"></path> 
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        `, "todoBox__svg--delete")
}

export { createInput, option, makeDialog, makeForm, makeDiv, makeBtn, handleSubmit, getSvg, makeTick, makeDelete, makeEdit }