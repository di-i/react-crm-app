import React, { Component } from 'react';
import OrderSearchBar from '../SearchBar/OrderSearchBar'
import OrderAddButton from '../AddButton/OrderAddButton'
import './pageHeader.css'


class OrderPageHeader extends Component {

    render() {

        return (
            <div className="order-page-header">
                    <div className="col-12 order-page-header__wrapper">
                        <OrderSearchBar/>
                        <OrderAddButton/>
                    </div>
            </div>
        )
    }
}


export default OrderPageHeader;