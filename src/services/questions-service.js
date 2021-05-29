const QUIZZES_URL = "http://localhost:3000/api/quizzes";

export const findQuestionsForQuiz = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}/questions`)
        .then(response => response.json())


export default {
    findQuestionsForQuiz
}