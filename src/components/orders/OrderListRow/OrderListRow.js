import React, { Component } from 'react';
import './orderListRow.css';
import OrderListRowContext from '../../context/OrderListRowContext';
import OrderAction from '../../common/Actions/OrderAction'
import ActionDropDown from '../../common/DropDown/ActionDropDown';
import StatusDropDown from '../../common/DropDown/StatusDropDown'


class OrderListRow extends Component {

    static contextType = OrderListRowContext;

    onClick(event) {
        event.preventDefault();
    }


    render() {

        let order = this.props.order;
        let id = this.props.order.id;
        let item = (this.props.order.item === 1) ? 'item' : 'items';
        const menu = <OrderAction key={order.fullname} order={order} />
        const checked = this.props.isChecked ? 'checked' : order.selected

        return (
            <tbody key={id}>
                <tr key={id}>
                    <td>
                        <div className='custom-control custom-checkbox'>
                            <input 
                            type='checkbox' 
                            className='custom-control-input'
                            id={'customcheck' + id} 
                            checked={checked}
                            onChange={this.context.onUpdateCheckedOrders.bind(null, id)}/>
                            <label className='custom-control-label'
                                htmlFor={'customcheck' + id}></label>
                        </div>
                    </td>

                    <td onClick={this.props.onSelected}>
                        <div className='order-id'>{'#00' + id}</div>
                        <div className='order-item'>{order.item} {item}</div>
                    </td>
                    <td onClick={this.props.onSelected}>
                        <div className='order-fullname'>{order.fullname}</div>
                        <div className='order-phone'>{order.phone}</div>
                    </td>
                    <td onClick={this.props.onSelected}>
                        <div className='order-day'>{order.day}</div>
                        <div className='order-time'>{order.time}</div>
                    </td>
                    <td onClick={this.props.onSelected}>
                        <div className='order-address'>{order.address}</div>
                        <div className='order-city'>{order.city}</div>
                    </td>
                    <td onClick={this.props.onSelected}>
                        <div className='order-amount'>{'$' + order.amount}</div>
                    </td>
                    <td>
                        <StatusDropDown order={order}/>
                    </td>
                    <td>
                        <ActionDropDown menu={menu} onClick={this.onClick.bind(this)} />
                    </td>
                </tr>
            </tbody>
        )
    }
}


export default OrderListRow;