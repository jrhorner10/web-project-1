import {article, myData} from './data.js'

const navbar = document.querySelectorAll("ul.navbar li");
const navbarButton = document.getElementById("nav-button");
const articles = document.getElementsByClassName("article");
const selectedArticle = document.getElementById("selectedArticle");
const allArticles = document.getElementById("container");
const back = document.getElementById("back");
const footer = document.getElementById("footer");
const dateForm = document.getElementById("dateForm");
const authorForm = document.getElementById("authorForm");

const images = document.getElementsByClassName("myImage");
const titles = document.getElementsByClassName("title");
const authors = document.getElementsByClassName("author");
const dates = document.getElementsByClassName("date");
const articleText = document.getElementsByClassName("articleText");

const currentImage = document.getElementById("currentImage");
const currentTitle = document.getElementById("currentTitle");
const currentAuthor = document.getElementById("currentAuthor");
const currentDate = document.getElementById("currentDate");
const currentArticleText = document.getElementById("currentArticleText");

//initial get request from backend, 

for (let i=0; i < articles.length; i++) {
    articles[i].addEventListener("click", () => {
        allArticles.style.display = 'none';
        selectedArticle.style.display = 'block';

        currentImage.setAttribute("src", myData[i].image);
        currentTitle.textContent = myData[i].title;
        currentAuthor.textContent = myData[i].author;
        currentDate.textContent = new Date(myData[i].date).toLocaleDateString();
        currentArticleText.textContent = myData[i].text;
    })
}

back.addEventListener("click", () => {
    selectedArticle.style.display = 'none';
    allArticles.style.display = 'flex';
})

navbarButton.addEventListener("click", () => {
    if (navbar[0].className.trim().length === 0) {
        for (x of navbar) {
            x.className += " smallScreen";
        }
        console.log("added smallScreen");
    } else {
        for (x of navbar) {
            x.className = "";
        }
        console.log("removed smallScreen");
    }
});

myData.sort((a, b) => {
    if (a.date < b.date) {
        return 1;
    }
    if (b.date < a.date) {
        return -1;
    }
    return 0;
})

function formatDate(myDate) {
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getYear();
}

console.log(myData[0].image);

function updateContent() {
    for (let i=0; i < titles.length; i++) {
        images[i].setAttribute("src", myData[i].image);
        titles[i].textContent = myData[i].title;
        authors[i].textContent = myData[i].author;
        dates[i].textContent = new Date(myData[i].date).toLocaleDateString();
        articleText[i].textContent = myData[i].text;
    }
}

updateContent();

dateForm.addEventListener("click", () => {
    let selectedButton = dateForm.querySelector('input[name=sortByDate]:checked');
    if (selectedButton.value == 'newest') {
        myData.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            }
            if (b.date < a.date) {
                return -1;
            }
            return 0;
        })
        updateContent();
    }
    if (selectedButton.value == 'oldest') {
        myData.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (b.date < a.date) {
                return 1;
            }
            return 0;
        })
        updateContent();
    }
})

authorForm.addEventListener("click", () => {
    // get request from database
})