import React, { Component } from 'react';
import './addButton.css';
import CustomerPageHeaderContext from '../../context/CustomerPageHeaderContext'

class AddButton extends Component {

    static contextType = CustomerPageHeaderContext

    render() {
        
        return (
            <button
                type="button"
                className="btn btn-success waves-effect waves-light mb-3"
                onClick={this.context.onCreateHandler.bind(this)}>
                + Add
            </button>
        )
    }
}

export default AddButton;