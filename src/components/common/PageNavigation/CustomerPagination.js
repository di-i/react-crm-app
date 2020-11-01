import React, { Component } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import PageNavigationContext from '../../context/PageNavigationContext';
import './pageNavigation.css';


class CustomerPagination extends Component {

    static contextType = PageNavigationContext;

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
                onPageChange={this.context.onChangePage}
                containerClassName={'customer__pagination'}
                subContainerClassName={'customer__pagination'}
                activeClassName={'customer__page-active'} />
        )
    }
}


export default CustomerPagination;