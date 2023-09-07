const pageSwitchArrowLeft = document.getElementById("statsArrowLeft");
const pageSwitchArrowRight = document.getElementById("statsArrowRight");
const statsPageTitle = document.getElementById("statsPageTitle");

let curPage = 0;       // States pages: 0: instagram, 1: Lives
let numPages = 2;
const pagesList = $(".project-page");
const pagesTitles = ["Ongoing Projects", "Completed Projects"]

$(document).ready(function () {
    hideAllPages();
    pagesList[curPage].style.display = "block";
    setArrowClickEvents();
    setPageSwitchArrowColors();
});

function setArrowClickEvents() {
    pageSwitchArrowLeft.onclick = function () {
        if (curPage > 0) {
            hideAllPages();
            curPage -= 1;
            statsPageTitle.innerText = pagesTitles[curPage];
            pagesList[curPage].style.display = "block";
        }
        setPageSwitchArrowColors();
    };
    pageSwitchArrowRight.onclick = function () {
        if (curPage < numPages - 1) {
            hideAllPages();
            curPage += 1;
            statsPageTitle.innerText = pagesTitles[curPage];
            pagesList[curPage].style.display = "block";
        }
        setPageSwitchArrowColors();
    };
}

function setPageSwitchArrowColors() {
    if (curPage == 0) {
        pageSwitchArrowLeft.style.color = "lightgray";
    }
    else {
        pageSwitchArrowLeft.style.color = "black";
    }
    if (curPage == numPages - 1) {
        pageSwitchArrowRight.style.color = "lightgray";
    }
    else {
        pageSwitchArrowRight.style.color = "black";
    }
}

function hideAllPages() {
    $(".project-page").each(function (index, item) {
        item.style.display = "none";
    })
}