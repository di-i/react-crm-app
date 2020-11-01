import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './searchBar.css';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import OrderPageHeaderContext from '../../context/OrderPageHeaderContext';


class OrderSearchBar extends Component {

    static contextType = OrderPageHeaderContext;

    constructor() {
        super();
        this.state = {
            orderSearchText: '',
        }

        this.onSubmitOrderHandler = this.onSubmitOrderHandler.bind(this)
        this.onChangeOrderHandler = this.onChangeOrderHandler.bind(this)
    }

    onChangeOrderHandler(event) {
        this.setState({
            orderSearchText: event.target.value
        }, () => {
            this.context.onSearch(this.state.orderSearchText);
        });
    }

    searchOrder() {
        this.context.onSearch(this.state.orderSearchText);
    }

    onSubmitOrderHandler(event) {
        event.preventDefault();
        this.searchOrder();
    }

    render() {

        return (
            <form className="order__search-form" onSubmit={this.onSubmitOrderHandler}>
                <IconContext.Provider value={{ color: '#8B83BA', className: 'fa-search' }}>
                    <FaSearch />
                </IconContext.Provider>
                <input
                    type="search"
                    value={this.state.orderSearchText}
                    onChange={this.onChangeOrderHandler}
                    id="order__search"
                    placeholder="Search" />
            </form>
        )
    }
}


export default OrderSearchBar;