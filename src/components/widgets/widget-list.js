import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import HeadingWidget from "./heading-widget";
import ListWidget from "./list-widget";
import ImageWidget from "./image-widget";
import ParagraphWidget from "./paragraph-widget";
import { useParams } from "react-router-dom";
import widgetService from '../../services/widget-service'

const WidgetList = (
    {
        widgets = [],
        topics = [],
        findWidgetsForTopic,
        createWidgetForTopic,
        deleteWidget,
        updateWidget
        //resetTopic
    }

) => {

    const { layoutId, courseId, moduleId, lessonId, topicId } = useParams();
    const [editingWidget, setEditingWidget] = useState({});
    const [widget, setWidget] = useState({});
    const [newText, setNewText] = useState("")
    const [newSize, setNewSize] = useState()
    const [newType, setNewType] = useState()
    const [newOrder, setNewOrder] = useState(false)
    const [newWidth, setNewWidth] = useState()
    const [newHeight, setNewHeight] = useState()
    const [newUrl, setNewUrl] = useState("Image URL")

    useEffect(() => {
        findWidgetsForTopic(topicId);
        console.log(" In widget-list " + widgets);
    }, [moduleId, lessonId, topicId])
    return (
        <div>
            {
                moduleId && lessonId && topicId &&
                <>
                    <i onClick={() => createWidgetForTopic(topicId)} className="fas fa-plus fa-2x float-right"></i>
                    <h6 class="bg-info "> <span class="bg-primary text-light font-weight-bold">Widgets Available for material -
                    {
                            topics.map(topic =>
                                <>
                                    {topic._id === topicId ? ' ' + topic.title : ''}
                                </>
                            )
                        }
                    </span>
                    </h6>
                </>
            }
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li className="list-group-item" key={widget.id}>
                            {
                                editingWidget.id === widget.id &&
                                <>
                                    <i onClick={() => {
                                        updateWidget({ ...editingWidget, text: newText, size: newSize, type: newType, ordered: newOrder, url: newUrl, width: newWidth, height: newHeight });
                                        { setEditingWidget({}); }
                                    }} className="fas fa-2x fa-check float-right"></i>
                                    <i onClick={() => deleteWidget(widget)}
                                        className="fas fa-2x fa-trash float-right"></i>
                                </>
                            }
                            {
                                editingWidget.id !== widget.id &&
                                <i onClick={() => {
                                    setEditingWidget(widget); setNewText(widget.text);
                                    setNewSize(widget.size); setNewType(widget.type); setNewOrder(widget.ordered); setNewUrl(widget.url); setNewWidth(widget.width);
                                    setNewHeight(widget.height)
                                }} className="fas fa-2x fa-edit float-right"></i>
                            }
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    newText={newText}
                                    newSize={newSize}
                                    newType={newType}
                                    editing={editingWidget.id === widget.id}
                                    updateWidget={updateWidget}
                                    deleteWidget={deleteWidget}
                                    setNewText={setNewText}
                                    setNewSize={setNewSize}
                                    setNewType={setNewType}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newUrl={newUrl}
                                    newWidth={newWidth}
                                    newHeight={newHeight}
                                    setNewUrl={setNewUrl}
                                    setNewWidth={setNewWidth}
                                    setNewHeight={setNewHeight}
                                    widget={widget} />
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    newText={newText}
                                    newType={newType}
                                    newSize={newSize}
                                    editing={editingWidget.id === widget.id}
                                    setNewText={setNewText}
                                    setNewType={setNewType}
                                    setNewSize={setNewSize}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newUrl={newUrl}
                                    newWidth={newWidth}
                                    newHeight={newHeight}
                                    setNewUrl={setNewUrl}
                                    setNewWidth={setNewWidth}
                                    setNewHeight={setNewHeight}
                                    widget={widget} />
                            }

                            {
                                widget.type === "LIST" &&
                                <ListWidget
                                    newText={newText}
                                    setNewText={setNewText}
                                    newType={newType}
                                    setNewType={setNewType}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newSize={newSize}
                                    setNewSize={setNewSize}
                                    setWidget={setWidget}
                                    editing={editingWidget.id === widget.id}
                                    widget={widget} />
                            }
                            {
                                widget.type === "IMAGE" &&
                                <ImageWidget
                                    setWidget={setWidget}
                                    newUrl={newUrl}
                                    newWidth={newWidth}
                                    newHeight={newHeight}
                                    setNewUrl={setNewUrl}
                                    setNewWidth={setNewWidth}
                                    setNewHeight={setNewHeight}
                                    newText={newText}
                                    setNewText={setNewText}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newType={newType}
                                    setNewType={setNewType}
                                    editing={editingWidget.id === widget.id}
                                    widget={widget} />
                            }

                        </li>
                    )
                }
            </ul>
        </div >
    )
}

const stpm = (state) => ({
    widgets: state.widgetReducer.widgets,
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findWidgetsForTopic: (topicId) => {
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: "FIND_WIDGETS",
                widgets
            }))
    },
    createWidgetForTopic: (topicId) => {
        widgetService
            .createWidgetForTopic(topicId, { type: "PARAGRAPH", size: 1, text: "New Widget4" })
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    updateWidget: (widget) =>
        widgetService.updateWidget(widget.id, widget)
            .then(status => dispatch({
                type: "UPDATE_WIDGET",
                widget
            })),
    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget.id)
            .then(status => dispatch({
                type: "DELETE_WIDGET",
                widgetToDelete: widget
            }))
    },

})
export default connect(stpm, dtpm)(WidgetList);