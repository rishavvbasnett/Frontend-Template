import "./reset.css"
import "./styles.css"

/* Pages */
import { Home, allTaskObjects } from "./home.js"
import { Projects, allProjectObjects } from "./projects.js"
import { Todo, Project, loadState, updateState } from "./classes.js"

/* Open with the Home page Rendered */
loadState()
Projects()

/* function to clear Content Box */
function clear() {
    const contentBox = document.querySelector("#content")
    contentBox.replaceChildren()
}

/* function to render the pages */
function renderPage(page) {
    if (page === "home") {
        clear()
        Home()
    } else if (page === "projects") {
        clear()
        Projects()
    }
}

/* Logic to render pages based on Nav Buttons */
const headerButtons = document.querySelectorAll("nav>button")
headerButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        let page = e.target.dataset.type
        renderPage(page)
    })
})


export { clear }