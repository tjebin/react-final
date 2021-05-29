const QUIZZES_URL = "http://localhost:3000/api/quizzes";
//const QUIZZES_URL = "https://mmorshed-node.herokuapp.com/api/quizzes";

export const findQuizById = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}`)
        .then(response => response.json())

export const findAllQuizzes = () =>
    fetch(`${QUIZZES_URL}`)
        .then(response => response.json())

export const submitQuiz = (quizId, questions) => {
//console.log(questions)
//console.log(quizId)
 return fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
   method: 'POST',
   body: JSON.stringify(questions),
   headers: {
     'content-type': 'application/json'
   }
 }).then(response => response.json())
   //.then(result => console.log(result))
}


export const findQuizResultsById = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}/attempts`)
        .then(response => response.json())
        //.then(result => console.log(result))


export default {
    findQuizById, findAllQuizzes, submitQuiz, findQuizResultsById
}