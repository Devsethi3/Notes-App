// DOM elements
const makeNotes = document.querySelector(".make-notes");
const inputBox = document.getElementById("input-box");
const inputClose = document.getElementById("input-close");
const overlay = document.querySelector(".overlay");
const notesContainer = document.querySelector(".notes-container");
const inputTitle = document.getElementById("title");
const inputTextarea = document.getElementById("description");
const addNotesBtn = document.getElementById("addNotes-btn");

// Define randomColor globally
let randomColor;
const predefinedColors = ["#b81e45", "#009b4b", "#8035a8", "#008678", "#333652"];

// Fetch existing notes from localStorage or create an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Event listener for opening the input box to add new notes
if (makeNotes) {
  makeNotes.addEventListener("click", () => {
    inputBox.classList.add("show-input");
    overlay.classList.add("show-overlay");
  });
}

// Event listener for closing the input box
if (inputClose) {
  inputClose.addEventListener("click", () => {
    inputBox.classList.remove("show-input");
    overlay.classList.remove("show-overlay");
  });
}

// Display existing notes on the page
notes.forEach((note) => {
  const createNotes = `<div class="notes" style="background-color: ${note.color}">
                          <h3 class="notes-title"><i class="ri-file-list-2-line"></i>${note.title}</h3>
                          <p class="notes-content">${note.content}</p>
                          <div class="notes-buttons">
                              <p class="modify"></p>
                              <div class="notes-action">
                                  <i class="ri-delete-bin-line" id="delete-icon"></i>
                                  <i class="ri-edit-line" id="edit-icon"></i>
                              </div>
                          </div>
                        </div>`;
  notesContainer.insertAdjacentHTML("beforeend", createNotes);
});

// Event listener for adding new notes
addNotesBtn.addEventListener("click", () => {
  if (inputTitle.value === "" || inputTextarea.value === "") {
    alert("You must write something");
  } else {
    // Generate a random background color
    randomColor = getRandomColor();

    // Create the note with the random background color
    const createNotes = `<div class="notes" style="background-color: ${randomColor}">
                            <h3 class="notes-title"><i class="ri-file-list-2-line"></i>${inputTitle.value}</h3>
                            <p class="notes-content">${inputTextarea.value}</p>
                            <div class="notes-buttons">
                                <p class="modify"></p>
                                <div class="notes-action">
                                    <i class="ri-delete-bin-line" id="delete-icon"></i>
                                    <i class="ri-edit-line" id="edit-icon"></i>
                                </div>
                            </div>
                          </div>`;
    notesContainer.insertAdjacentHTML("beforeend", createNotes);
  }

  // Add new note to the array and update localStorage
  notes.push({
    title: inputTitle.value,
    content: inputTextarea.value,
    color: randomColor, // Store the background color in the notes array
  });
  localStorage.setItem("notes", JSON.stringify(notes));

  // Reset input fields and hide the input box
  inputBox.classList.remove("show-input");
  overlay.classList.remove("show-overlay");
  inputTitle.value = "";
  inputTextarea.value = "";
});


// Event listener for handling delete and edit actions on notes
notesContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.matches("#delete-icon")) {
    // Delete a note
    let deleteNote = target.closest(".notes");
    let deleteTitle = deleteNote
      .querySelector(".notes-title")
      .textContent.trim();

    // Remove the deleted note from the array and localStorage
    notes = notes.filter((note) => note.title !== deleteTitle);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Remove the deleted note from the DOM
    deleteNote.remove();
  } else if (target.matches("#edit-icon")) {
    // Edit a note
    let editNote = target.closest(".notes");
    let editTitle = editNote.querySelector(".notes-title").textContent.trim();
    let editContent = editNote
      .querySelector(".notes-content")
      .textContent.trim();

    // Show input box with existing data for editing
    inputTitle.value = editTitle;
    inputTextarea.value = editContent;
    inputBox.classList.add("show-input");
    overlay.classList.add("show-overlay");

    // Remove the edited note from the array and localStorage
    notes = notes.filter((note) => note.title !== editTitle);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Remove the edited note from the DOM
    editNote.remove();
  }
});

// Function to generate a random background color
// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);
  return predefinedColors[randomIndex];
}