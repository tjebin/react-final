import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import lessonService from '../services/lesson-service';

const EditableColor = (
    {
        to = "/somewhere/to/go",
        deleteLesson,
        updateItem,
        item = { title: "Some Title", _id: "ABC" },
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCahedItem] = useState(item)
    const { layoutId, courseId, moduleId } = useParams();

    const [selectedFile, setSelectedFile] = useState("")

    const call = () => {
        alert("Me is called ......");
    }

    // call();
    const onFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        axios.post("http://localhost:5000/upload/image", data, {
        })
            .then(res => {
                alert(res.statusText);
            })
    }

    return (
        <>
            {
                !editing &&
                <Link className={`nav-link ${active ? 'active' : ''}`} to={to}>
                    <div className="row">
                        <div className="col-9">
                            {item.title}
                        </div>
                        <div className="">
                            <span className="float-right">
                                <i onClick={() => { setEditing(true); setCahedItem(item) }} className="fas fa-edit"></i>
                            </span>
                        </div>
                    </div>
                </Link>
            }
            {
                editing &&
                <div class="row">
                    <div class="col-4">
                        <input
                            onChange={(e) =>
                                setCahedItem({
                                    ...cachedItem,
                                    title: e.target.value
                                })}
                            value={cachedItem.title} />
                    </div>
                    <div class="col-4">
                        <input type="file" name="file" onChange={onFileChangeHandler} />
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-success   btn-sm" onClick={onClickHandler}>Upload</button>
                    </div>

                    <div class="col-*">
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <i onClick={() => {
                            setEditing(false)
                            updateItem(cachedItem)
                        }} className="fas fa-check"></i>

                        &nbsp; &nbsp; &nbsp; &nbsp;

                        <Link to={`/courses/${layoutId}/editor/${courseId}/modules/${moduleId}`}
                            onClick={() => {
                                setEditing(false);
                                deleteLesson(cachedItem);

                            }} className="fas fa-times"></Link>
                    </div>

                </div>

            }
        </>
    )
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
            alert(" second delete lesson executed...." + lesson._id);
            lessonService.deleteLesson(lesson._id)
                .then(status => dispatch({
                    type: "DELETE_LESSON",
                    lessonToDelete: lesson
                }))
        }
    }
}


export default connect(stpm, dtpm)(EditableColor)
