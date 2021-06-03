import React, { useState } from 'react'

const ListWidget = ({ widget, setWidget, editing, newText, setNewText, newText2, setNewText2, newOrder, setNewOrder, newType, setNewType,
    newUrl, setNewUrl, newWidth, setNewWidth, newHeight, setNewHeight, newSize, setNewSize, selectedFile, setSelectedFile }) => {
    const [listType, setListType] = useState(true);

    return (
        <div>
            {
                !editing &&
                <>
                    {
                        widget.ordered &&
                        <>
                            <h1>{widget.text2}</h1>
                            <ol>
                                {
                                    widget.text.split("\n").map(item => {
                                        return (
                                            <li>{item}</li>
                                        )
                                    })
                                }
                            </ol>
                        </>
                    }
                    {
                        !widget.ordered &&
                        <>
                            <h1>{widget.text2}</h1>
                            <ul>
                                {
                                    widget.text.split("\n").map(item => {
                                        return (
                                            <li>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                    }
                </>
            }

            {
                editing &&
                <select value={newType} onChange={(event) => { setNewType(event.target.value); setListType(false) }}
                    className="form-control">
                    <option value={"HEADING"}>Heading</option>
                    <option value={"PARAGRAPH"}>Paragraph</option>
                    <option value={"LIST"}>LIST</option>
                    <option value={"IMAGE"}>IMAGE</option>
                </select>
            }
            {
                editing && listType &&
                <div>
                    <input type="checkbox" checked={newOrder} onChange={(event) => { setNewOrder(event.target.checked); }} /> Ordered
                    <br />
                    Heading..........
                    <input
                        value={newText2}
                        onChange={(event) => setNewText2(event.target.value)}
                        placeholder="Please give a title...."
                        className="form-control" />
                    List Items
                    <textarea placeholder="Enter one list item per line" rows={10} value={newText} onChange={(event) => setNewText(event.target.value)} className="form-control">
                    </textarea>
                </div>
            }

            { editing && !listType && newType === "HEADING" &&
                <>
                    <input value={newText} onChange={(event) => setNewText(event.target.value)}
                        className="form-control" />
                    <textarea placeholder="Enter description and choose the font size"
                        col={3} rows={3} value={newText2}
                        onChange={(event) => setNewText2(event.target.value)}
                        className="form-control">
                    </textarea>
                    <select value={newSize} onChange={(event) => setNewSize(event.target.value)}
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

            { editing && !listType && newType === "PARAGRAPH" &&
                <>
                    <textarea
                        value={newText}
                        onChange={(event) => setNewText(event.target.value)}
                        className="form-control">
                    </textarea>
                </>
            }

            { editing && !listType && newType === "IMAGE" &&
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
                            event.preventDefault();
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
        </div>
    )
}
export default ListWidget
