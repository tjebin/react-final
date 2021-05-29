import React from 'react'
import CourseRow from "./course-row";
import { Link } from "react-router-dom";

const useSortableData = (items, config = null) => {
    console.log(" called 1...................");
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

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table>
            <caption>Products</caption>
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
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.owner}</td>
                        <td>{item.lastModified}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default class CourseTable
    extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                <ProductTable
                    products={this.props.courses}
                />
            </div>
        );
    }
};
