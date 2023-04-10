const libraryNode = document.getElementById('library');
const newBookBtn = document.getElementById('new-book-btn');
const form = document.querySelector('form');
const formModal = document.getElementById('form-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

const myLibrary = [];

newBookBtn.addEventListener('click', () => {
  title.value = null;
  author.value = null;
  pages.value = null;
  read.checked = false;
  handleModal();
});

closeModalBtn.addEventListener('click', handleModal);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  myLibrary.push(newBook);
  updateLibrary();
  handleModal();
});

class Book {
  constructor(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
  }
}

function handleModal() {
  formModal.classList.toggle('hidden');
}

function updateLibrary() {
  myLibrary.forEach((myBook, index) => {
    const bookNode = document.querySelector(`[data-book="${index}"]`);

    // If book does not exist
    if (!bookNode) {
      const bookTemplate = document.getElementById('book-template');
      const newBook = bookTemplate.cloneNode(true);

      newBook.dataset.book = index;

      const bookTitle = newBook.querySelector('[data-book="title"]');
      const bookAuthor = newBook.querySelector('[data-book="author"]');
      const bookPageNum = newBook.querySelector('[data-book="pages"]');
      const bookIsRead = newBook.querySelector('[data-book="read"]');
      const bookIsNotRead = newBook.querySelector('[data-book="notRead"]');
      const readToggle = newBook.querySelector('[data-book="toggle"]');
      const deleteBookBtn = newBook.querySelector('#delete-book-btn');

      bookTitle.textContent = myBook.title;
      bookAuthor.textContent = myBook.author;
      bookPageNum.textContent = `${myBook.pageNum} pages`;

      if (!myBook.isRead) {
        bookIsRead.classList.add('hidden');
        bookIsNotRead.classList.remove('hidden');
        readToggle.checked = false;
      }

      // Toggle read on book card
      readToggle.addEventListener('change', () => {
        if (bookIsRead.classList.contains('hidden')) {
          bookIsRead.classList.remove('hidden');
          bookIsNotRead.classList.add('hidden');
        } else {
          bookIsRead.classList.add('hidden');
          bookIsNotRead.classList.remove('hidden');
        }
        myBook.isRead = !myBook.isRead;
      });

      deleteBookBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        newBook.remove();
      });

      newBook.classList.remove('hidden');
      newBook.removeAttribute('id');
      libraryNode.appendChild(newBook);
    }
  });
}
