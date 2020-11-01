import React, { Component } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import OrderPageNavigationContext from '../../context/OrderPageNavigationContext';

import './pageNavigation.css'


class OrderPagination extends Component {


    static contextType = OrderPageNavigationContext;


    render() {

        return (

            <ReactPaginate
                previousLabel={<MdNavigateBefore />}
                nextLabel={<MdNavigateNext />}
                breakLabel={'.'}
                breakClassName={'break-me'}
                pageCount={this.context.totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={this.context.onChangePage.bind(this)}
                containerClassName={'order__pagination'}
                subContainerClassName={'order__pagination'}
                activeClassName={'order__page-active'}
                forcePage={this.context.currentPage} />
        )
    }
}


export default OrderPagination;