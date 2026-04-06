import "./Project-styles.css"
import { format, parseISO } from 'date-fns'
import { Todo, Project, loadState, updateState, myProjects, allProjects, makeDefaultProject } from "./classes.js"
import { createInput, option, makeDialog, makeForm, makeDiv, makeBtn, handleSubmit, getSvg, makeDelete, makeTick, makeEdit } from "./functions.js"
import { Home } from "./home.js"
import { clear } from "./index.js"

function Projects() {

    document.body.classList.add("projects")
    const contentBox = document.querySelector("#content")

    /* Your Projects Heading */
    const pageTitle = makeDiv("pageTitle")
    pageTitle.append("Your Projects")
    contentBox.append(pageTitle)

    /* Projects box */
    const projectListBox = makeDiv("projectListBox")
    contentBox.append(projectListBox)

    renderProjects() /* Render the default project on opening */

    /* Dialogbox and form to Add new Projects */
    const Dialog = makeDialog("newProject")
    let currentProject;

    const newProjectForm = makeForm(Dialog, "newProjectForm")
    const projectTitleInput = newProjectForm.querySelector("input")
    const FormTitle = newProjectForm.querySelector("div")
    const FormAddBtn = newProjectForm.querySelector(".addBtn")

    /* New Project button */
    const newProjectBtn = makeBtn("newProjectBtn", "New Project")
    contentBox.append(newProjectBtn)
    newProjectBtn.addEventListener("click", e => {
        FormTitle.textContent = "New Project"
        FormAddBtn.textContent = "Add"
        Dialog.showModal()
    })

    /* Submit event for the form */
    newProjectForm.addEventListener("submit", e => {
        e.preventDefault()

        if (currentProject) {
            myProjects.splice((myProjects.findIndex(i => i.id == currentProject.id)), 1)
            updateState()
        }

        const projectObject = handleSubmit(newProjectForm)

        const project = new Project({ title: projectObject.projectTitle, id: projectObject.projectId })

        currentProject = null
        renderProjects()
        newProjectForm.reset()
        Dialog.close()
    })

    /* Function to Render projects from myProjects array */
    function renderProjects() {

        projectListBox.replaceChildren()
        loadState()

        myProjects.forEach(project => {
            const projectDiv = makeDiv("projectDiv")
            projectDiv.dataset.id = project.id
            projectDiv.id = project.id

            const title = document.createElement("p")
            title.textContent = project.title
            title.classList.add("projectDiv__title")

            const logos = makeDiv("projectDiv__logos")

            const editButton = document.createElement("button")
            editButton.classList.add("projectDiv__button", "projectDiv__button--edit")

            const editicon = makeEdit()
            editicon.classList.remove("todoBox__svg--edit")
            editicon.classList.add("projectDiv__svg--edit")

            editButton.append(editicon)

            const removeButton = document.createElement("button")
            removeButton.classList.add("projectDiv__button", "projectDiv__button--delete")

            const removeicon = makeDelete()
            removeicon.classList.remove("todoBox__svg--delete")
            removeicon.classList.add("projectDiv__svg--delete")

            removeButton.append(removeicon)

            logos.append(editButton, removeButton)

            projectDiv.addEventListener("click", e => {

                if (e.target.closest(".projectDiv__button--edit")) {
                    currentProject = project
                    projectTitleInput.value = project.title
                    FormTitle.textContent = "Edit Project"
                    FormAddBtn.textContent = "Save"
                    Dialog.showModal()
                }
                else if (e.target.closest(".projectDiv__button--delete")) {
                    let ID2delete = e.target.closest(".projectDiv").dataset.id
                    console.log(ID2delete)
                    removeProject(ID2delete)
                    /* REMOVE THE PARENT DIV FORM THE PROJECTLIST BOX */
                    projectListBox.removeChild(e.target.closest(".projectDiv"))
                    renderProjects()
                }
            })

            projectDiv.addEventListener("click", e => {
                if (e.target === e.currentTarget) {
                    clear()
                    Home(e.currentTarget.dataset.id)
                }
            })

            projectDiv.append(title, logos)
            projectListBox.append(projectDiv)
        })
    }

    /* Function to Remove Projects from Data */
    function removeProject(projectId) {
        loadState()
        const removeIndex = myProjects.findIndex(Project => Project.id == projectId)

        if ((allProjects[projectId].length) > 0) {
            const choice = prompt(`This Project has ${allProjects[projectId].length} tasks. Do you want to delete it? (y/n)`)

            if (choice === "y") {
                myProjects.splice(removeIndex, 1)
                delete allProjects[projectId]
            } else {
                return
            }
        } else {
            myProjects.splice(removeIndex, 1)
            delete allProjects[projectId]
        }
        makeDefaultProject()
        updateState()
    }
}

export { Projects }