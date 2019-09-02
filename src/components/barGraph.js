import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export default class BarGraph extends Component {

    formatData(requestTimes) {

        let totalRequestTime = requestTimes.reduce((a, b) => a + b, 0);
        let averageRequestTime = totalRequestTime / requestTimes.length;

        let standardDeviation = Math.sqrt(requestTimes.reduce(function (sq, n) {
            return sq + Math.pow(n - averageRequestTime, 2);
        }, 0) / (requestTimes.length - 1))

        let cutOff = averageRequestTime + standardDeviation;
        let ceiling = Math.max(...requestTimes) > 100 ? Math.ceil(cutOff / 100) * 100 : Math.ceil(cutOff / 10) * 10;
        let lowest = Math.min(...requestTimes);
        let floor = lowest > 100 ? Math.floor(lowest / 100) * 100 : Math.floor(lowest / 10) * 10;

        return {
            ceiling,
            floor,
            requestTimes,
        };
    }

    render() {
        const allrequestData = this.formatData(this.props.requestTimes);
        let chartSegments = [];
        chartSegments.push(allrequestData.floor);
        let segmentGap = (allrequestData.ceiling - allrequestData.floor) / 5;

        for (let i = 0; i < 5; i++) {
            let chartSegment = chartSegments[i] + segmentGap;
            chartSegments.push(chartSegment)
        }
        let segmentData = [];
        let requestTimes = allrequestData.requestTimes;
        let requestCount = 0;

        for (let i = 0; i < chartSegments.length; i++) {
            for (let j = 0; j < requestTimes.length; j++) {
                if (chartSegments[i + 1] !== undefined) {
                    if (((requestTimes[j] <= chartSegments[i + 1]) && (requestTimes[j] > chartSegments[i]))) {
                        requestCount += 1;
                    }
                }
                else {
                    if (requestTimes[j] > chartSegments[i]) {
                        requestCount += 1;
                    }
                }
            }
            segmentData.push(requestCount);
            requestCount = 0;
        }

        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Accumulative time'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Time in ms',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif',
                        fontWeight: 'bold'
                    }

                },
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        fontWeight: 'bold'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of requets',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif',
                        fontWeight: 'bold'
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Number of requests: <b>{point.y}</b>'
            },
            series: [{
                name: 'Population',
                data: [
                    [`${chartSegments[0]} -  ${chartSegments[1]} `, segmentData[0]],
                    [`${chartSegments[1] + 1} -  ${chartSegments[2]} `, segmentData[1]],
                    [`${chartSegments[2] + 1} -  ${chartSegments[3]} `, segmentData[2]],
                    [`${chartSegments[3] + 1} -  ${chartSegments[4]} `, segmentData[3]],
                    [`${chartSegments[4] + 1} - ${chartSegments[5]}`, segmentData[4]],
                    [`> ${chartSegments[5] + 1} `, segmentData[5]]
                ],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    y: 10,
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        }
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}
