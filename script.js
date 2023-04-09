const library = document.getElementById('library');
const addBookBtn = document.getElementById('add-book');
const form = document.querySelector('.form');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formRead = document.getElementById('read');
const cancelBtn = document.getElementById('cancel');
const toggleText = document.querySelector('.toggle-text');
const toggleRead = document.getElementById('toggle-read');

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

function resetForm() {
  formTitle.value = null;
  formAuthor.value = null;
  formPages.value = null;
  formRead.checked = false;
  updateToggle();
}

class Book {
  constructor(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
  }
  addToLibrary() {
    myLibrary.push(this);
  }
}

function updateLibrary() {
  myLibrary.forEach((myBook, index) => {
    let book = document.querySelector(`[data-index="${index}"]`);

    if (!book) {
      const book = document.createElement('div');
      const bookTitle = document.createElement('h3');
      const bookAuthor = document.createElement('p');
      const bookPages = document.createElement('p');
      const cardToggleRead = toggleRead.cloneNode(true);
      const bookRead = document.createElement('p');
      const closeBtn = document.createElement('button');

      book.dataset.index = index;
      book.classList.add(
        'rounded-md',
        'shadow-md',
        'p-4',
        'border-2',
        'w-72',
        'flex',
        'flex-col'
      );
      bookTitle.classList.add('text-lg', 'font-medium');
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
      bookPages.textContent = `${myBook.numOfPages} pages`;
      bookRead.textContent = myBook.isRead;
      closeBtn.textContent = 'Delete';

      book.appendChild(bookTitle);
      book.appendChild(bookAuthor);
      book.appendChild(bookPages);
      book.appendChild(cardToggleRead);
      book.appendChild(closeBtn);

      cardToggleRead.addEventListener('change', () => {
        const toggleRead = cardToggleRead.querySelector('#read');
        const toggleText = cardToggleRead.querySelector('.toggle-text');

        toggleRead.checked
          ? (toggleText.textContent = 'Read')
          : (toggleText.textContent = 'Not Read');
      });

      // Delete book
      closeBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        library.removeChild(book);
      });

      library.appendChild(book);
    } else {
      console.log('Already exists.');
    }
  });
}
