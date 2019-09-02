import React, { Component } from 'react'
import RequestTable from './requestTable';
import BarGraph from './barGraph';
import { connect } from "react-redux";
import { getRequestData } from "../redux/actions/requestActions";;

class Microservice extends Component {
    render() {
        const requests = this.props.requestData;
        let requestTimes = [];
        requests.forEach(e => {
            e.recordedTimes.forEach(r => {
                requestTimes.push(r.timeInMicroservice)
            });
        })
        return (
            <div>
                <h3>Microservice</h3>
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
)(Microservice);

