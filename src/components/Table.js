import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
export default class Table extends Component {
    render() {
        const { data, columns } = this.props
        return <ReactTable
            data={data}
            columns={columns}
        />
    }
}
