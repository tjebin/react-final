import React, { useState } from 'react'
import CourseCard from "./course-card";
import { Link } from "react-router-dom";
import { Tooltip } from 'reactstrap';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const CourseGrid = ({ courses, deleteCourse, updateCourse }) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { items, requestSort, sortConfig } = useSortableData(courses);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <div className="row">
        <div className="col-4 d-sm-none d-md-block">
          <h4>Owned By me</h4>
        </div>
        <div className="col-4 my-no-wrap">
          <span className="float-right">
            <i class="fas fa-sort fa-3x" onClick={() => requestSort('title')}></i>
            <Link to="/courses/table">
              <i className="fas fa-list fa-2x" href="#" id="TooltipListView" ></i>
              <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipListView" toggle={toggle}>
                Go To List View !!
              </Tooltip>
            </Link>
          </span>
        </div>
        <div className="col-4  d-sm-none d-md-block">
        </div>
      </div>
      <div className="row">
        {
          items.map(course =>
            <CourseCard course={course}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              title={course.title} />
          )
        }
      </div>
    </div>
  )
}
export default CourseGrid