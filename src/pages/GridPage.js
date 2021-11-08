import React from 'react'
import GridFiltering from '../components/GridFiltering'
import { withRouter } from 'react-router-dom';

const columnWidth = 150;
const columns = [
    { field: 'name', headerName: 'Name', width: columnWidth },
    { field: 'lat', headerName: 'Latitude', width: columnWidth, type: 'number' },
    { field: 'lon', headerName: 'Longitude', width: columnWidth, type: 'number' },
    { field: 'temp', headerName: 'Temperature', width: columnWidth, type: 'number' },
];



const GridPage = (props) => {
    const arr = []
    let data = JSON.parse(localStorage.getItem('history'));
    if (data !== null && data !== undefined) {
        Object.keys(data).forEach(function (key, i) {
            data[key].id = i;
            arr.push(data[key]);
        })
    }
    const redirectPage = () => {
        const { history } = props;
        if (history) history.push('/');
    }
    return (
        <div className='gridContainer'>
            <GridFiltering data={arr} columns={columns} pageSize={20} />
            <button className='btn' onClick={redirectPage}>
                Back
            </button>
        </div>
    )
}

export default withRouter(GridPage);
