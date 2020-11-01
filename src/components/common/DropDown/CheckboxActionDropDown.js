import React, { Component } from 'react';
import { Dropdown, Button } from 'antd';
import { IconContext } from 'react-icons'
import { MdMoreVert } from 'react-icons/md'

class CheckboxActionDropDown extends Component {

    render() {

        return (
            <Dropdown
                overlay={this.props.menuCheckboxAction}
                placement="bottomLeft"
                arrow
                trigger={['click']}>
                <Button
                    type="text">
                    <IconContext.Provider
                        value={{ size: '2.5em', className: 'md-more' }}>
                        <MdMoreVert
                            className="ant-dropdown-link"
                            onClick={this.props.onClick.bind(this)} />
                    </IconContext.Provider>
                </Button>
            </Dropdown>
        )
    }
}


export default CheckboxActionDropDown;