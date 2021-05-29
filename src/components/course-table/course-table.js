import React from 'react'
import CourseRow from "./course-row";
import { Link } from "react-router-dom";

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

const CourseTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.courses);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table className="table" >
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('title')}
              className={getClassNamesFor('title')}
            >
              Type
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('createdBy')}
              className={getClassNamesFor('createdBy')}
            >
              Created By
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('lastModified')}
              className={getClassNamesFor('lastModified')}
            >
              Last Midified
            </button>
          </th>
          <th>
            <span className="float-right">
              <i className="fas fa-2x fa-sort add-padding-right"></i>
              <Link to="/courses/grid">
                <i className="fas fa-2x fa-th"></i>
              </Link>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((course) =>
            <CourseRow
              updateCourse={props.updateCourse}
              deleteCourse={props.deleteCourse}
              key={course._id}
              course={course}
              id={course._id}
              title={course.title}
              owner={course.owner}
              lastModified={course.lastModified}
            />)
        }
      </tbody>
    </table>
  );
};

export default CourseTable;