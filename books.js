let myLibrary = [];

// Book constructor
function Book(title, author, pages, read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// Toggle read status function
function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

// Image upload function
document.addEventListener("DOMContentLoaded", function() {
  let profilePic = document.getElementById("profile-pic");
  let inputFile = document.getElementById("input-file");

  inputFile.onchange = () => {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
  };
});

// Render function
function render() {
  let libraryEl = document.querySelector("#library");
  libraryEl.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.innerHTML = `
      <div class="card-header">
        <h3 class="book-title">${book.title}</h3>
        <img src="${book.image}" alt="Book Cover" class="book-image">
        <h5 class="author">by ${book.author}</h5>
      </div>
      <div class="card-body">
        <p>${book.pages} pages</p>
        <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
        <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
      </div>
    `;
    libraryEl.appendChild(bookEl);
  }
}

// Remove book function
function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

// Add book function
function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  let image = document.getElementById("profile-pic").src; // Get image
  let newBook = new Book(title, author, pages, read, image); // Create new book
  myLibrary.push(newBook);
  render();
}

// Show form for new book
let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", function() {
  let newBookForm = document.querySelector("#new-book-form");
  newBookForm.style.display = "block";
});

// Handle form submission
document.querySelector("#new-book-form").addEventListener("submit", function(event) {
  event.preventDefault();
  addBookToLibrary();
});
