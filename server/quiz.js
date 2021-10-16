require("dotenv").config();
const axios = require("axios");
const api = process.env.QUIZ_API_TOKEN;

// Funtion to fetch quiz questions
async function fetchQuizQuestions(category, difficulty, limit = 10) {
  let response = "";
  if (category === "Random") {
    response = await axios.get(
      `https://quizapi.io/api/v1/questions?apiKey=${api}&difficulty=${difficulty}&limit=${limit}`
    );
  } else {
    response = await axios.get(
      `https://quizapi.io/api/v1/questions?apiKey=${api}&category=${category}&limit=${limit}&difficulty=${difficulty}`
    );
  }

  const quizData = await response.data;
  return quizData;
}

module.exports = fetchQuizQuestions;
