import React, { useState } from 'react'
import { Link } from "react-router-dom";
import QuizzesList from '../quizzes/quizzes-list'

const CourseRow = (
    {
        deleteCourse,
        updateCourse,
        course,
        lastModified,
        title,
        id,
        owner
    }) => {

    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    const deleteTitle = () => {
        setEditing(false)
        deleteCourse(course)
    }

    return (
        <tr>
            <td>
                {
                    !editing &&

                    <Link to={`/courses/table/editor/${course._id}`}>
                        {title}
                    </Link>
                }
                {
                    editing &&
                    <input
                        onChange={(event) => { setNewTitle(event.target.value) }}
                        value={newTitle}
                        className="form-control" />
                }
            </td>
            <td className="d-none d-sm-table-cell">{owner}</td>
            <td className="d-none d-sm-table-cell">{lastModified}</td>
            <td>
                <Link to={`/courses/${course._id}/quizzes`}>
                    Quizzes
                {/*<QuizzesList/>*/}
                </Link>
            </td>
            <td>
                <span class="float-right">
                    {editing && <i onClick={() => saveTitle()} className="fas fa-check"></i>}
                    {editing && <i onClick={() => deleteTitle()} className="fas fa-trash"></i>}
                    {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}

                </span>
            </td>
        </tr>
    )
}
export default CourseRow
