import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

const EditableFabric = (
    {
        to = "/somewhere/to/go",
        deleteItem,
        updateItem,
        item = { title: "Some Title", _id: "ABC" },
        active
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCahedItem] = useState(item)
    const { layoutId, courseId, moduleId } = useParams();

    const [selectedFile, setSelectedFile] = useState("")

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
                        &nbsp; &nbsp; &nbsp;<br />
                        <i onClick={() => {
                            setEditing(false)
                            updateItem(cachedItem)
                        }} className="fas fa-check"></i>
                        <i onClick={() => {
                            setEditing(false)
                            deleteItem(cachedItem)
                        }} className="fas fa-times"></i>

                    </div>
                </div>

            }
        </>
    )
}

export default EditableFabric