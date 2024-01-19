document.addEventListener("DOMContentLoaded", loadNotes);

function saveNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const color = document.getElementById("color").value;
  const pin = document.getElementById("pin").checked;
  const date = new Date().toLocaleString();

  const note = {
    title,
    content,
    color,
    pin,
    date,
  };

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  const editIndex = document.getElementById("edit-index").value;

  if (editIndex !== "") {
    notes[editIndex] = note;
    document.getElementById("edit-index").value = "";
  } else {
    notes.push(note);
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  clearForm();
  loadNotes();
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes[index];

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;
  document.getElementById("color").value = note.color;
  document.getElementById("pin").checked = note.pin;

  document.getElementById("edit-index").value = index;
}

function loadNotes() {
  const noteList = document.getElementById("note-list");
  noteList.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("note-actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edytuj";
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Usuń";
    deleteBtn.onclick = () => deleteNote(index);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <p>${note.date}</p>
    `;

    noteElement.appendChild(actionsDiv);
    noteList.appendChild(noteElement);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("pin").checked = false;
}
