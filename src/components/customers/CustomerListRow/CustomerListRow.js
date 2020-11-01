import React, { Component } from 'react';
import './customerListRow.css';
import ListRowContext from '../../context/ListRowContext'
import Action from '../../common/Actions/Action'
import ActionDropDown from '../../common/DropDown/ActionDropDown'


class CustomersListRow extends Component {

    static contextType = ListRowContext

    onClick(event){
        event.preventDefault()
    }  

    render() {

        const customer = this.props.customer
        const id = this.props.customer.id
        const checked = this.props.isChecked ? 'checked' : customer.selected
        const menu = <Action customer={customer}/>

        return (
            <tr role="row" key={id}>
                <td className="dtr-control" tabIndex="0">
                    <div className="custom-control custom-checkbox text-center">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={this.context.onUpdateCheckedCustomers.bind(null, id)}
                            className="custom-control-input"
                            id={'customcheck' + id} />
                        <label
                            className="custom-control-label"
                            htmlFor={'customcheck' + id}></label>
                    </div>
                </td>
                <td onClick={this.props.onSelected}>
                    <div className="customer-id">
                        {customer.id}
                    </div>
                </td>
                <td onClick={this.props.onSelected}>
                    <div className="customer-fullname">
                        {customer.fullname}
                    </div>
                    <div className="customer-email">
                        {customer.email.toLowerCase()}
                    </div>
                </td>
                <td onClick={this.props.onSelected}
                    className='customer-status'>
                    {this.props.customer.active ?
                        <div className="badge badge-pill badge-soft-success font-size-12">
                            Active
                        </div>
                        :
                        <div className="badge badge-pill badge-soft-danger font-size-12">
                            Deactive
                        </div>
                    }
                    <div className="customer-last_login">
                        Last order: {customer.date}
                    </div>
                </td>
                <td>
                    <ActionDropDown menu={menu} onClick={this.onClick.bind(this)}/>
                </td>
            </tr>
        )
    }
}

export default CustomersListRow;