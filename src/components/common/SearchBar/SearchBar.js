import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './searchBar.css';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import CustomerPageHeaderContext from '../../context/CustomerPageHeaderContext';


class SearchBar extends Component {

    static contextType = CustomerPageHeaderContext;

    constructor() {
        super();
        this.state = {
            searchText: '',
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)

    }

    onChangeHandler(event) {
        this.setState({
            searchText: event.target.value
        }, () => {
            this.context.onSearch(this.state.searchText);
        });
    }

    search() {
        this.context.onSearch(this.state.searchText);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.search();
    }

    render() {

        return (
            <form className="customer__search-form" onSubmit={this.onSubmitHandler}>
                <IconContext.Provider value={{ color: '#8B83BA', className: 'fa-search' }}>
                    <FaSearch />
                </IconContext.Provider>
                <input
                    type="search"
                    value={this.state.searchText}
                    onChange={this.onChangeHandler}
                    id="customer__search"
                    placeholder="Search" />
            </form>
        )
    }
}


export default SearchBar;