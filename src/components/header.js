import React, { Component } from 'react'
import { Link } from "react-router-dom";
const btnDiv = {
    marginLeft: '10%'
};


const h3Style = {
    textAlign: 'center'
}


const btnStyle = {
    marginLeft: '0.5rem'
}
export default class Header extends Component {
    render() {
        return (
            <div>
                <h3 style={h3Style}>Load Test Stats</h3>
                <div style={btnDiv}>
                    <Link to={'/request-cycle'}><button className="button-primary" style={btnStyle} >Request Cycles</button></Link>
                    <Link to={'/full-flow'}><button className="button-primary" style={btnStyle}>Full flow</button></Link>
                    <Link to={'/api-proxy'}><button className="button-primary" style={btnStyle}>Api Proxy</button></Link>
                    <Link to={'/microservice'}><button className="button-primary" style={btnStyle}>Micro service</button></Link>
                    <Link to={'/java'}><button className="button-primary" style={btnStyle}>Java</button></Link>
                </div>
            </div >
        )
    }
}
