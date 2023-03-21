"use strict";
const questionPlace = document.getElementById("questionPlace");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");
const answer = document.querySelectorAll(".answer");
const answers = document.querySelectorAll(".answers div");
const buttonNext = document.querySelector(".next-question");
let scoreCounter = 0;
let quizEndCounter = 0;

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

loadJSON("https://api.npoint.io/02c931769b9b5499a9c3").then((dataJSON) => {
  const max = dataJSON.length;
  quizEndCounter = max;

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
    if (scoreCounter == 10 || quizEndCounter == 0) {
      answerA.style.display = "none";
      answerB.style.display = "none";
      answerC.style.display = "none";
      answerD.style.display = "none";
      questionPlace.textContent = `Your result is ${scoreCounter} / ${max}. Reload the page`;
    } else {
      questionPlace.textContent = dataJSON[numberOfElement].question;
      answerA.textContent = dataJSON[numberOfElement].A;
      answerB.textContent = dataJSON[numberOfElement].B;
      answerC.textContent = dataJSON[numberOfElement].C;
      answerD.textContent = dataJSON[numberOfElement].D;

      answerA.value = "A";
      answerB.value = "B";
      answerC.value = "C";
      answerD.value = "D";
    }
  }

  answers.forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.value == dataJSON[numberOfElement].correct) {
        event.target.classList.add("postivie");
        if (!element.classList.contains("negative")) {
          scoreCounter++;
          quizEndCounter--;

          setTimeout(function () {
            numberOfElement = numberofQuestion(max);
            getAnswers(numberOfElement, dataJSON);
            event.target.classList.remove("postivie");
          }, 800);
        }
      } else {
        element.classList.add("negative");
        quizEndCounter--;
        setTimeout(function () {
          numberOfElement = numberofQuestion(max);
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
    quizEndCounter--;
    numberOfElement = numberofQuestion(max);
    questionPlace.textContent = dataJSON[numberOfElement].question;
    getAnswers(numberOfElement, dataJSON);
    if (scoreCounter === 10 || quizEndCounter === 0) {
      scoreCounter = 0;
      quizEndCounter = max;
    }
  });
});
