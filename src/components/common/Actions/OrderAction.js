import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaTrash, FaPen } from 'react-icons/fa';
import OrderListRowContext from '../../context/OrderListRowContext';
import { Menu } from 'antd';



class OrderAction extends Component {

    static contextType = OrderListRowContext;

    render() {
        return (
            <Menu>
                <Menu.Item>
                    <button
                        className="btn-edit"
                        onClick={this.context.onEditOrder.bind(null, this.props.order.id)}>
                        <IconContext.Provider value={{ color: '#5b73e8', className: 'icon-edit' }}>
                            <FaPen /> Edit
             </IconContext.Provider>
                    </button>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <button
                        className="btn-delete"
                        onClick={this.context.onDeleteOrder.bind(null, this.props.order.id)}>
                        <IconContext.Provider value={{ color: '#f46a6a', className: 'icon-delete' }}>
                            <FaTrash /> Delete
                     </IconContext.Provider>
                    </button>
                </Menu.Item>
            </Menu>
        ) 
    }
}


export default OrderAction;