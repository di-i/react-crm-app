import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar'
import AddButton from '../AddButton/AddButton'
import './pageHeader.css'


class CustomerPageHeader extends Component {

    render() {

        return (
            <div className="page-header">
                <div className="row">
                    <div className="col-12 page-header__wrapper">
                        <SearchBar/>
                        <AddButton/>
                    </div>
                </div>
            </div>
        )
    }
}


export default CustomerPageHeader;