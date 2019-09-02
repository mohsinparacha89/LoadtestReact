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
        const requestData = this.props.requestData;
        let categoryArray = [];
        let numberOfRequests = [];
        let timePerCycle = [];
        let i = 0;

        requestData.forEach((e) => {
            categoryArray.push(++i);
            numberOfRequests.push(e.requests);
            timePerCycle.push(e.totalElapsedTime);
        })

        let totalCycles = requestData.length;

        let highest = requestData.find((obj) => { return obj.totalElapsedTime === Math.max(...requestData.map(c => c.totalElapsedTime)) });
        let lowest = requestData.find((obj) => { return obj.totalElapsedTime === Math.min(...requestData.map(c => c.totalElapsedTime)) });
        const randomRequestCycle = requestData.reduce((accumulator, current) => {
            if (current !== highest || current !== lowest) {
                accumulator.push(current)
            }
            return accumulator
        }, [])[Math.floor(Math.random() * (requestData.length - 2))]

        let totalChartTime = highest.totalElapsedTime + lowest.totalElapsedTime + randomRequestCycle.totalElapsedTime;
        const pieOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Trends'
            },
            subtitle: {
                text: `Total request cycles ${totalCycles} `
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>'
                    }
                }
            },
            series: [{
                name: 'Ratio to 3 cycles',
                colorByPoint: true,
                data: [{
                    name: `${highest.requests} requests per cycle took ${highest.totalElapsedTime} ms`,
                    y: Math.floor(highest.totalElapsedTime / totalChartTime * 100),
                    sliced: true,
                    selected: true
                }, {
                    name: `${randomRequestCycle.requests} requests per cycle took ${randomRequestCycle.totalElapsedTime} ms`,
                    y: Math.floor(randomRequestCycle.totalElapsedTime / totalChartTime * 100)
                },
                {
                    name: `${lowest.requests} requests per cycle took ${lowest.totalElapsedTime} ms`,
                    y: Math.floor(lowest.totalElapsedTime / totalChartTime * 100)
                }]
            }]
        };

        const lineOptions = {
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
                accessor: 'id',
                style: { textAlign: 'center' }
            },
            {
                Header: 'Total requests Made',
                accessor: 'requests',
                style: { textAlign: 'center' }
            },
            {
                Header: 'Total time per cycle (ms)',
                accessor: 'totalElapsedTime',
                style: { textAlign: 'center' }
            },
            {
                Header: 'Average time per cycle (ms)',
                accessor: 'averageTime',
                style: { textAlign: 'center' }
            }

        ]
        i = 0;
        const dataArray = [];

        requestData.forEach(e => {
            let data = {
                id: ++i, requests: e.requests, totalElapsedTime: e.totalElapsedTime, averageTime: Math.round(e.totalElapsedTime / e.requests)
            }
            dataArray.push(data)
        });



        return (
            <div>
                <h3>Cycles</h3>
                <div>
                    <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                    <hr></hr>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
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
