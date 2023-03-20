"use strict";
const questionPlace = document.getElementById("questionPlace");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");
const answer = document.querySelectorAll(".answer");
const answers = document.querySelectorAll(".answers div");
const buttonNext = document.querySelector(".next-question");
const score = document.querySelector(".score");
const questionNumber = document.querySelector(".question-number");
let scoreCounter = 0;

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

loadJSON("https://api.npoint.io/ed80ed7e8d638faa9bb6").then((dataJSON) => {
  const max = dataJSON.length;
  questionNumber.textContent = max;
  let numberOfElement = numberofQuestion(max);

  questionPlace.textContent = dataJSON[numberOfElement].question;
  getAnswers(numberOfElement, dataJSON);

  function numberofQuestion(number) {
    let questionNumber = Math.random() * (0 - number) + number;
    questionNumber = questionNumber.toFixed(0);

    if (questionNumber >= dataJSON.length) {
      questionNumber = dataJSON.length - 1;
    }

    return questionNumber;
  }

  function getAnswers(numberOfElement, data) {
    answerA.textContent = dataJSON[numberOfElement].A;
    answerB.textContent = dataJSON[numberOfElement].B;
    answerC.textContent = dataJSON[numberOfElement].C;
    answerD.textContent = dataJSON[numberOfElement].D;

    answerA.value = "A";
    answerB.value = "B";
    answerC.value = "C";
    answerD.value = "D";
  }

  answers.forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.value == dataJSON[numberOfElement].correct) {
        event.target.classList.add("postivie");
        if (!element.classList.contains("negative")) {
          scoreCounter++;
          score.textContent = scoreCounter;
          setTimeout(function () {
            numberOfElement = numberofQuestion(max);
            questionPlace.textContent = dataJSON[numberOfElement].question;
            getAnswers(numberOfElement, dataJSON);
            event.target.classList.remove("postivie");
          }, 800);
        }
      } else {
        element.classList.add("negative");
        setTimeout(function () {
          numberOfElement = numberofQuestion(max);
          questionPlace.textContent = dataJSON[numberOfElement].question;
          getAnswers(numberOfElement, dataJSON);
          answer.forEach((element) => {
            element.classList.remove("negative");
          });
        }, 700);
      }
    });
  });

  buttonNext?.addEventListener("click", function () {
    answers.forEach((answer) => {
      answer.classList.remove("postivie");
      answer.classList.remove("negative");
    });

    numberOfElement = numberofQuestion(max);
    questionPlace.textContent = dataJSON[numberOfElement].question;
    getAnswers(numberOfElement, dataJSON);
  });
});
