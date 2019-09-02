import React, { Component } from 'react'
import RequestTable from './requestTable';
import BarGraph from './barGraph';
import { connect } from "react-redux";
import { getRequestData } from "../redux/actions/requestActions";;

class Java extends Component {
    componentDidMount() {
        this.props.getRequestData();
    }
    render() {
        const requests = this.props.requestData;
        let requestTimes = [];
        requests.forEach(e => {
            e.recordedTimes.forEach(r => {
                requestTimes.push(r.timeInJava)
            });
        })
        return (
            <div>
                <h3>Java</h3>
                <BarGraph requestTimes={requestTimes} />
                <hr></hr>
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
)(Java);
