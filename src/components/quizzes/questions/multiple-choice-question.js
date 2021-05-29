import React, {useState} from "react";
import './questions.css'

const MultipleChoiceQuestion = ({question, graded, questions, setQuestions}) => {

    const [selectedAnswer, setSelectedAnswer] = useState();
    //const [graded, setGraded] = useState(false);
    const [correct, setCorrect] = useState(false);

    const changeAnswer = (myAnswer) => {
            //console.log("CALLED")
            setQuestions(
                questions.map(item =>
                    item._id === question._id
                    ? {...item, answer : myAnswer}
                    : item
            ))

        }

    return(
        <div>
            <div className="container row">

            <h4>{question.question}</h4>
                { graded && selectedAnswer!==question.correct &&
                <span className="add-padding-left-top">
                            <i className="fas fa-times color-red"></i>

                </span>
                }

                { graded && selectedAnswer===question.correct &&
                  <span className="add-padding-left-top">
                     <i className="fas fa-check color-green"></i>

                  </span>
                }
            </div>
            {/*question.correct*/}

            <div className="list-group">
            {
                question.choices.map((choice) => {
                    return(
                    <>
                    { graded && question.correct===choice &&
                    <div className="list-group-item background-correct">
                        <label>
                            {selectedAnswer===choice &&
                                <input type="radio" name={question._id} checked={true}/>
                            }
                            {selectedAnswer!==choice &&
                                <input type="radio" name={question._id} checked={false}/>
                            }
                            <span className="add-padding-left">
                                {choice}
                            </span>
                            <span className="add-padding-left-tick">
                            <i className="fas fa-check"></i>
                            </span>
                        </label>
                    </div>

                    }

                    { graded && question.correct!==choice && selectedAnswer===choice &&
                                        <div className="list-group-item background-wrong">
                                            <label>
                                                <input type="radio" name={question._id} checked={true}/>
                                                <span className="add-padding-left">
                                                    {choice}
                                                </span>
                                                <span className="add-padding-left-tick">
                                                                            <i className="fas fa-times"></i>
                                                </span>
                                            </label>
                                        </div>

                    }

                    { graded && question.correct!==choice && selectedAnswer!==choice &&
                                                            <div className="list-group-item">
                                                                <label>
                                                                    <input type="radio" name={question._id} checked={false}/>
                                                                    <span className="add-padding-left">
                                                                        {choice}
                                                                    </span>
                                                                </label>
                                                            </div>

                    }

                    { !graded &&
                    <div className="list-group-item">
                                            <label>
                                                <input type="radio" name={question._id} onChange={(event) => {setSelectedAnswer(choice);
                                                changeAnswer(choice)}}/>
                                                <span className="add-padding-left">
                                                    {choice}
                                                </span>
                                            </label>
                    </div>
                    }
                    </>
                    )
                })
            }
            <div>
                Your Answer: {selectedAnswer}
            </div>
            <div>
                {/*<i type="button" className="btn btn-success" onClick={() => setGraded(true)}>
                    Grade
                </i>*/}
            </div>
            </div>
        </div>
    )
}

export default MultipleChoiceQuestion;