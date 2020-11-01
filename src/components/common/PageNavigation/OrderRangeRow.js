import React, { Component } from 'react';
import OrderPageNavigationContext from '../../context/OrderPageNavigationContext';

class OrderRangeRow extends Component {

    static contextType = OrderPageNavigationContext;

    render() {
        return (
            <div className="order__range-row">
                {this.context.renderRange()}
            </div>
        )
    }
}


export default OrderRangeRow;