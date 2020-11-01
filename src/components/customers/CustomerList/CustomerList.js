import React, { Component } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import '../customer.css'
import CustomersListRow from '../CustomerListRow/CustomerListRow';
import CustomerCheckboxAction from '../../common/Actions/CustomerCheckboxAction'
import CheckboxActionDropDown from '../../common/DropDown/CheckboxActionDropDown'



class CustomersList extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: false,
        }
    }

    onClick(event) {
        event.preventDefault();
    }

    renderTableCols() {
        let tableColElements = [{ 'id': 'ID' }, { 'fullname': 'Customer' }, { 'active': 'Status' }]
        return tableColElements.map((item) => {
            const key = Object.keys(item)[0]
            const isAsc = this.props.sortCol === key && this.props.isSortAsc;
            return <th
                key={key}
                onClick={this.props.onSort.bind(null, key, !isAsc)}>
                {item[key]} {this.renderIconSort(isAsc)}
            </th>
        });
    }


    renderIconSort(isAsc) {
        return isAsc ? <FaAngleUp /> : <FaAngleDown />
    }


    onChangeHandler = (event) => {
        let status = event.target.checked
        this.setState({
            isChecked: status
        })
        this.props.onCheckedAllHandler(this.state.isChecked)
    }


    renderTableRows() {
        let customers = this.props.customers
        return customers && customers.map((customer) => {
            const id = customer.id
            return <CustomersListRow
                key={id}
                customer={customer}
                onSelected={this.props.onSelectedRow.bind(this, id)}
                isChecked={this.state.isChecked}
                />
        })
    }


    render() {
        const name = 'customers'
        const menuCheckboxAction = <CustomerCheckboxAction name={name}/>

        return (
            <div className='tableData-wrapper'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='table-responsive'>
                                <table
                                    className='customer-table table table-centered table-nowrap mb-0'
                                >
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>
                                                <div className='custom-control custom-checkbox text-center'>
                                                    <input
                                                        type='checkbox'
                                                        value={this.state.isChecked}
                                                        onChange={this.onChangeHandler.bind(this)}
                                                        className='custom-control-input'
                                                        id='customercheck' />
                                                    <label
                                                        className='custom-control-label'
                                                        htmlFor='customercheck'></label>
                                                </div>
                                            </th>
                                            {this.renderTableCols()}
                                            <th> 
                                                <CheckboxActionDropDown 
                                                menuCheckboxAction={menuCheckboxAction}
                                                onClick={this.onClick.bind(this)}/>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CustomersList;