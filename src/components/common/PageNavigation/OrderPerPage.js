import React, { Component } from 'react';
import OrderPageNavigationContext from '../../context/OrderPageNavigationContext';


class OrderPerPage extends Component {

    static contextType = OrderPageNavigationContext;

    render() {

        return (
            <form className="order__perpage"
                onSubmit={this.context.onSubmitPerPage.bind(this)}>
                <label>Rows per page: </label>
                <select id="order__limit-perpage"
                    value={this.context.perPage}
                    onChange={this.context.onChangePerPage.bind(this)}
                    className="custom-select custom-select-sm form-control form-control-sm">
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
            </form>
        )
    }
}


export default OrderPerPage;