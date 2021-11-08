import React from 'react'
import GridFiltering from '../components/GridFiltering'

const columnWidth = 150;
const columns = [
    { field: 'name', headerName: 'Name', width: columnWidth },
    { field: 'lat', headerName: 'Latitude', width: columnWidth, type: 'number' },
    { field: 'lon', headerName: 'Longitude', width: columnWidth, type: 'number' },
    { field: 'temp', headerName: 'Temperature', width: columnWidth, type: 'number' },
];
const arr = []
let data = JSON.parse(localStorage.getItem('history'))["history"];
Object.keys(data).forEach(function (key, i) {
    data[key].id = i;
    arr.push(data[key]);
})

const GridPage = () => {
    return (
        <div className='gridContainer'>
            <GridFiltering data={arr} columns={columns} pageSize={20} />;
        </div>
    )
}

export default GridPage
