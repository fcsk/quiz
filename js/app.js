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
let quizEndCounter = 10;

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

fetch("https://question-qpi.onrender.com/questions")
  .then((response) => response.json())
  .then((data) => data.map((question) => question))
  .then((questions) => {
    const max = questions.length;
    let numberOfElement = numberofQuestion(max);

    getAnswers(numberOfElement, questions);

    function numberofQuestion(number) {
      let questionNumber = Math.random() * (0 - number) + number;
      questionNumber = questionNumber.toFixed(0);

      if (questionNumber >= questions.length) {
        questionNumber = questions.length - 1;
      }

      return questionNumber;
    }

    function getAnswers(numberOfElement, data) {
      if (scoreCounter == 10 || quizEndCounter == 0) {
        answerA.style.display = "none";
        answerB.style.display = "none";
        answerC.style.display = "none";
        answerD.style.display = "none";
        questionPlace.textContent = `Your result is ${scoreCounter} / ${10}. Reload the page`;
      } else {
        questionPlace.textContent = data[numberOfElement].question;
        answerA.textContent = data[numberOfElement].A;
        answerB.textContent = data[numberOfElement].B;
        answerC.textContent = data[numberOfElement].C;
        answerD.textContent = data[numberOfElement].D;

        answerA.value = "A";
        answerB.value = "B";
        answerC.value = "C";
        answerD.value = "D";
      }
    }

    answers.forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target.value == questions[numberOfElement].correct) {
          event.target.classList.add("postivie");
          if (!element.classList.contains("negative")) {
            scoreCounter++;
            quizEndCounter--;

            setTimeout(function () {
              numberOfElement = numberofQuestion(max);
              getAnswers(numberOfElement, questions);
              event.target.classList.remove("postivie");
            }, 800);
          }
        } else {
          element.classList.add("negative");
          quizEndCounter--;
          setTimeout(function () {
            numberOfElement = numberofQuestion(max);
            getAnswers(numberOfElement, questions);
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
      questionPlace.textContent = questions[numberOfElement].question;
      getAnswers(numberOfElement, questions);
      if (scoreCounter === 10 || quizEndCounter === 0) {
        scoreCounter = 0;
        quizEndCounter = 10;
      }
    });
  })
  .catch((error) => console.error(error));
