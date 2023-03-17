"use strict";
import data from "./questions.json" assert { type: "json" };
const questionPlace = document.getElementById("questionPlace");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");

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
}
