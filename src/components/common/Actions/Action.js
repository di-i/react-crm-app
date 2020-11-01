import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaTrash, FaPen } from 'react-icons/fa';
import ListRowContext from '../../context/ListRowContext';
import { Menu } from 'antd';



class Action extends Component {

    static contextType = ListRowContext;

    renderActivate(customer) {

        if (customer.active) {
            return (
                <Menu.Item> <span className="menu-item-inactivate" onClick={this.context.onChangeStatus.bind(null, customer.id)}>
                    Inactivate User
                </span></Menu.Item>)
        } else {
            return (
                <Menu.Item>  <span className="menu-item-activate" onClick={this.context.onChangeStatus.bind(null, customer.id)}>
                    Activate User
                </span></Menu.Item>)
        }
    }



    render() {
        return (
            <Menu>
                <Menu.Item>
                    <button
                        className="btn-edit"
                        onClick={this.context.onEdit.bind(null, this.props.customer.id)}>
                        <IconContext.Provider value={{ color: '#5b73e8', className: 'icon-edit' }}>
                            <FaPen /> Edit
             </IconContext.Provider>
                    </button>
                </Menu.Item>
                {this.renderActivate(this.props.customer)}
                <Menu.Divider />
                <Menu.Item>
                    <button
                        className="btn-delete"
                        onClick={this.context.onDelete.bind(null, this.props.customer.id)}>
                        <IconContext.Provider value={{ color: '#f46a6a', className: 'icon-delete' }}>
                            <FaTrash /> Delete
                     </IconContext.Provider>
                    </button>
                </Menu.Item>
            </Menu>
        ) 
    }
}


export default Action;