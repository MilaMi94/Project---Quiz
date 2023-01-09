// Questions

p1 = {
    text: "Which human muscle is the strongest?",
    answers: ["Head", "Arm", "Leg", "Jaw"],
    correctAnswerIndex: 3
},
p2 = {
    text: "What is the currency of Japan?",
    answers: ["Euro", "Yen", "Dollar", "Pound"],
    correctAnswerIndex: 1
},
p3 = {
    text: "Which of the following is not a type of fish?",
    answers: ["Salmon", "Tuna", "Lizard", "Halibut"],
    correctAnswerIndex: 2
},
p4 = {
    text: "What is the highest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kilimanjaro", "Makalu"],
    correctAnswerIndex: 0
},
p5 = {
    text: "What is the largest ocean in the world?",
    answers: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswerIndex: 1
},
p6 = {
    text: "Which of the following is not a planet in our solar system?",
    answers: ["Earth", "Mars", "Pluto", "Jupiter"],
    correctAnswerIndex: 2
},
p7 = {
    text: "What can be broken, but it can never be held?",
    answers: ["A promise", "heart", "Tree", "Car"],
    correctAnswerIndex: 0
},
p8 = {
    text: "What is the capital of China?",
    answers: ["Shanghai", "Beijing", "Hong Kong", "Taipei"],
    correctAnswerIndex: 1
},
p9 = {
    text: "Which of the following is not a type of bird?",
    answers: ["Dove", "Penguin", "Ostrich", "Parakeet"],
    correctAnswerIndex: 1
},
p10 = {
    text: "How many hearts are there in an octopus?",
    answers: ["5", "1", "3", "7"],
    correctAnswerIndex: 2
},
p11 = {
    text: "How many minutes are in a full week?",
    answers: ["10080", "11000", "9500", "500"],
    correctAnswerIndex: 0
},
p12 = {
    text: "Which language has the more native speakers?",
    answers: ["Mandarin Chinese", "Hindi", "English", "Spanish"],
    correctAnswerIndex: 0
},
p13 = {
    text: "What country has won the most World Cups?",
    answers: ["Spanish", "Brazil", "Argentina", "Germany"],
    correctAnswerIndex: 1
},
p14 = {
    text: "How many bones do we have in an ear?",
    answers: ["5", "1", "10", "3"],
    correctAnswerIndex: 3
},
p15 = {
    text: "What time was The First War?",
    answers: ["1914-1919", "1900-1902", "1914-1918", "1915-1919"],
    correctAnswerIndex: 2
};

let quiz = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15];

//get elements
let btnSend = document.getElementById("send");
let btnNewQuestions = document.getElementById("new_questions");
let btnStart = document.getElementById("start-btn");
let divCheckedQ = document.getElementById("checked_questions");
let listenerAdded = false;


// function for questions

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledQuiz = shuffle(quiz);
var displayedQuestions = shuffledQuiz.slice(0, 5);
let showQuestions = (arr) => {
    let brPitanja = 1;
    arr.forEach(question => {
        const form = document.getElementById("form");
        const section = document.createElement("section");
        const questionText = document.createElement("p");
        questionText.innerText = `${brPitanja}.${question.text}`;
        brPitanja++;
        section.appendChild(questionText);
        form.appendChild(section);
        const answerDiv = document.createElement("div");
        question.answers.forEach(answer => {

            const answerInput = document.createElement("input");
            answerInput.type = "radio";
            answerInput.name = question.text;
            answerDiv.appendChild(answerInput);
            const answerLabel = document.createElement("label");
            answerLabel.innerText = answer;
            answerDiv.appendChild(answerLabel);
            section.appendChild(answerDiv);
            form.appendChild(section);
        });

    });
    let radioBtns = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < radioBtns.length; i++) {
        if (i % 4 == 0) {
            radioBtns[i].checked = true;
        }
    }

}

//New questions button
btnNewQuestions.addEventListener("click", () => {

    document.getElementById('form').innerHTML = '';
    document.getElementById('checked_questions').innerHTML = '';
    divCheckedQ.classList.add("hide");
    shuffle(quiz);
    displayedQuestions = shuffledQuiz.slice(0, 5);
    showQuestions(displayedQuestions);

    listenerAdded = false;

})


//send button

btnSend.addEventListener("click", () => {

if (!listenerAdded) {
        let s = 0;
        let br = 1;
        for (let j = 1; j <= 5; j++) {
            let divInput = document.querySelectorAll(`#form section:nth-child(${j}) div input`);
            for (let i = 0; i < divInput.length; i++) {
                if (divInput[i].checked) {
                    if (displayedQuestions[s].correctAnswerIndex == i) {
                      
                        let divCorrect = document.createElement('div');
                        let textCorrect = document.createTextNode(`${br}. pitanje je tacno.`);
                        divCorrect.appendChild(textCorrect);
                        divCheckedQ.appendChild(divCorrect);
                        divCorrect.style.color = "green";
                    } else {
                        let divWrong = document.createElement('div');
                        let textWrong = document.createTextNode(`${br}. pitanje nije tacno.`);
                        divWrong.appendChild(textWrong);
                        divCheckedQ.appendChild(divWrong);
                        divWrong.style.color = "red";
                    }
                    s++;
                    br++
                }
            }
        }

    }
    listenerAdded = true;
    divCheckedQ.classList.remove("hide");
    let allInput = document.querySelectorAll("input[type='radio']");
    allInput.forEach(el => {
        el.disabled = true;
    })
}
)

//start button

btnStart.addEventListener("click", () => {
    console.log("Started");
    btnStart.classList.add("hide");
    btnSend.classList.remove("hide");
    btnNewQuestions.classList.remove("hide");
    
    shuffle(quiz);
    showQuestions(displayedQuestions);
}
);

