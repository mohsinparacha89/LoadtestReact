import React, { Component } from 'react'
import BarGraph from './barGraph';
import { connect } from "react-redux";
import { getRequestData } from "../redux/actions/requestActions";
import RequestTable from './requestTable';

class FullFlow extends Component {
    componentDidMount() {
        this.props.getRequestData();
    }

    render() {
        const requests = this.props.requestData;
        let requestTimes = [];
        requests.forEach(e => {
            e.recordedTimes.forEach(r => {
                requestTimes.push(r.totalElapsedTime)
            });
        })

        return (
            <div>
                <h3>Full Flow</h3>
                <BarGraph requestTimes={requestTimes} />
                <RequestTable />
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
)(FullFlow);
