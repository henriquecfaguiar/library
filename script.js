const library = document.getElementById('library');
const addBookBtn = document.getElementById('add-book');
const form = document.querySelector('.form');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formRead = document.getElementById('read');
const cancelBtn = document.getElementById('cancel');
const toggleText = document.querySelector('.toggle-text');

const myLibrary = [];

addBookBtn.addEventListener('click', handleFormModal);
cancelBtn.addEventListener('click', handleFormModal);
formRead.addEventListener('change', updateToggle);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );
  newBook.addToLibrary();
  updateLibrary();
  handleFormModal();
});

function handleFormModal() {
  resetForm();
  if (form.classList.contains('hidden')) {
    form.classList.replace('hidden', 'block');
  } else {
    form.classList.replace('block', 'hidden');
  }
}
function updateToggle() {
  formRead.checked
    ? (toggleText.innerHTML = 'Read')
    : (toggleText.innerHTML = 'Not Read');
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
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    const closeBtn = document.createElement('button');

    book.classList.add(
      'rounded-md',
      'shadow-md',
      'p-4',
      'border-2',
      'w-72',
      'flex',
      'flex-col'
    );
    closeBtn.classList.add(
      'rounded-lg',
      'text-sm',
      'border-2',
      'mt-2',
      'bg-gray-800',
      'px-4',
      'py-1',
      'text-gray-100',
      'hover:bg-gray-700'
    );

    bookTitle.textContent = myBook.title;
    bookAuthor.textContent = myBook.author;
    bookPages.textContent = myBook.numOfPages;
    bookRead.textContent = myBook.isRead;
    closeBtn.textContent = 'Delete';

    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    book.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
      const bookIndex = myLibrary.findIndex(
        (book) =>
          book.title.split(': ')[1] === bookTitle.textContent.split(': ')[1]
      );
      myLibrary.splice(bookIndex, 1);
      library.removeChild(book);
    });

    library.appendChild(book);
  });
}
