import React, { useState } from 'react'

const HeadingWidget = ({
    widget,
    editing,
    updated,
    updateWidget,
    deleteWidget,
    newText, setNewText,
    newText2, setNewText2,
    newSize, setNewSize,
    newType, setNewType,
    newOrder, setNewOrder,
    newUrl, setNewUrl,
    newWidth, setNewWidth,
    newHeight, setNewHeight,
    selectedFile, setSelectedFile }) => {
    const [headingType, setHeadingType] = useState(true);
    return (
        <>
            {
                editing &&
                <>
                    <select value={newType}
                        onChange={(event) => {
                            setNewType(event.target.value);
                            setHeadingType(false)
                        }}
                        className="form-control">
                        <option value={"HEADING"}>Heading</option>
                        <option value={"PARAGRAPH"}>Paragraph</option>
                        <option value={"LIST"}>LIST</option>
                        <option value={"IMAGE"}>IMAGE</option>
                    </select>
                    { headingType &&
                        <>
                            <input
                                value={newText}
                                onChange={(event) => setNewText(event.target.value)}
                                placeholder="please"
                                className="form-control" />
                            <textarea placeholder="Enter description and choose the font size"
                                col={3} rows={3} value={newText2}
                                onChange={(event) => setNewText2(event.target.value)}
                                className="form-control">
                            </textarea>
                            <select
                                value={newSize}
                                onChange={(event) => setNewSize(event.target.value)}
                                className="form-control">
                                <option value={1}>Heading 1</option>
                                <option value={2}>Heading 2</option>
                                <option value={3}>Heading 3</option>
                                <option value={4}>Heading 4</option>
                                <option value={5}>Heading 5</option>
                                <option value={6}>Heading 6</option>
                            </select>
                        </>
                    }

                    { !headingType && newType === "PARAGRAPH" &&
                        <textarea
                            col={3} rows={3}
                            value={newText}
                            onChange={(event) => setNewText(event.target.value)}
                            className="form-control">
                        </textarea>
                    }
                    { !headingType && newType === "LIST" &&
                        <>
                            <input
                                type="checkbox"
                                checked={newOrder}
                                onChange={(event) => { setNewOrder(event.target.checked); }} />
                            Ordered
                            <br />
                            Heading..........
                            <input
                                value={newText2}
                                onChange={(event) => setNewText2(event.target.value)}
                                placeholder="Please give a title...."
                                className="form-control" />
                            List Items
                            <textarea
                                placeholder="Enter one list item per line"
                                col={4}
                                rows={10} value={newText}
                                onChange={(event) => setNewText(event.target.value)}
                                className="form-control">
                            </textarea>
                        </>
                    }
                    { !headingType && newType === "IMAGE" &&
                        <>
                            URL
                            <input
                                type="file"
                                placeholder="Image URL"
                                name="file"
                                onChange={(event) => {
                                    setNewUrl("/images/color/" + event.target.files[0].name);
                                    setNewWidth();
                                    setNewHeight();
                                    // event.preventDefault();
                                    setSelectedFile(event.target.files[0]);
                                }}
                                className="form-control" />
                             width
                            <input
                                value={newWidth}
                                onChange={(event) => setNewWidth(event.target.value)}
                                className="form-control" />
                            height
                            <input
                                value={newHeight}
                                onChange={(event) => setNewHeight(event.target.value)}
                                className="form-control" />

                        </>
                    }
                </>
            }
            {
                !editing &&
                <>
                    {widget.size == 1 && <div><h1>{widget.text}</h1><br /><p>{widget.text2}</p></div>}
                    {widget.size == 2 && <div><h1>{widget.text}</h1><br /><p>{widget.text2}</p></div>}
                    {widget.size == 3 && <div><h1>{widget.text}</h1><br /><p>{widget.text2}</p></div>}
                    {widget.size == 4 && <h4>{widget.text}</h4>}
                    {widget.size == 5 && <h5>{widget.text}</h5>}
                    {widget.size == 6 && <h6>{widget.text}</h6>}
                </>
            }
        </>
    )
}

export default HeadingWidget