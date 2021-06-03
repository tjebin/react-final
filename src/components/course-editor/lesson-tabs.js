import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import EditableItem from "../editable-item";
import EditableColor from "../editable-color";
import { useParams } from "react-router-dom";
import lessonService from '../../services/lesson-service';
import moduleService from "../../services/module-service"

const LessonTabs = ({
    lessons = [],
    myModules = [],
    findLessonsForModule,
    createLessonForModule,
    deleteLesson,
    updateLesson,
    findModulesForCourse = (courseId) => console.log(courseId),

}) => {
    const { layoutId, courseId, moduleId, lessonId } = useParams();
    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [moduleId])
    return (
        <div className="background-color-blue">
            { moduleId &&
                <div>
                    <h6 class="bg-info "> <span class="bg-primary text-light font-weight-bold">Colors Available for style -
                        {
                            myModules.map(module =>
                                <>
                                    {module._id === moduleId ? ' ' + module.title : ''}
                                </>
                            )
                        }
                    </span>
                    </h6>
                    <ul className="nav nav-tabs">
                        {
                            lessons.map(lesson =>
                                <li className="nav-item ">
                                    <EditableColor
                                        active={lesson._id === lessonId}
                                        to={`/courses/${layoutId}/editor/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
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
        lessons: state.lessonReducer.lessons,
        myModules: state.moduleReducer.modules
    }
}
const dtpm = (dispatch) => {
    return {
        findLessonsForModule: (moduleId) => {
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
        },

        findModulesForCourse: (courseId) => {
            // alert(courseId);
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                }))
        }

    }
}

export default connect(stpm, dtpm)(LessonTabs)