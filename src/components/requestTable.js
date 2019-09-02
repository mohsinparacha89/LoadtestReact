import React, { Component } from 'react'
import { connect } from "react-redux";
import { getRequestData } from "../redux/actions/requestActions";
import Table from './Table';
class RequestTable extends Component {

    componentDidMount() {
        this.props.getRequestData();
    }


    render() {
        const requestData = this.props.requestData;


        const columns = [
            {
                Header: '#',
                accessor: 'id',
                style: { textAlign: 'center' }
            },
            {
                Header: 'CPR',
                accessor: 'cpr',
                style: { textAlign: 'center' }

            },
            {
                Header: 'Correlation Id',
                accessor: 'correlationId'
            },
            {
                Header: 'Total Time (ms)',
                accessor: 'totalTime',
                style: { textAlign: 'center' }
            },
            {
                Header: 'Time in Microservice (ms)',
                accessor: 'timeInMicroservice',
                style: { textAlign: 'center' }
            },
            {
                Header: 'Time in Java (ms)',
                accessor: 'timeInJava',
                style: { textAlign: 'center' }
            }


        ]
        let i = 0;
        const dataArray = [];

        requestData.forEach(e => {
            e.recordedTimes.forEach(r => {

                let data = {
                    id: ++i,
                    cpr: r.cprNumber,
                    correlationId: r.correlationId,
                    totalTime: r.totalElapsedTime,
                    timeInMicroservice: r.timeInMicroservice,
                    timeInJava: r.timeInJava
                }
                dataArray.push(data)

            })
        });

        return (
            <div>
                <Table data={dataArray}
                    columns={columns} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    requestData: state.request.requestData
});

export default connect(
    mapStateToProps,
    { getRequestData }
)(RequestTable);
