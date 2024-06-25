const dialog = document.querySelector("dialog");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleVal = document.getElementById("titleFld");
const authorVal = document.getElementById("authorFld");
const pageVal = document.getElementById("pageFld");
const readVal = document.getElementById("readFld");
const mainContent = document.getElementById("main");
var addBookBtn = document.querySelectorAll(".addBookBtn");
var removeBtn = null;
var idCounter = 1
var myLibrary = [];
var temp = [];

function Book(id, title, author, pages, hasBeenRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

document.addEventListener('DOMContentLoaded', ()=> {
    addBookBtn.forEach(function(button) {
        button.addEventListener("click", function() {
            dialog.showModal();
        });
    });
});

dialog.addEventListener("close", () => {
    if (dialog.returnValue != "cancel" && titleVal.value != "") {
        myLibrary.push(new Book(idCounter++, titleVal.value, authorVal.value, pageVal.value, readVal.checked));
        displayBooks();
    }
});

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close("cancel");
});

function displayBooks() {
    mainContent.innerHTML = "";
    for (var b of myLibrary) {
        mainContent.innerHTML += 
        "<div class=\"bookCard\">\
            <div class=\"readingStatus\">" + (b.hasBeenRead ? "Finished Reading" : "Not Yet Read") + "</div>\
            <div class=\"title\">" + b.title + "</div>\
            <div class=\"author\">by " + b.author + "</div>\
            <div class=\"pages\">" + b.pages + " pages</div>\
            <div>\
                <button class=\"read\" id=" + b.id + ">" + (b.hasBeenRead ? "Unread" : "Read") + "</button>\
                <button class=\"remove\" id=" + b.id + ">Remove</button>\
            </div>\
        </div>";
    }

    mainContent.innerHTML +=
    "<div id=\"addBookCard\">\
        <div id=\"addText\">Add Book</div>\
        <button class=\"addBookBtn\"><img src=\"plus-solid-white.svg\" alt=\"addBook\"></button>\
    </div>";

    addBookBtn = document.querySelectorAll(".addBookBtn");
    addBookBtn.forEach(function(button) {
        button.addEventListener("click", function() {
            dialog.showModal();
        });
    });

    removeBtn = document.querySelectorAll(".read");
    removeBtn.forEach(function(button) {
        button.addEventListener("click", function() {
            toggleRead(button.id);
        });
    });

    removeBtn = document.querySelectorAll(".remove");
    removeBtn.forEach(function(button) {
        button.addEventListener("click", function() {
            removeBook(button.id);
        });
    });
}

function removeBook(bookId) {
    var size = myLibrary.length
    for (var i = 0; i < size; i++) {
        if (myLibrary[i].id == bookId) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks();
}

function toggleRead(bookId) {
    var size = myLibrary.length
    for (var i = 0; i < size; i++) {
        if (myLibrary[i].id == bookId) {
            myLibrary[i].hasBeenRead = !(myLibrary[i].hasBeenRead);
            break;
        }
    }
    displayBooks();
}