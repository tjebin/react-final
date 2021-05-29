import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import EditableItem from "../editable-item";
import EditableColor from "../editable-color";
import { useParams } from "react-router-dom";
import lessonService from '../../services/lesson-service';

const LessonTabs = (
    {
        lessons = [],
        findLessonsForModule,
        createLessonForModule,
        deleteLesson,
        updateLesson

    }) => {
    const { layoutId, courseId, moduleId, lessonId } = useParams();


    const call = () => {
        console.log(" lesson-tabs is called ......");
    }

    call();
    useEffect(() => {
        //alert("lesson - tabs ----- Called: " + moduleId)
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }

        console.log(lessons);
    }, [moduleId])
    return (
        <div className="background-color-blue">
            { moduleId &&
                <div>
                    <h6 class="bg-danger text-white">Colors Available  for {moduleId}</h6>
                    <ul className="nav nav-tabs">
                        {
                            lessons.map(lesson =>
                                <li className="nav-item ">
                                    <EditableColor
                                        active={lesson._id === lessonId}
                                        to={`/courses/${layoutId}/editor/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                        deleteItem={deleteLesson}
                                        updateItem={updateLesson}
                                        item={lesson}
                                    />
                                </li>
                            )
                        }

                        <li>
                            <span className="float-right">
                                <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            }
        </div >)
}

const stpm = (state) => {
    return {
        lessons: state.lessonReducer.lessons
    }
}
const dtpm = (dispatch) => {
    return {
        findLessonsForModule: (moduleId) => {
            //console.log("LOAD LESSONS FOR MODULE:")
            //console.log(moduleId)
            lessonService.findLessonsForModule(moduleId)
                .then(lessons => dispatch({
                    type: "FIND_LESSONS",
                    lessons
                }))
        },
        createLessonForModule: (moduleId) => {
            // alert("CREATE LESSON FOR MODULE: " + moduleId)
            lessonService
                .createLessonForModule(moduleId, { title: "New Color" })
                .then(lesson => dispatch({
                    type: "CREATE_LESSON",
                    lesson
                }))
        },
        updateLesson: (lesson) =>
            lessonService.updateLesson(lesson._id, lesson)
                .then(status => dispatch({
                    type: "UPDATE_LESSON",
                    lesson
                })),
        deleteLesson: (lesson) => {
            alert(" first delete lesson executed...." + lesson._id);
            lessonService.deleteLesson(lesson._id)
                .then(status => dispatch({
                    type: "DELETE_LESSON",
                    lessonToDelete: lesson
                }))
        }


    }
}

export default connect(stpm, dtpm)(LessonTabs)