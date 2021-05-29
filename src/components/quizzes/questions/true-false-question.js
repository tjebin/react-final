import React, {useState} from "react";
import quizService from '../../../services/quiz-service'

const TrueFalseQuestion = ({question, quizId, graded, questions, setQuestions}) => {
    const [answer, setAnswer] = useState();
    //const [graded, setGraded] = useState(false);

    const changeAnswer = (myAnswer) => {
        //console.log("CALLED")
        setQuestions(
            questions.map(item =>
                item._id === question._id
                ? {...item, answer : myAnswer}
                : item
        ))

    }

    return (
        <div>
            <div className="container row">
            <h4>
                {question.question}
                {/*
                    answer == question.correct &&
                    <i className="fas fa-check"></i>
                */}
                {/*
                    answer != question.correct &&
                    <i className="fas fa-times"></i>
                */}
            </h4>

            { graded && question.correct != JSON.stringify(answer) &&
                            <span className="add-padding-left-top-2">
                                        <i className="fas fa-times color-red"></i>

                            </span>
            }

            { graded && question.correct == JSON.stringify(answer) &&
                                        <span className="add-padding-left-top-2">
                                                    <i className="fas fa-check color-green"></i>

                                        </span>
            }
            </div>
            {/*question.correct*/}
            {/*<br/>*/}
            {/*JSON.stringify(answer)*/}

            <div className="list-group">

              {!graded &&
              <div className="list-group-item">
                <label><input
                    type="radio"
                    onClick={(event) => {setAnswer(true);changeAnswer("true");}}
                    name={question._id}/><span className="add-padding-left">True</span></label>
              </div>
              }

              {!graded &&
              <div className="list-group-item">
                <label><input
                    type="radio"
                    onClick={(event) => {setAnswer(false);changeAnswer("false");}}
                    name={question._id}/><span className="add-padding-left">False</span></label>
              </div>
              }

              {graded && question.correct=='true' && answer==true &&
                <div className="list-group-item background-correct">
                              <label><input
                                  type="radio"
                                  checked={true}
                                  name={question._id}/><span className="add-padding-left">True</span></label>
                              <span className="add-padding-left-tick-2">
                                  <i className="fas fa-check"></i>
                              </span>
                </div>
              }

              {graded && question.correct=='true' && answer!=true &&
                              <div className="list-group-item background-correct">
                                            <label><input
                                                type="radio"
                                                checked={false}
                                                name={question._id}/><span className="add-padding-left">True</span></label>
                                            <span className="add-padding-left-tick-2">
                                                <i className="fas fa-check"></i>
                                            </span>
                              </div>
                            }

              {graded && question.correct!='true' && answer==true &&
                                                          <div className="list-group-item background-wrong">
                                                                        <label><input
                                                                            type="radio"
                                                                            checked={true}
                                                                            name={question._id}/><span className="add-padding-left">True</span></label>
                                                                        <span className="add-padding-left-tick-2">
                                                                            <i className="fas fa-times"></i>
                                                                        </span>
                                            </div>
              }

              {graded && question.correct!='true' && answer!=true &&
                                                                        <div className="list-group-item">
                                                                                      <label><input
                                                                                       type="radio"
                                                                                        checked={false}
                                                                                     name={question._id}/><span className="add-padding-left">True</span></label>
                                                          </div>
                            }

              {graded && question.correct!='false' && answer==false &&
                              <div className="list-group-item background-wrong">
                                                                        <label><input
                                                                            type="radio"
                                                                            checked={true}
                                                                            name={question._id}/><span className="add-padding-left">False</span></label>
                                                                            <span className="add-padding-left-tick-2">
                                                                                  <i className="fas fa-times"></i>
                                                                            </span>
                              </div>
              }

              {graded && question.correct!='false' && answer!=false &&
                                                          <div className="list-group-item">
                                                                                      <label><input
                                                                                          type="radio"
                                                                                          checked={false}
                                                                                          name={question._id}/><span className="add-padding-left">False</span></label>
                                            </div>
              }



              {graded && question.correct=='false' && answer==false &&
                <div className="list-group-item background-correct">
                                            <label><input
                                                type="radio"
                                                checked={true}
                                                name={question._id}/><span className="add-padding-left">False</span></label>
                                            <span className="add-padding-left-tick-2">
                                                <i className="fas fa-check"></i>
                                            </span>
                </div>
              }

              {graded && question.correct=='false' && answer!=false &&
                              <div className="list-group-item background-correct">
                                                          <label><input
                                                              type="radio"
                                                              checked={false}
                                                              name={question._id}/><span className="add-padding-left">False</span></label>
                                                          <span className="add-padding-left-tick-2">
                                                              <i className="fas fa-check"></i>
                                                          </span>
                              </div>
                            }







            </div>

                  <div>
                     Your Answer: {JSON.stringify(answer)}
                  </div>
                  <div>
                            {/*<i type="button" className="btn btn-success" onClick={() => {setGraded(true);quizService.submitQuiz(quizId,question)}}>
                                Grade
                            </i>*/}
                  </div>

        </div>
    )
}

export default TrueFalseQuestion;