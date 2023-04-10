// Data structure
const myLibrary = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pageNum: 238,
    isRead: false,
  },
];

class Book {
  constructor(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
  }
}

function addBookToLibrary() {
  const libraryNode = document.getElementById('library');

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

      newBook.classList.remove('hidden');
      newBook.removeAttribute('id');
      libraryNode.appendChild(newBook);
    }
  });
}
