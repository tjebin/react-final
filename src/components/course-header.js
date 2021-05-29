import React from 'react'
import {Link} from "react-router-dom";

const CourseHeader = () =>
    <div class="row">

                    <div class="col-1">
                        <i className="fa fa-bars fa-2x pull-right"></i>
                    </div>

                    <div class="col-3 d-none d-sm-block">
                        <h4>Course Manager</h4>
                    </div>

                    <div class="col-7">
                        <input class="form-control bg-muted" type="text" value={this.state.value}
                        onChange={this.handleChange} placeholder="New Course Title"/>
                    </div>

                    <div class="col-1">

                        <i onClick={this.addCourse.bind(this,this.state.value)}
                        className="fa fa-plus fa-2x color-me-tomato"></i>

                    </div>


            </div>

export default CourseHeader