

PUSHING THE NEW OBJECTS TO THE LIBRARY
function addBookToLibrary(book) {
    b.push(book);
}

//CONSTRUCTOR TO CREATE NEW BOOK OBJECT
function book(name, author, numberOfPages, readOrNot) {
    this.id = (b.length == 0)? 0 : (b[b.length-1].id) +1;
    this.name = name;
	this.author = author;
	this.numberOfPages = numberOfPages;
	this.readOrNot = readOrNot;
}

//FUNCTION TO REFRESH THE CARDS ON THE PAGE
function refreshLibrary() {
    container = document.querySelector('.container');
    currentNodes = Array.from(container.querySelectorAll('div')).map(bookCard => {return bookCard.id});
    // storedLibrary.map(book => { if (!(currentNodes.includes(book.id.toString()))) createNewBookCard(book)})
    dbBook.on("child_added", snapshot => {
        if (!(currentNodes.includes(snapshot.key))) createNewBookCard(snapshot.val(),snapshot.key)
    });
}

// Populating the array to see some content
function populateArray() {
    addBookToLibrary(new book('Crime and Punishment', 'Fiodor Dostoïevski',576, '0'));
    addBookToLibrary(new book('The Hobbit', 'J. R. R. Tolkien', 310, '1'));
    addBookToLibrary(new book('Americanah','Chimamanda Ngozi Adichie', 496, '0'));
    addBookToLibrary(new book('Fundamentals of Wavelets', 'Goswami, Jaideva', 228, '1'));
    addBookToLibrary(new book('Data Smart', 'Foreman, John', 235, '0'));
    addBookToLibrary(new book('Superfreakonomics', 'Dubner, Stephen', 179, '0'));
    addBookToLibrary(new book('Orientalism', 'Said, Edward', 197, '0'))
}
populateArray()

// Render the array, loops through array

dbBook.push({
    name: "Crime and Punishment",
    author: "Fiodor Dostoïevski",
    pages: 487,
    status: 0
})

dbBook.push({
    name: "Data Smart",
    author: "Foreman, John",
    pages: 235,
    status: 0
})

dbBook.push({
    name: "The Hobbit",
    author: "J. R. R. Tolkien",
    pages: 310,
    status: 1
})

dbBook.push({
        name: "Americanah",
        author: "Chimamanda Ngozi Adichie",
        pages: 496,
        status: 1,
    },
);