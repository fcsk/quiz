"use strict";
import data from "./questions.json" assert { type: "json" };
const questionPlace = document.getElementById("questionPlace");
const answerA = document.getElementById("A");
const answerB = document.getElementById("B");
const answerC = document.getElementById("C");
const answerD = document.getElementById("D");
const answers = document.getElementsByClassName("answers");

const max = data.length;
let numberOfElement = numberofQuestion(max);

questionPlace.textContent = data[numberOfElement].question;

checkAnswerValue(getAnswers(numberOfElement, data), data);

function numberofQuestion(number) {
  let questionNumber = Math.random() * (0 - number) + number;
  questionNumber = questionNumber.toFixed(0);
  return questionNumber;
}

function getAnswers(numberOfElement, data) {
  let answerArray = [];
  answerA.textContent = data[numberOfElement].A;
  answerB.textContent = data[numberOfElement].B;
  answerC.textContent = data[numberOfElement].C;
  answerD.textContent = data[numberOfElement].D;

  answerA.value = "A";
  answerB.value = "B";
  answerC.value = "C";
  answerD.value = "D";

  answerArray = [answerA, answerB, answerC, answerD];
  return answerArray;
}

function checkAnswerValue(answerArray, data) {
  for (let i = 0; i < answerArray.length; i++) {
    if (answerArray[i].value == data[numberOfElement].correct) {
      console.log(answerArray[i].value);
    }
  }
}
