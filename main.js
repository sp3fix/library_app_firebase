//Initialize FireBase
let config = {
    apiKey: "AIzaSyCaveqQBSDK6-YfIaGSgpAbEWWd_idlPNU",
    authDomain: "my-library-14231.firebaseapp.com",
    databaseURL: "https://my-library-14231.firebaseio.com",
    projectId: "my-library-14231",
    storageBucket: "my-library-14231.appspot.com",
    messagingSenderId: "437962127325"
};
firebase.initializeApp(config);


let db = firebase.database().ref();
let dbBook = db.child("lib");

function render(db) {
    db.on("child_added", snapshot => createNewBookCard(snapshot.val(),snapshot.key));
}

render(dbBook)

// //FUNCTIONS TO CREATE THE CARDS----------------------------------------------------------------------------------------------

// //CREATING THE BOOKCARD
function createNewBookCard(book,key) {
    let container = document.querySelector('.container'); //get the container
    bookCard = document.createElement('div'); //create new card
    bookCard.classList.add('bookCard');
    bookCard.setAttribute('id',key);
    createDeleteButton(key); //add a delete button
    createSpan('title',book.name);
    createSpan('author',book.author);
    createSpan('pages',book.pages+' p.');
    createReadLabel(book.status); //add a label button
    container.appendChild(bookCard);
}

//FUNCTION TO CREATE THE READ BUTTON
function createReadLabel(status) {
    read = document.createElement('button');
    read.classList.add('book_read');
    read.addEventListener('click', changeStatus);
    if(status == 1) read.classList.add('read');
    read.textContent = (status == 1) ? 'read' : 'not read';
    bookCard.appendChild(read);
}

//FUNCTION TO CREATE THE DIFFERENT LABELS ON THE CARD
function createSpan(name,content) {
    let spanName = name.toString()
    name = document.createElement('span');
    name.classList.add(spanName);
    name.classList.add('bookEl');
    name.textContent = content;
    bookCard.appendChild(name);
}

//FUNCTION TO CREATE THE DELETE BUTTON
function createDeleteButton(index) {
    deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('name', index);
    deleteButton.addEventListener('click',removeFromLibrary);
    bookCard.appendChild(deleteButton);
}

//FUNCTION TO DEFINE THE COLOR OF THE READ BUTTON
function colorIfRead(status) {
    return (status == 1 || status == 'read') ? '#C7CEF6' : '#7496D2';
}

// //FUNCTIONS TO POPULATE THE LIBRARY-----------------------------------------------------------------------------------------------


//FUNCTION TO REMOVE AN ITEM FROM THE LIBRARY
function removeFromLibrary(evt) {
    id = evt.path[1].id;
    parent = document.querySelector('.container');
    children = document.getElementById(id);
    parent.removeChild(children);
    dbBook.child(id).remove();
}

//FUNCTION TO MODIFY THE READING STATUS IN THE LIBRARY
function changeStatus(evt) {
    //Change the button directly to avoid reloading everything
    readButton = evt.path[1].querySelector('.book_read'); //select the button
    readButton.textContent = (readButton.textContent == 'read') ? 'not read' : 'read'; //change the text of the button
    readButton.className = (readButton.className == 'book_read read') ? 'book_read' : 'book_read read';
    //Change the item in the library
    id = evt.path[1].id; //get id of the bookcard
    newStatus = (readButton.textContent == 'read') ? 1 : 0;
    dbBook.child(id).update({ status: newStatus});
}



//FUNCTIONS RELATED TO THE POPUP WINDOW TO ADD ELEMENTS -----------------------------------------------------------------------

//INITIALIZE THE POPUP WINDOW
let modal = document.getElementById('myModal');
let btn = document.getElementById("btn");
btn.onclick = function() {
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//FUNCTION TO DISPLAY THE POPUP WINDOW
function div_show() {
    document.createElement('form').style.display = "block";
}
//FUNCTION TO SUBMIT THE FORM    
function submitForm() {
    dbBook.push({
            name: document.getElementById('title').value,
            author: document.getElementById('author').value,
            pages: document.getElementById('pages').value,
            status: document.getElementById('read').value
        })
}
    