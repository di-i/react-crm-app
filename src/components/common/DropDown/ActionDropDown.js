import React, { Component } from 'react';
import {Dropdown, Button } from 'antd';
import { IconContext } from 'react-icons'
import { MdMoreVert } from 'react-icons/md'

class ActionDropDown extends Component {

    render(){

        return(
            <Dropdown
            overlay={this.props.menu}
            placement="bottomLeft"
            trigger={['click']}
            arrow>
            <Button
                className='order-actions'
                type="text">
                <IconContext.Provider
                    value={{ size: '2em', className: 'md-more' }}>
                    <MdMoreVert className="ant-dropdown-link" onClick={() => this.props.onClick.bind(this)} />
                </IconContext.Provider>
            </Button>
        </Dropdown>
        )
    }
}

export default ActionDropDown;