"use strict";
import data from "./questions.json" assert { type: "json" };
const questionPlace = document.getElementById("questionPlace");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");
const answers = document.querySelectorAll(".answers span");
const buttonNext = document.querySelector(".next-question");

const max = data.length;
let numberOfElement = numberofQuestion(max);

questionPlace.textContent = data[numberOfElement].question;
getAnswers(numberOfElement, data);

function numberofQuestion(number) {
  let questionNumber = Math.random() * (0 - number) + number;
  questionNumber = questionNumber.toFixed(0);

  return questionNumber;
}

function getAnswers(numberOfElement, data) {
  answerA.textContent = data[numberOfElement].A;
  answerB.textContent = data[numberOfElement].B;
  answerC.textContent = data[numberOfElement].C;
  answerD.textContent = data[numberOfElement].D;

  answerA.value = "A";
  answerB.value = "B";
  answerC.value = "C";
  answerD.value = "D";
}

answers.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.target.value == data[numberOfElement].correct) {
      console.log("odpowiedź prawidłowa");
      event.target.classList.add("postivie");
    } else {
      console.log("odpowiedź nieprawidłowa");
      event.target.classList.add("negative");
    }
  });
});

buttonNext?.addEventListener("click", function () {
  answers.forEach((answer) => {
    answer.classList.remove("postivie");
    answer.classList.remove("negative");
  });

  numberOfElement = numberofQuestion(max);
  questionPlace.textContent = data[numberOfElement].question;
  getAnswers(numberOfElement, data);
});
