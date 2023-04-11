const newBookBtn = document.getElementById('new-book-btn');
const form = document.querySelector('form');
const formModal = document.getElementById('form-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputRead = document.getElementById('read');
const bookTemplate = document.getElementById('book-template');
const library = document.getElementById('library');

const myLibrary = [];

class Book {
  constructor(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
  }
  updateReadStatus() {
    this.isRead = !this.isRead;
  }
}

const handleModal = () => {
  formModal.classList.toggle('hidden');
};

const updateLibrary = () => {
  // Clear rendered books
  (() => {
    while (library.firstChild) {
      library.removeChild(library.firstChild);
    }
  })();

  myLibrary.forEach((book, index) => {
    const newBook = bookTemplate.cloneNode(true);

    newBook.dataset.bookIndex = index;
    newBook.querySelector('[data-book="title"]').textContent = book.title;
    newBook.querySelector('[data-book="author"]').textContent = book.author;
    newBook.querySelector(
      '[data-book="pages"]'
    ).textContent = `${book.pageNum} pages`;

    const toggleRead = newBook.querySelector('[data-book="toggle"]');
    const deleteBookBtn = newBook.querySelector('#delete-book-btn');

    if (!book.isRead) {
      newBook.querySelector('[data-book="read"]').classList.toggle('hidden');
      newBook.querySelector('[data-book="notRead"]').classList.toggle('hidden');
      toggleRead.checked = false;
    }

    toggleRead.addEventListener('change', () => {
      newBook.querySelector('[data-book="read"]').classList.toggle('hidden');
      newBook.querySelector('[data-book="notRead"]').classList.toggle('hidden');
      book.updateReadStatus();
    });

    deleteBookBtn.addEventListener('click', () => {
      newBook.remove();
      myLibrary.splice(index, 1);
      updateLibrary();
    });

    newBook.classList.remove('hidden');
    newBook.removeAttribute('id');
    library.appendChild(newBook);
  });
};

newBookBtn.addEventListener('click', () => {
  // Reset form
  inputTitle.value = null;
  inputAuthor.value = null;
  inputPages.value = null;
  inputRead.checked = false;
  handleModal();
});

closeModalBtn.addEventListener('click', handleModal);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputRead.checked
  );
  myLibrary.push(newBook);
  updateLibrary();
  handleModal();
});
