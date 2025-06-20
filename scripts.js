// DOM Objects Selection
const library = document.querySelector("#library");
const addBookBtn = document.querySelector("[data-open-modal]"); // The "Add Book" button
const modal = document.querySelector("[data-modal]"); // The <dialog> element
const closeModalBtn = document.querySelector("[data-close-modal]"); // The 'X' button inside the modal
const addBookForm = document.querySelector("#addBookForm"); // The form itself

// Library Array
const myLibrary = [];

// SVG Variables
const svgBook = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m51.422 38.059v18.199h-2.8398v-18.199h-2.8398v-2.8398h-19.656v2.8398h-2.8398v26.727h25.336v-2.8398h-2.8398l-0.003907-2.8438h2.8398v2.8398h2.8398l0.003906-2.8398h2.8398v2.8398h-2.8398v2.8398h28.176l-0.003906-23.883h-5.6797v15.359h-19.656v2.8398h16.816v-26.723h-16.816v2.8398h-2.8398zm-8.5273 8.4961v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm0-7.3164v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm14.211 7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm0-7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm-33.859 25.547h-2.8477v-23.887h5.6797v15.359h19.656v2.8398l-16.809 0.003906v-26.727h16.816v2.8398h2.8398v2.8398h5.6797v-2.8398h19.656v2.8398h2.8398l-0.003906 2.8438v26.727h-53.516v-2.8398z" fill-rule="evenodd"/>
</svg>`;
const svgRead = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m15 19.992h-5v5.0039h5z"/>
 <path d="m85 19.992v5.0039h5v-5.0039z"/>
 <path d="m10 24.992h-5v20.008h5z"/>
 <path d="m90 24.992v20.008h5l-0.003906-20.008h-5z"/>
 <path d="m5 45h-5v10.004h5z"/>
 <path d="m55 45h-10v5.0039h10z"/>
 <path d="m100 45h-5v10.004h5z"/>
 <path d="m35 50.004h-25v5.0039h25z"/>
 <path d="m45 50.004h-5v5.0039h5z"/>
 <path d="m60 55.004v-5.0039h-5v5.0039z"/>
 <path d="m90 50.004h-25v5.0039h25z"/>
 <path d="m10 75.012v-20.008h-5v20.008z"/>
 <path d="m40 75.012v-20.008h-5v20.008z"/>
 <path d="m64.996 75.012v-20.008h-5v20.008z"/>
 <path d="m95 75.012v-20.008h-5v20.008z"/>
 <path d="m25 60.004h-5v5.0039h5z"/>
 <path d="m80 60.004h-5v5.0039h5z"/>
 <path d="m20 65.004h-5v5.0039h5z"/>
 <path d="m75 65.004h-5v5.0039h5z"/>
 <path d="m10 80.008h25v-5.0039l-25 0.003906v5.0039z"/>
 <path d="m64.996 80.008h25v-5.0039h-25z"/>
</svg>`;
const svgDelete = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m35.297 0v11.766h-11.762v5.8828h52.922v-5.8828h-11.762v-11.766h-29.402zm23.52 11.766h-17.641v-5.8828h17.641z"/>
 <path d="m23.535 23.527v-5.8828h-5.8789v11.766h5.8789v64.707h5.8789v-64.703h41.16v64.707h5.8789v-64.707h5.8789v-11.766h-5.8789v5.8828z"/>
 <path d="m35.297 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m47.062 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m58.816 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m29.418 100h41.16v-5.8828h-41.16z"/>
</svg>`;

// Object Constructor of Book
function Book(name, author, pages, read) {
  this.id = crypto.randomUUID(); // Unique ID for each book
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to create book and store it in an array
function addBookToLibrary(name, author, pages, read) {
  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
}

// Adding manually some books for easier testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

// Function that loops through the array and displays each book on the page
function displayBooks() {
  const addBtn = document.querySelector(".open-modal-btn");
  // Temporarily move the button out of the way
  addBtn.remove();
  // Clear book cards
  library.innerHTML = "";
  // Re-insert the button
  library.appendChild(addBtn);
  // Loop through each book on the array
  for (const book of myLibrary) {
    // Create the main book div
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.dataset.bookId = book.id; // Store book ID on the DOM element for easy lookup later

    // Create the title div
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.name;

    // Create the img div
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("img");
    imageDiv.innerHTML = svgBook;

    // Create the btns div
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");

    // Create the respective buttons
    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    readBtn.innerHTML = svgRead;
    // Add a class based on read status for styling (e.g., green if read, grey if unread)
    if (book.read) {
      readBtn.classList.add("read-true");
      // Optionally, if you want specific text for "read" status
      // readBtn.setAttribute('title', 'Mark as Unread');
    } else {
      readBtn.classList.add("read-false");
      // readBtn.setAttribute('title', 'Mark as Read');
    }
    // Add event listener for toggling read status
    readBtn.addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = svgDelete;
    // Add event listener for deleting book
    deleteBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    // Append buttons to btnsDiv
    btnsDiv.appendChild(readBtn);
    btnsDiv.appendChild(deleteBtn);

    // Append all elements to book div
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(imageDiv);
    bookDiv.appendChild(btnsDiv);

    // Add book div to library
    library.appendChild(bookDiv);
  }
}

// --- Modal Functionality ---

// Function to open the modal
function openModal() {
  modal.showModal(); // showModal() method makes the <dialog> element visible
  // Optional: Reset form fields when modal opens
  addBookForm.reset();
}

// Function to close the modal
function closeModal() {
  modal.close(); // close() method hides the <dialog> element
}

// --- Form Submission Handler ---

function handleFormSubmit(event) {
  // Get data from form inputs
  const name = addBookForm.elements.bookName.value;
  const author = addBookForm.elements.bookAuthor.value;
  const pages = parseInt(addBookForm.elements.bookPages.value); // Convert pages to a number
  const read = addBookForm.elements.bookRead.checked; // Checkbox value (true/false)

  // Add the new book to the library array
  addBookToLibrary(name, author, pages, read);

  // Re-display all books to include the new one
  displayBooks();

  // The modal will close automatically due to method="dialog" on the form.
  // If you removed method="dialog", you would call closeModal() here.
}

// --- Book Management Functions ---

// Function to remove a book from the array
function removeBook(bookId) {
  // Find the index of the book with the matching ID
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    // If book is found
    myLibrary.splice(bookIndex, 1); // Remove it from the array
    displayBooks(); // Re-render the library
  }
}

// Function to toggle the read status of a book
function toggleReadStatus(bookId) {
  // Find the book with the matching ID
  const bookToToggle = myLibrary.find((book) => book.id === bookId);

  if (bookToToggle) {
    // If book is found
    bookToToggle.read = !bookToToggle.read; // Toggle the boolean value
    displayBooks(); // Re-render the library
  }
}

// --- Event Listeners ---

// Open modal when "Add Book" button is clicked
addBookBtn.addEventListener("click", openModal);

// Close modal when the 'X' button is clicked
closeModalBtn.addEventListener("click", closeModal);

// Handle form submission
addBookForm.addEventListener("submit", handleFormSubmit);

// Initial display of books when script loads
displayBooks();
