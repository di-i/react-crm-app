import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaTrash} from 'react-icons/fa'
import { Menu } from 'antd';
import OrderListRowContext from '../../context/OrderListRowContext';


class OrderCheckboxAction extends Component {

    static contextType = OrderListRowContext;

    render() {
         const name = this.props.name
        return (
            <Menu>
                <Menu.Item>
                    <IconContext.Provider value={{ color: '#f46a6a', className: 'icon-delete' }}>
                        <button
                            type="button"
                            className=""
                            onClick={this.context.onDeleteChecked.bind(this)}>
                            <FaTrash />
                            Delete checked {name}
                         </button>
                    </IconContext.Provider>
                </Menu.Item>
            </Menu>
        )
    }
}


export default OrderCheckboxAction;