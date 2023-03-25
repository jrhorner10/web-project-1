import {article, myData} from './data.js'

// All necessary imports
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

// When an article is clicked, use display none for everything on front page between header and footer, and show selectedArticle
// Add event listeners for all the articles (8) and appropriate data that should be filled in when clicked.
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

// When screen is below 600, allow navbar button to expand/shrink navbar view
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

// initially sort data so newest data shows first by changing order of myData array
myData.sort((a, b) => {
    if (a.date < b.date) {
        return 1;
    }
    if (b.date < a.date) {
        return -1;
    }
    return 0;
})

// Update the content on main page by iterating through myData, and filling in all content on the dom in the articles
// (image, title, author, date, and text of article)
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

// Allows functionality of sorting data by newest or oldest. These two event listeners check for a click on the
// radio buttons, and based on the value it recieves, will sort them by date
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