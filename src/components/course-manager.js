import React from 'react'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import CourseEditor from "./course-editor/course-editor";
import { Link, Route } from "react-router-dom";
import courseService, { findAllCourses, deleteCourse } from "../services/course-service";

class CourseManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      value: 'New Type'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  updateCourse = (course) => {
    console.log(course)
    courseService.updateCourse(course._id, course)
      .then(status => this.setState((prevState) => ({
        ...prevState,
        courses: prevState.courses.map(
          (c) => c._id === course._id ? course : c)
      })))
  }

  componentDidMount = () =>
    findAllCourses()
      .then(courses => this.setState({ courses }))

  addCourse = (temp) => {
    const newCourse = {
      title: temp,
      owner: "me",
      lastModified: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear()
    }

    courseService.createCourse(newCourse)
      .then(course => this.setState(
        (prevState) => ({
          ...prevState,
          courses: [
            ...prevState.courses,
            course
          ]
        })))

    this.setState({ value: "" });
  } // End of add course

  deleteCourse = (courseToDelete) => {
    courseService.deleteCourse(courseToDelete._id)
      .then(status => {
        this.setState((prevState) => ({
          ...prevState,
          courses: prevState.courses.filter
            (course => course !== courseToDelete)
        }))
      })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="store-management-header" >
          <div>
            <Link to="/">
              <i className="fas fa-2x fa-home float-right"></i>
            </Link>
          </div>
          <div className="circle">
            <span class="font-weight-bold">W</span>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <i className="heading-font" > Furniture Store Management By Tania Jebin</i>
            </div>
          </div>
          <div className="divider"></div>
          <div className="divider-green"></div>
          <div className="divider-blue "></div>
        </div>

        {/* <div class="row">
          <div class="col-3 d-none d-sm-none d-md-none d-lg-block">
            <h4>Store Management</h4>
          </div>
          <div class="col-7">
            <input class="form-control bg-muted" type="text" value={this.state.value}
              onChange={this.handleChange} placeholder="Furniture Type" />
          </div>
          <div class="col-2">
            <i onClick={this.addCourse.bind(this, this.state.value)}
              className="fa fa-plus fa-2x color-me-tomato"></i>
          </div>
        </div> */}
        <Route path="/courses/grid" exact={true}>
          <div class="row" >
            <div class="col-12 text-center" >
              <span className="furniture-type-grid-view-header ">Furniture Type Grid View</span>
            </div>
          </div>
        </Route>
        <Route path="/courses/table" exact={true}>
          <CourseTable
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses} />
          <div className="fixed-bottom">
            <i onClick={this.addCourse.bind(this, "New Type")}
              className="fa fa-plus fa-2x color-me-tomato float-right"></i>
          </div>
        </Route>
        <Route path="/courses/grid" exact={true}>
          <CourseGrid
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses} />
          <div className="fixed-bottom">
            <i onClick={this.addCourse.bind(this, this.state.value)}
              className="fa fa-plus fa-2x color-me-tomato float-right"></i>
          </div>
        </Route>
        <Route path={[
          "/courses/:layoutId/editor/:courseId",
          "/courses/:layoutId/editor/:courseId/modules/:moduleId",
          "/courses/:layoutId/editor/:courseId/modules/:moduleId/lessons/:lessonId",
          "/courses/:layoutId/editor/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
          "/courses/:layoutId/editor/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId/:widgetId"]}
          exact={true}
          render={(props) => <CourseEditor {...props} />}>
        </Route>
      </div>
    )
  }
}

export default CourseManager