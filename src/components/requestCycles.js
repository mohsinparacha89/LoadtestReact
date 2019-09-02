import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from "react-redux";
import { getRequestData } from "../redux/actions/requestActions";
import Table from './Table';
class RequestCycles extends Component {

    componentDidMount() {
        this.props.getRequestData();
    }

    render() {
        const requestData = this.props;
        let categoryArray = [];
        let numberOfRequests = [];
        let timePerCycle = [];
        let i = 0;

        requestData.requestData.forEach((e) => {
            categoryArray.push(++i);
            numberOfRequests.push(e.requests);
            timePerCycle.push(e.totalElapsedTime);
        })

        const options = {
            title: {
                text: 'Concurrent Requests',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: [{
                categories: categoryArray,
                title: {
                    text: 'Iterations'
                },
            }],
            yAxis: [{
                allowDecimals: false,
                gridLineWidth: 0,
                title: {
                    text: 'number of parallel requests',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} ',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }, {
                gridLineWidth: 0,
                title: {
                    text: 'time',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value} ms',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },

            series: [{
                name: 'requests',
                type: 'spline',
                yAxis: 0,
                data: numberOfRequests,
                marker: {
                    enabled: true
                },
                tooltip: {
                    valueSuffix: ''
                }

            }, {
                name: 'time per cycle',
                type: 'spline',
                yAxis: 1,
                data: timePerCycle,
                tooltip: {
                    valueSuffix: 'ms'
                }
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            x: 0,
                            y: 0
                        }
                    }
                }]
            }
        }


        const columns = [
            {
                Header: '#',
                accessor: 'id'
            },
            {
                Header: 'Total requests Made',
                accessor: 'requests'
            },
            {
                Header: 'Total time per cycle (ms)',
                accessor: 'totalElapsedTime'
            },
            {
                Header: 'Average time per cycle (ms)',
                accessor: 'averageTime'
            }

        ]
        i = 0;
        const dataArray = [];

        requestData.requestData.forEach(e => {
            let data = {
                id: ++i, requests: e.requests, totalElapsedTime: e.totalElapsedTime, averageTime: Math.round(e.totalElapsedTime / e.requests)
            }
            dataArray.push(data)
        });



        return (
            <div>
                <h3>Concurrent Requests</h3>
                <div>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                    <hr></hr>
                    <h4 style={{ textAlign: 'center' }}>All Requests</h4>
                    <div>
                        <Table data={dataArray}
                            columns={columns} />

                    </div>
                </div>
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
)(RequestCycles);
