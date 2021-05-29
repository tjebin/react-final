import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from '../../services/questions-service'
import quizService from '../../services/quiz-service'
import './quizzes-list.css'

const Quiz = () => {
    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [graded, setGraded] = useState(false);
    const [newQuestions, setNewQuestions] = useState([]);
    const [temp, setTemp] = useState();
    const [quizResult, setQuizResult] = useState();
    const [allAttempts, setAllAttempts] = useState([]);

    const getResult = () => {
        quizService.submitQuiz(quizId,questions)
        .then(result => setQuizResult(result.score))

    }


    const getPrevAttempts = () => {
        setAllAttempts([])
         quizService.findQuizResultsById(quizId)
         .then(attempts => attempts.map(eachAttempt => setAllAttempts(allAttempts => [...allAttempts, eachAttempt.score])))

        }


    useEffect(() => {

        //questionService.findQuestionsForQuiz(quizId)
        //    .then(questions => setQuestions(questions))

        questionService.findQuestionsForQuiz(quizId)
                    .then(questions => {questions.map(question =>
                    setQuestions(oldArray => [...oldArray, {...question, answer:''}]))})


        },[])

    /*useEffect(() => {

            questions.map(question => {
                                setTemp({...question, answer:''})
                                setNewQuestions(oldArray => [...oldArray, temp])
                            })

            console.log(newQuestions)
            },[questions])
    */

    return(
        <div className="">
            <h2 className="">Quiz {quizId}</h2>

            {/*
                questions.map(question => {
                    setTemp({...question, answer:''})
                    setNewQuestions(oldArray => [...oldArray, temp])
                })
            */}

            <ul>
                {
                    questions.map(question =>
                    <>
                    <li>
                        <Question question={question} quizId={quizId} graded={graded} questions={questions} setQuestions={setQuestions}/>
                    </li>
                    <br/>
                    </>

                    )
                }
            </ul>

            <div className="">

                Score:         {quizResult}
            </div>

            <div className="add-padding-left-question">
             <i type="button" className="btn btn-success" onClick={() =>
             {setGraded(true);console.log(questions); getResult();
             {/*quizService.submitQuiz(quizId,questions).then(result => console.log(result))*/}}}>
                 Grade
              </i>
             </div>
             <br/>
             <br/>
             <br/>
             <div className="">

                 All Attempts:
                    <ol>
                    {allAttempts.map(eachScore => <li>{eachScore}</li>)}
                    </ol>
             </div>
             <div className="add-padding-left-question">
                          <i type="button" className="btn btn-success" onClick={() =>
                          {getPrevAttempts();
                          {/*quizService.submitQuiz(quizId,questions).then(result => console.log(result))*/}}}>
                              All Scores
                           </i>
                          </div>

        </div>
    );
}

export default Quiz;