import React, { Component } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import OrderListRow from './OrderListRow/OrderListRow';
import '../../index.css';
import OrderCheckboxAction from '../common/Actions/OrderCheckboxAction'
import CheckboxActionDropDown from '../common/DropDown/CheckboxActionDropDown'


class OrderList extends Component {

    constructor() {
        super();
        this.state = {
            isChecked: false,
        }
    }

    onClick(event) {
        event.preventDefault();
    }

    onChangeHandler = (event) => {
        let status = event.target.checked
        this.setState({
            isChecked: status
        })
        this.props.onCheckedAllHandler(this.state.isChecked)
    }

    renderCols() {

        let colsElements = [{ 'id': 'Order ID' }, { 'fullname': 'Customer Info' }, { 'day': 'Date' }, { 'address': 'Location' }, { 'amount': 'Amount' }, { 'status': 'Delivery Status' }];
        return colsElements.map((order => {
            const key = Object.keys(order)[0];
            const isAsc = this.props.sortCol === key && this.props.isSortAsc;
            return <th
                key={order[key]}
                onClick={this.props.onSort.bind(null, key, !isAsc)}>
                {order[key]} {this.renderIconSort(isAsc)}
            </th>
        }))
    }

    renderIconSort(isAsc) {
        return isAsc ? <FaAngleUp /> : <FaAngleDown />
    }

    renderRows() {
        let orders = this.props.orders;
        return orders && orders.map(order => {
            return <OrderListRow
                key={order.id}
                order={order}
                onSelected={this.props.onSelectedRow.bind(null, order.id)}
                isChecked={this.state.isChecked}
            />
        });
    }

    render() {

        const name = 'orders'
        const menuCheckboxAction = <OrderCheckboxAction name={name} />

        return (
            <div className="order-tableData-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <table
                                    className="order-table table table-centered table-nowrap mb-0"
                                >
                                    <thead className='thead-light'>
                                        <tr key={this.props.orders.length}>
                                            <th key={this.props.orders.id}>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        value={this.state.isChecked}
                                                        onChange={this.onChangeHandler.bind(this)}
                                                        id="customCheck1" />
                                                    <label className="custom-control-label"
                                                        htmlFor="customCheck1">&nbsp;</label>
                                                </div>
                                            </th>
                                            {this.renderCols()}
                                            <th>
                                               <CheckboxActionDropDown
                                                    menuCheckboxAction={menuCheckboxAction}
                                                    onClick={this.onClick.bind(this)} />
                                            </th>
                                        </tr>
                                    </thead>
                                    {this.renderRows()}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default OrderList;