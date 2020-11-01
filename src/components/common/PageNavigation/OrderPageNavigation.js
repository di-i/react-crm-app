import React, { Component } from 'react';
import './pageNavigation.css';
import OrderPerPage from './OrderPerPage';
import OrderRangeRow from './OrderRangeRow';
import OrderPagination from './OrderPagination';



class OrderPageNavigation extends Component {


    render() {

        return (
            <>
                <div className='order__page-navigation-row'>
                    <div className='col-12 order__page-navigation'>
                        <div className="col-md-4 col-2">
                            <OrderPerPage />
                        </div>
                        <div className="col-md-3 col-4">
                            <OrderRangeRow />
                        </div>
                        <div className="col-md-3 col-3 mt-2">
                            <OrderPagination />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default OrderPageNavigation;