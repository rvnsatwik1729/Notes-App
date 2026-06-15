const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const navButtons = document.getElementById("nav-buttons");
const newNoteBtn = document.getElementById("new-note-btn");
const emptyState = document.getElementById("empty-state");
const features = document.getElementById("features");

const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search-input");

const noteModal = document.getElementById("note-modal");
const noteForm = document.getElementById("note-form");
const closeModal = document.getElementById("close-modal");
const saveModal = document.getElementById("save-button");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingId = null;


function renderNotes(searchText = "") {

    notesContainer.innerHTML = "";

    let userNotes = notes.filter((note) => {

        const belongsToUser =
            note.userId === currentUser.id;

        const matchesSearch =
            note.title.toLowerCase().includes(searchText) ||
            note.content.toLowerCase().includes(searchText);

        return belongsToUser && matchesSearch;

    });


    userNotes.sort((a, b) => {
        return b.pinned - a.pinned;
    });


    if (userNotes.length === 0) {

        notesContainer.innerHTML = `
            <p class="no-notes">
                No notes found.
            </p>
        `;

        return;
    }


    for (let note of userNotes) {

        const card = document.createElement("div");

        card.className = "note-card";


        card.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.content}</p>

            <small>
                Created: ${note.createdAt}
            </small>

            <small>
                Updated: ${note.updatedAt}
            </small>


            <div class="note-actions">

                <button 
                    class="pin-btn"
                    data-id="${note.id}">
                    
                    ${note.pinned ? "📌 Unpin" : "⭐ Pin"}

                </button>


                <button 
                    class="edit-btn"
                    data-id="${note.id}">
                    
                    ✏️ Edit

                </button>


                <button 
                    class="delete-btn"
                    data-id="${note.id}">
                    
                    🗑 Delete

                </button>

            </div>
        `;


        notesContainer.appendChild(card);

    }

    const deleteButtons =
        document.querySelectorAll(".delete-btn");


    for (let button of deleteButtons) {

        button.addEventListener("click", () => {

            const noteId =
                Number(button.dataset.id);


            notes = notes.filter((note) => {
                return note.id !== noteId;
            });


            localStorage.setItem(
                "notes",
                JSON.stringify(notes)
            );


            renderNotes(searchInput.value.toLowerCase());

        });

    }

    const pinButtons =
        document.querySelectorAll(".pin-btn");


    for (let button of pinButtons) {

        button.addEventListener("click", () => {

            const noteId =
                Number(button.dataset.id);


            const note =
                notes.find((note) => {
                    return note.id === noteId;
                });


            note.pinned = !note.pinned;


            localStorage.setItem(
                "notes",
                JSON.stringify(notes)
            );


            renderNotes(searchInput.value.toLowerCase());

        });

    }

    const editButtons = document.querySelectorAll(".edit-btn");


    for (let button of editButtons) {

        button.addEventListener("click", () => {


            const noteId = Number(button.dataset.id);


            const editingNote = notes.find((note) => {
                    return note.id === noteId;
                });


            editingId = noteId;

            noteTitleInput.value = editingNote.title;

            noteContentInput.value = editingNote.content;

            noteModal.style.display = "flex";
        });

    }

}


if (currentUser) {

    navButtons.innerHTML = `
        <span class="welcome">
            Hello ${currentUser.name}
        </span>

        <a href="#" id="logout-button">
            Logout
        </a>
    `;


    newNoteBtn.disabled = false;
    newNoteBtn.style.cursor = "pointer";

    features.style.display = "none";
    emptyState.style.display = "none";

    renderNotes();

    searchInput.addEventListener("input", () => {

        const searchText = searchInput.value.trim().toLowerCase();

        renderNotes(searchText);

    });

    const logoutBtn =
        document.getElementById("logout-button");

        logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });

    newNoteBtn.addEventListener("click", () => {

        editingId = null;

        noteForm.reset();

        noteModal.style.display = "flex";

    });

    closeModal.addEventListener("click", () => {

        noteModal.style.display = "none";

        noteForm.reset();

        editingId = null;

    });

    noteForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const title = noteTitleInput.value.trim();

        const content = noteContentInput.value.trim();

        if (title === "" || content === "") {

            alert("Please fill all fields");

            return;

        }

        if (editingId) {

            const note = notes.find((note) => {
                    return note.id === editingId;
                });
            note.title = title;

            note.content = content;

            note.updatedAt = new Date().toLocaleString();

            editingId = null;
        }

        else {

            const newNote = {

                id: Date.now(),

                userId: currentUser.id,

                title: title,

                content: content,

                pinned: false,

                createdAt: new Date().toLocaleString(),

                updatedAt: new Date().toLocaleString()

            };

            notes.push(newNote);

        }

        localStorage.setItem("notes",JSON.stringify(notes));

        renderNotes(
            searchInput.value.trim().toLowerCase()
        );

        noteModal.style.display = "none";

        noteForm.reset();

    });

}