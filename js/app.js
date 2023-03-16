"use strict";
import data from "./questions.json" assert { type: "json" };
const questionPlace = document.getElementById("questionPlace");
const max = data.length;

questionPlace.textContent = data[numberofQuestion(max)].question;

function numberofQuestion(number) {
  let questionNumber = Math.random() * (0 - number) + number;
  questionNumber = questionNumber.toFixed(0);
  return questionNumber;
}
