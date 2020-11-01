import React, { Component } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './loader.css'

class Loader extends Component {

    render() {
        return (
            <div className="loader-wrapper">
                <Spin size="large" />
            </div>
        )
    }
}

export default Loader;