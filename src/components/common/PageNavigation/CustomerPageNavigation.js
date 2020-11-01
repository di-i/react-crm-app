import React, { Component } from 'react';
import './pageNavigation.css';
import CustomerPerPage from './CustomerPerPage';
import CustomerRangeRow from './CustomerRangeRow';
import CustomerPagination from './CustomerPagination';



class CustomerPageNavigation extends Component {


    render() {

        return (
            <>
                <div className='customer__page-navigation-row'>
                    <div className='col-12 customer__page-navigation'>
                        <div className="col-md-4 col-2">
                            <CustomerPerPage />
                        </div>
                        <div className="col-md-3 col-4">
                            <CustomerRangeRow />
                        </div>
                        <div className="col-md-2 col-3 mt-3">
                            <CustomerPagination />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default CustomerPageNavigation;