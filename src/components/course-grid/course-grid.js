import React from 'react'
import CourseCard from "./course-card";
import {Link} from "react-router-dom";

const CourseGrid = ({courses, deleteCourse, updateCourse}) =>
  <div>
     <div className="row pt-3">

     <div className="col-4 d-none d-sm-none d-md-block">
        <h4>Recent Documents</h4>
     </div>

     <div className="col-4 d-none d-sm-none d-md-block">
        <div className="row">
        <h4>Owned By me</h4>
        <i class="fa fa-sort-down"></i>
        </div>
     </div>

      <div className="col-4 my-no-wrap">
      <span className="float-right">
      <i className="fas fa-2x fa-folder add-padding-right"></i>
      <i className="fas fa-2x fa-sort add-padding-right"></i>
      <Link to="/courses/table">
        <i className="fas fa-list fa-2x"></i>
      </Link>
      </span>
      </div>
      </div>

    <div className="row">
    {
      courses.map(course =>
        <CourseCard course={course}
        deleteCourse={deleteCourse}
        updateCourse={updateCourse}
        title={course.title}/>
      )
    }
    </div>
  </div>

export default CourseGrid