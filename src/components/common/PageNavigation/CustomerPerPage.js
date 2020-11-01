import React, { Component } from 'react';
import PageNavigationContext from '../../context/PageNavigationContext';


class CustomerPerPage extends Component {

    static contextType = PageNavigationContext;

    render() {

        return (
            <form className="customer__per-page"
                onSubmit={this.context.onSubmit.bind(this)}>
                <label>Rows per page: </label>
                <select id="customer__limit-perpage"
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


export default CustomerPerPage;