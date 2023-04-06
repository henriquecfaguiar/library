const library = document.getElementById('library');
const addBookBtn = document.getElementById('add-book');
const form = document.querySelector('.form');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formRead = document.getElementById('read');
const submitFormBtn = document.getElementById('submit-form');
const cancelBtn = document.getElementById('cancel');
const toggleText = document.querySelector('.toggle-text');

const myLibrary = [];

addBookBtn.addEventListener('click', handleFormModal);
cancelBtn.addEventListener('click', handleFormModal);
submitFormBtn.addEventListener('click', addNewBook);
formRead.addEventListener('change', updateToggle);

function handleFormModal() {
  if (form.classList.contains('hidden')) {
    form.classList.replace('hidden', 'block');
  } else {
    form.classList.replace('block', 'hidden');
  }
  resetForm();
}

function cleanLibrary() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

function resetForm() {
  formTitle.value = null;
  formAuthor.value = null;
  formPages.value = null;
  formRead.checked = false;
  updateToggle();
}

function updateToggle() {
  formRead.checked
    ? (toggleText.innerHTML = 'Read')
    : (toggleText.innerHTML = 'Not Read');
}

function addNewBook(event) {
  const newBook = new Book(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );
  newBook.addToLibrary();
  updateLibrary();
  handleFormModal();
  event.preventDefault();
}

class Book {
  constructor(title, author, numOfPages, isRead) {
    this.title = `Title: ${title}`;
    this.author = `Author: ${author}`;
    this.numOfPages = `Pages: ${numOfPages}`;
    this.isRead = `${isRead ? 'Read' : 'Not Read'}`;
  }
  addToLibrary() {
    myLibrary.push(this);
  }
}

function updateLibrary() {
  cleanLibrary();

  myLibrary.forEach((myBook) => {
    const book = document.createElement('div');
    book.classList.add('rounded-md', 'shadow-md', 'p-4', 'border-2', 'w-72');
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = myBook.title;
    book.appendChild(bookTitle);
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = myBook.author;
    book.appendChild(bookAuthor);
    const bookPages = document.createElement('p');
    bookPages.innerText = myBook.numOfPages;
    book.appendChild(bookPages);
    const bookRead = document.createElement('p');
    bookRead.innerText = myBook.isRead;
    book.appendChild(bookRead);
    library.appendChild(book);
  });
}
