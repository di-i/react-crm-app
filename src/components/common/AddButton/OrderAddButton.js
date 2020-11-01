import React, { Component } from 'react';
import './addButton.css';
import OrderPageHeaderContext from '../../context/OrderPageHeaderContext'

class OrderAddButton extends Component {

    static contextType = OrderPageHeaderContext

    render() {

        return (
            <div className='button-wrapper'>
                <button
                    type="button"
                    className="btn btn-success waves-effect waves-light mb-3"
                    onClick={this.context.onCreateHandler.bind(this)}>
                    + Add
            </button>
            </div>
        )
    }
}

export default OrderAddButton;