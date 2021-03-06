import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import EditableItem from "../editable-item";
import { useParams } from "react-router-dom";
import moduleService from "../../services/module-service"

const ModuleList = (
    {
        myModules = [],
        createModule = () => alert("Create Module 234"),
        deleteModule = (item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse = (courseId) => console.log(courseId),
        resetTopic,
        resetLesson
    }) => {
    const { layoutId, courseId, moduleId, lessionId } = useParams();
    const [value, setValue] = useState('initial');
    useEffect(() => {
        resetLesson();
        resetTopic();
        findModulesForCourse(courseId)
    }, [value])
    return (
        <div>
            <ul className="list-group">
                {
                    myModules.map(module =>
                        <li className={`list-group-item ${module._id === moduleId ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/${layoutId}/editor/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                active={true}
                                item={module} />
                        </li>
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createModule(courseId)}
                        className="fas fa-plus fa-2x add-padding-left-140"></i>
                </li>
            </ul>
        </div>)
}

const stpm = (state) => {
    return {
        myModules: state.moduleReducer.modules
    }
}
const dtpm = (dispatch) => {
    return {
        resetTopic: () => {
            dispatch({
                type: "RESET_TOPIC"
            })
        },

        resetLesson: () => {
            dispatch({
                type: "RESET_LESSON"
            })
        },

        createModule: (courseId) => {
            moduleService.createModuleForCourse(courseId, { title: "New Type" })
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },
        deleteModule: (item) =>
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: item
                })),
        updateModule: (module) =>
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    module
                })),
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

export default connect(stpm, dtpm)
    (ModuleList)
