import React, { useEffect } from 'react'
import { connect } from "react-redux";
import EditableFabric from "../editable-fabric";
import { useParams } from "react-router-dom";
import topicService from '../../services/topic-service';
import { Media } from 'reactstrap';
import { Link } from "react-router-dom";

const TopicPills = (
    {
        topics = [],
        findTopicsForLesson,
        createTopicForLesson,
        deleteTopic,
        updateTopic,
        resetTopic
    }) => {
    const places_image = {
        height: 200,
        width: 300
    };
    const { layoutId, courseId, moduleId, lessonId, topicId } = useParams();

    const call = () => {
        console.log("topic - pill  executed !!!!" + lessonId);
    }
    call();
    useEffect(() => {
        console.log("LOAD TOPICS FOR LESSON: " + lessonId)
        if (moduleId !== "undefined" && typeof moduleId !== "undefined"
            && lessonId !== "undefined" && typeof lessonId !== "undefined") {

            //alert("1");
            findTopicsForLesson(lessonId)
        } else {
            // alert("2");
            resetTopic()
        }
    }, [moduleId, lessonId])
    return (
        <div className="background-color-blue" >
            { moduleId && lessonId &&
                <div>
                    <h6 class="bg-danger text-white">Fabrics Available for color {lessonId}</h6>

                    <ul className="nav nav-pills">
                        {
                            topics.map(topic =>
                                <li className="nav-item add-padding-right-25">
                                    <EditableFabric
                                        active={topic._id === topicId}
                                        to={`/courses/${layoutId}/editor/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                        deleteItem={deleteTopic}
                                        updateItem={updateTopic}
                                        item={topic} />
                                </li>
                            )
                        }
                        <li>
                            <span className="float-right">
                                <i onClick={() => createTopicForLesson(lessonId)} className="fas fa-plus"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        //console.log("LOAD TOPICS FOR LESSON:")
        //console.log(lessonId)
        topicService.findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                type: "FIND_TOPICS",
                topics
            }))
    },
    createTopicForLesson: (lessonId) => {
        //console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        topicService
            .createTopicForLesson(lessonId, { title: "New Topic" })
            .then(topic => dispatch({
                type: "CREATE_TOPIC",
                topic
            }))
    },
    updateTopic: (topic) =>
        topicService.updateTopic(topic._id, topic)
            .then(status => dispatch({
                type: "UPDATE_TOPIC",
                topic
            })),
    deleteTopic: (topic) => {
        topicService.deleteTopic(topic._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicToDelete: topic
            }))
    },

    resetTopic: () => {
        dispatch({
            type: "RESET_TOPIC"
        })
    },


})

export default connect(stpm, dtpm)(TopicPills)