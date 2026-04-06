import { format, parseISO } from "date-fns"
import "./Home-styles.css"
import { Todo, Project, allProjects, myProjects, loadState, updateState } from "./classes.js"
import { createInput, option, makeDialog, makeForm, makeDiv, makeBtn, handleSubmit, getSvg, makeTick, makeDelete, makeEdit } from "./functions"
import { clear } from "./index.js"

function Home(projectId) {

    loadState()

    /* Check if the Default project with project Id 0 exists */
    const projectIds = []
    myProjects.forEach(project => {
        projectIds.push(project.id)
    })

    if (projectId) {
        projectId = projectId
    } else if (projectIds.includes(0)) {
        projectId = 0
    } else {
        projectId = projectIds[0]
    }

    document.body.classList.add("home")
    const contentBox = document.querySelector("#content")

    /* PROJECT HEADING div */
    const projectHeading = makeDiv("projectHeading")

    /* Get project title that was clicked */
    const theProject = myProjects.find(project => project.id == projectId)
    projectHeading.textContent = theProject.title
    contentBox.append(projectHeading)

    /* Todo list box */
    const todoBox = makeDiv("todoBox")
    contentBox.append(todoBox)
    renderTodos()

    /* Make a dialogBox and Form for ADD TASK Button */
    const Dialog = makeDialog("NewTask")

    const newTaskForm = makeForm(Dialog, "newTaskForm")

    /* Make Input elements for the form to load while opening to edit */
    const titleDiv = newTaskForm.querySelector(".headingTaskForm")
    const addBtn = newTaskForm.querySelector(".addBtn")
    const titleInput = newTaskForm.querySelector("#taskTitle")
    const descriptionInput = newTaskForm.querySelector("#description")
    const dueDateInput = newTaskForm.querySelector("#dueDate")
    const priorityInput = newTaskForm.querySelector("#priority")

    let currentTodo = null

    /* Task form submit event */
    newTaskForm.addEventListener("submit", e => {
        e.preventDefault();

        if (currentTodo) {
            let todo2Delete = allProjects[currentTodo.projectId].findIndex(todo => todo.taskId == currentTodo.taskId)
            allProjects[currentTodo.projectId].splice(todo2Delete, 1)
            updateState()
        }
        const task = handleSubmit(newTaskForm)
        const todo = new Todo(task.taskTitle, task.description, task.dueDate, task.priority, false, projectId)
        renderTodos()
        newTaskForm.reset();
        Dialog.close()
        currentTodo = null
    })

    /* Add Task button */
    const addTaskBtn = makeBtn("addTaskBtn", "New Task")
    contentBox.append(addTaskBtn)
    addTaskBtn.addEventListener("click", e => {
        titleDiv.textContent = "New Task"
        addBtn.textContent = "Add"
        Dialog.showModal()
    })

    /* Function to render Todos and display it/ add to the DOM */
    function renderTodos() {

        todoBox.replaceChildren()
        loadState()

        if (allProjects[projectId].length < 1) {
            const Notice = document.createElement("h2")
            Notice.textContent = "Congrats! You have no task left to do."
            Notice.classList.add("Notice")

            todoBox.appendChild(Notice)
        }


        allProjects[projectId].forEach(todo => {

            const taskDiv = makeDiv(todo.taskId)
            taskDiv.dataset.id = todo.taskId
            taskDiv.classList.add("todoBox__task")
            if (todo.completed === true) {
                taskDiv.classList.add("completed")
            }

            const title = document.createElement("p")
            title.classList.add("todoBox__title")
            title.textContent = todo.title

            const dueDate = document.createElement("p")
            dueDate.classList.add("todoBox__dueDate")
            const dateString = parseISO(todo.dueDate)
            const theDueDate = format(dateString, "MMM dd, yyyy")
            dueDate.textContent = theDueDate

            if (todo.priority === "high") {
                taskDiv.classList.add("high")

            } else if (todo.priority === "moderate") {
                taskDiv.classList.add("moderate")

            } else if (todo.priority === "low") {
                taskDiv.classList.add("low")

            }

            const logoDiv = makeDiv("todoBox__logo")

            const tickBtn = document.createElement("button")
            tickBtn.classList.add("todoBox__button", "todoBox__button--tick")
            const tickIcon = makeTick()
            tickBtn.append(tickIcon)
            const editBtn = document.createElement("button")
            editBtn.classList.add("todoBox__button", "todoBox__button--edit")
            const editIcon = makeEdit()
            editBtn.append(editIcon)
            const deleteBtn = document.createElement("button")
            deleteBtn.classList.add("todoBox__button", "todoBox__button--delete")
            const deleteIcon = makeDelete()
            deleteBtn.append(deleteIcon)

            logoDiv.append(tickBtn, editBtn, deleteBtn)

            /* Event listener Edit or remove a todo */
            taskDiv.addEventListener("click", e => {
                if ((e.target === e.currentTarget) || (e.target.closest(".todoBox__button--edit"))) {
                    const todo2Edit = allProjects[projectId].find(todo => todo.taskId == taskDiv.dataset.id)
                    currentTodo = todo2Edit

                    titleDiv.textContent = "Edit Task"
                    addBtn.textContent = "Save"
                    titleInput.value = todo2Edit.title
                    descriptionInput.value = todo2Edit.description
                    priorityInput.value = todo2Edit.priority
                    dueDateInput.value = todo2Edit.dueDate

                    newTaskForm.classList.add("editMode")
                    Dialog.showModal()

                } else if (e.target.closest(".todoBox__button--delete")) {
                    const delId = taskDiv.dataset.id
                    const delIndex = allProjects[projectId].findIndex(todo => todo.taskId == delId)
                    allProjects[projectId].splice(delIndex, 1)
                    updateState()
                    todoBox.removeChild(taskDiv)

                } else if (e.target.closest(".todoBox__button--tick")) {
                    const checkedId = taskDiv.dataset.id
                    const checkedIndex = allProjects[projectId].findIndex(todo => todo.taskId == checkedId)

                    allProjects[projectId][checkedIndex].completed = !allProjects[projectId][checkedIndex].completed
                    updateState()
                    renderTodos()
                }
            })

            taskDiv.append(title, dueDate, logoDiv)
            todoBox.append(taskDiv)
        })
    }

}

export { Home }