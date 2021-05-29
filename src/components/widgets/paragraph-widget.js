import React, {useState}  from 'react'

const ParagraphWidget = ({widget, editing, newText, setNewText, newType, setNewType, newSize, setNewSize, newOrder, setNewOrder,
                         newUrl, setNewUrl, newWidth, setNewWidth, newHeight, setNewHeight}) => {

    const [paragraphType, setParagraphType] = useState(true);
    return(
        <>
            {
                editing &&
                <>
                    <select value={newType} onChange={(event) => {setNewType(event.target.value);setParagraphType(false)}}
                                                                    className="form-control">
                                                <option value={"HEADING"}>Heading</option>
                                                <option value={"PARAGRAPH"}>Paragraph</option>
                                                <option value={"LIST"}>LIST</option>
                                                <option value={"IMAGE"}>IMAGE</option>

                    </select>


                    {   paragraphType &&
                    <textarea value={newText} onChange={(event) => setNewText(event.target.value)} className="form-control"></textarea>
                    }
                { !paragraphType && newType==="HEADING" &&
                <>
                                        <input value={newText} onChange={(event) => setNewText(event.target.value)}
                                                                                        className="form-control"/>
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

                { !paragraphType && newType==="LIST" &&
                                        <>
                                        <input type="checkbox" checked={newOrder} onChange={(event) => {setNewOrder(event.target.checked);}}/>
                                        Ordered
                                        <br/>
                                        List Items
                                        <textarea placeholder="Enter one list item per line" rows={10} value={newText} onChange={(event) => setNewText(event.target.value)} className="form-control">

                                        </textarea>
                                        </>

                }

                { !paragraphType && newType==="IMAGE" &&
                <>
                URL
                <input placeholder="Image URL" value={newUrl} onChange={(event) => {setNewUrl(event.target.value); setNewWidth(); setNewHeight();}} className="form-control"/>
                width
                <input value={newWidth} onChange={(event) => setNewWidth(event.target.value)} className="form-control"/>
                height
                <input value={newHeight} onChange={(event) => setNewHeight(event.target.value)} className="form-control"/>

                </>

                }
                </>
            }
            {
                !editing &&
                <p>
                    {widget.text}
                </p>
            }
        </>
    )
}

export default ParagraphWidget
