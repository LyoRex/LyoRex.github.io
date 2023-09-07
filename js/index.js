const nameText = document.querySelector("#nameText");
const letters = document.querySelectorAll(".letter");
let typing_statuses = {};

$(document).ready(function() {
    letters.forEach(function(letter) {
        let sentenceDiv = document.createElement("div");
        sentenceDiv.classList.add("sentence");
        sentenceDiv.style.zIndex = "-1";
        letter.appendChild(sentenceDiv);
    });

    letters.forEach(function(letter) {
        typing_statuses[letter.id] = "none";
        const sentenceDiv = letter.querySelector(".sentence");

        "mouseenter touchstart".split(" ").forEach(function(e){
            letter.querySelector(".first-letter").addEventListener(e, function() {
                const text = letter.getAttribute("data-sentence");
                if (typing_statuses[letter.id] === "none") {
                    typeSentence(letter.id, text, sentenceDiv);
                }
                else if (typing_statuses[letter.id] === "left_while_typing") {
                    typing_statuses[letter.id] = "typing";
                }
            });
        });

        "mouseleave".split(" ").forEach(function(e){
            letter.querySelector(".first-letter").addEventListener(e, function() {
                if (typing_statuses[letter.id] === "typing") {
                    typing_statuses[letter.id] = "left_while_typing";
                }
                else if (typing_statuses[letter.id] === "finished_typing") {
                    deleteSentence(letter.id, sentenceDiv);
                }
            });
        });
    });

    
    "mouseenter touchstart".split(" ").forEach(function(e){
        nameText.addEventListener(e, function() {
            letters.forEach(function(letter) {
                const sentenceDiv = letter.querySelector(".sentence");
                const text = letter.getAttribute("data-sentence");

                if (typing_statuses[letter.id] === "none") {
                    typeSentence(letter.id, text, sentenceDiv);
                }
                else if (typing_statuses[letter.id] === "deleting") {
                    sentenceDiv.innerText = "";
                    typeSentence(letter.id, text, sentenceDiv);
                }
                else if (typing_statuses[letter.id] === "left_while_typing") {
                    typing_statuses[letter.id] = "typing";
                }
            });
        });
    });

    nameText.addEventListener("mouseleave", function() {
        letters.forEach(function(letter) {
            const sentenceDiv = letter.querySelector(".sentence");

            if (typing_statuses[letter.id] === "typing") {
                typing_statuses[letter.id] = "left_while_typing";
            }
            else if (typing_statuses[letter.id] === "finished_typing" || typing_statuses[letter.id] === "none") {
                deleteSentence(letter.id, sentenceDiv);
            }
        })
    });
});


async function typeSentence(letterID, sentence, eleRef, delay = 60) {
    typing_statuses[letterID] = "typing";
    const letters = sentence.split("");
    let i = $(eleRef)[0].innerText.length;
    while(i < letters.length) {
        $(eleRef).append(letters[i]);
        i++
        await waitForMs(delay);
    }
    if (typing_statuses[letterID] === "left_while_typing") {
        deleteSentence(letterID, eleRef);
    }
    else if (typing_statuses[letterID] === "typing") {
        typing_statuses[letterID] = "finished_typing";
    }
    return;
}

async function deleteSentence(letterID, eleRef, delay = 30) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    typing_statuses[letterID] = "deleting";
    while(letters.length > 0) {
        if (typing_statuses[letterID] === "typing") {
            return;
        }
        letters.pop();
        $(eleRef).html(letters.join(""));
        await waitForMs(delay);
    }
    typing_statuses[letterID] = "none";
}

async function carousel(text, eleRef) {
    await typeSentence(text, eleRef);
    await waitForMs(100);
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}