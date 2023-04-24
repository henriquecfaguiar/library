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

const setLocalStorage = () => {
  localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary));
};

// Fetch local storage
const storedLibrary = localStorage.getItem('bookLibrary');
const bookLibrary = storedLibrary ? JSON.parse(storedLibrary) : [];
updateLibrary();

const book = (title, author, pageNum, isRead) => {
  return {
    title,
    author,
    pageNum,
    isRead,
  };
};

const handleModal = () => {
  formModal.classList.toggle('hidden');
};

function updateLibrary() {
  // Clear rendered books
  (() => {
    while (library.firstChild) {
      library.removeChild(library.firstChild);
    }
  })();

  bookLibrary.forEach((book, index) => {
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
      book.isRead = !book.isRead;

      setLocalStorage();
    });

    deleteBookBtn.addEventListener('click', () => {
      newBook.remove();
      bookLibrary.splice(index, 1);
      updateLibrary();
    });

    newBook.classList.remove('hidden');
    newBook.removeAttribute('id');
    library.appendChild(newBook);
  });

  setLocalStorage();
}

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

  const newBook = book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputRead.checked
  );

  bookLibrary.push(newBook);
  updateLibrary();
  handleModal();
});
