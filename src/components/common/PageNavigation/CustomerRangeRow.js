import React, { Component } from 'react';
import PageNavigationContext from '../../context/PageNavigationContext';

class CustomerRangeRow extends Component {

    static contextType = PageNavigationContext;

    render() {
        return (
            <div className="customer__range-row">
                {this.context.renderRange()}
            </div>
        )
    }
}


export default CustomerRangeRow;