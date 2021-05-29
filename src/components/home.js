import React from 'react'
import { Link } from "react-router-dom";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">
            <Link to="/courses/table" className="list-group-item">
                Furniture Overview
            </Link>
            <Link to="/courses/grid" className="list-group-item">
                Furniture Grid View
            </Link>
            <Link to="/courses/editor" className="list-group-item">
                Course Editor
            </Link>
        </div>
    </>
