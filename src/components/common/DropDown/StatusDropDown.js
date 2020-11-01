import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { renderStatus } from '../../helpers/RenderStatus';
import '../../orders/OrderListRow/orderListRow.css'
import OrderListRowContext from '../../context/OrderListRowContext'


class StatusDropDown extends Component {

    static contextType = OrderListRowContext

    renderDropDown(status) {
        let statuses = ['On the Way', 'In Kitchen', 'Delivered', 'Undelivered', 'Delayed'];
        let changedStatuses = statuses.filter((item) => {
            return status !== item
        });
        return changedStatuses.map((status, index) => {
            return <Menu.Item key={index} className={`status-item ${renderStatus(status)}`}>
                <button onClick={this.context.onChangeStatus.bind(null, this.props.order.id, status)}>
                    {status}
                </button>
            </Menu.Item>

        });
    }


    render() {
     const order = this.props.order
        const menuStatus = <Menu>{this.renderDropDown(order.status)}</Menu>;

        return (
            <Dropdown
                overlay={menuStatus}
                placement="bottomLeft"
                trigger={['click']}
                arrow>
                <Button
                    className='order-actions'
                    type="text">
                    <span className={`badge ${renderStatus(order.status)} font-size-12`}>{order.status}</span>
                </Button>
            </Dropdown>
        ) 
    }
}


export default StatusDropDown;