const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const navButtons = document.getElementById("nav-buttons");
const newNoteBtn = document.getElementById("new-note-btn");
const emptyState = document.getElementById("empty-state");
const features = document.getElementById("features");
let notes = JSON.parse(localStorage.getItem("notes"));

if(currentUser){
    console.log("user found");
    navButtons.innerHTML = `
        <span class="welcome">Hello ${currentUser.name}</span>
        <a href="#" id="logout-button"> Logout </a>
    `
    newNoteBtn.disabled = false;
    newNoteBtn.style.cursor=Pointer;
    features.style.display = "none";
    emptyState.style.display="none";
    const logoutBtn = document.getElementById("logout-button");
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("currentUser");
        window.location.href="login.html";
    })
}
