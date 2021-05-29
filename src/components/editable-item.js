import React, { useState } from 'react'
import { Link } from "react-router-dom";

const EditableItem = (
    {
        to = "/somewhere/to/go",
        deleteItem,
        updateItem,
        item = { title: "Some Title", _id: "ABC" },
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCahedItem] = useState(item)
    return (
        <>
            {
                !editing &&
                <Link className={`nav-link ${active ? 'active' : ''}`} to={to}>
                    <div className="row">
                        <div className="col-9">
                            {/*<Link className={`nav-link ${active?'active':''}`} to={to}>*/}
                            {item.title}
                            {/*</Link>*/}
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
                <div className="row">
                    <div className="">
                        <input
                            onChange={(e) =>
                                setCahedItem({
                                    ...cachedItem,
                                    title: e.target.value
                                })}
                            value={cachedItem.title} />
                    </div>
                    <div className="">
                        <span className="add-padding-left">
                            <i onClick={() => {
                                setEditing(false)
                                updateItem(cachedItem)
                            }} className="fas fa-check"></i>
                            <i onClick={() => {
                                setEditing(false)
                                deleteItem(cachedItem)
                            }} className="fas fa-times add-padding-left"></i>
                        </span>
                    </div>
                </div>
            }
        </>
    )
}

export default EditableItem