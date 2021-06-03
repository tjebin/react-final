import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import HeadingWidget from "./heading-widget";
import ListWidget from "./list-widget";
import ImageWidget from "./image-widget";
import ParagraphWidget from "./paragraph-widget";
import { useParams } from "react-router-dom";
import widgetService from '../../services/widget-service';
import axios from 'axios';

const WidgetList = (
    {
        widgets = [],
        topics = [],
        findWidgetsForTopic,
        createWidgetForTopic,
        deleteWidget,
        updateWidget
    }
) => {

    const { layoutId, courseId, moduleId, lessonId, topicId } = useParams();
    const [editingWidget, setEditingWidget] = useState({});
    const [widget, setWidget] = useState({});
    const [newText, setNewText] = useState("")
    const [newText2, setNewText2] = useState("")
    const [newSize, setNewSize] = useState()
    const [newType, setNewType] = useState()
    const [newOrder, setNewOrder] = useState(false)
    const [newWidth, setNewWidth] = useState()
    const [newHeight, setNewHeight] = useState()
    const [newUrl, setNewUrl] = useState("Image URL")
    const [selectedFile, setSelectedFile] = useState("")

    useEffect(() => {
        findWidgetsForTopic(topicId);
        console.dir(widgets);
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
                                        if (newType == "IMAGE" && setSelectedFile != null) {
                                            const data = new FormData();
                                            data.append('file', selectedFile);
                                            axios.post("http://localhost:5000/upload/image", data, {
                                            })
                                                .then(res => {
                                                    alert(res.statusText);
                                                })
                                        }                                 //changed
                                        updateWidget({ ...editingWidget, text: newText, text2: newText2, size: newSize, type: newType, ordered: newOrder, url: newUrl, width: newWidth, height: newHeight, selectedFile: selectedFile });
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
                                    setNewText2(widget.text2);
                                    setNewSize(widget.size); setNewType(widget.type); setNewOrder(widget.ordered); setNewUrl(widget.url); setNewWidth(widget.width);
                                    setNewHeight(widget.height);
                                    //changed
                                    setSelectedFile(widget.selectedFile);
                                }} className="fas fa-2x fa-edit float-right"></i>
                            }
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    newText={newText}
                                    newText2={newText2}
                                    newSize={newSize}
                                    newType={newType}
                                    editing={editingWidget.id === widget.id}
                                    updateWidget={updateWidget}
                                    deleteWidget={deleteWidget}
                                    setNewText={setNewText}
                                    setNewText2={setNewText2}
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
                                    widget={widget}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile} />
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    newText={newText}
                                    newText2={newText2}
                                    newType={newType}
                                    newSize={newSize}
                                    editing={editingWidget.id === widget.id}
                                    setNewText={setNewText}
                                    setNewText2={setNewText2}
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
                                    widget={widget}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                />
                            }
                            {
                                widget.type === "LIST" &&
                                <ListWidget
                                    newText={newText}
                                    newText2={newText2}
                                    setNewText={setNewText}
                                    setNewText2={setNewText2}
                                    newType={newType}
                                    setNewType={setNewType}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newSize={newSize}
                                    setNewSize={setNewSize}
                                    setWidget={setWidget}
                                    editing={editingWidget.id === widget.id}
                                    widget={widget}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile} />
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
                                    newText2={newText2}
                                    setNewText={setNewText}
                                    setNewText2={setNewText2}
                                    newOrder={newOrder}
                                    setNewOrder={setNewOrder}
                                    newType={newType}
                                    setNewType={setNewType}
                                    editing={editingWidget.id === widget.id}
                                    widget={widget}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile} />
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
            .createWidgetForTopic(topicId, { type: "PARAGRAPH", size: 1, text: "New Widgetpara" })
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