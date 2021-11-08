
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function App(props) {
    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rows={props.data}
                columns={props.columns}
                pageSize={props.pageSize}
            />
        </div>
    );
}