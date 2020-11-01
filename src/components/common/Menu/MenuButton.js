import React, { Component } from 'react';
import './menu.css';
import MenuContext from '../../context/MenuContext'
import { FaBars, } from 'react-icons/fa'
import { IconContext } from 'react-icons'


class MenuButton extends Component {

    static contextType = MenuContext;

    render() {
        return (
            <button
                id="menu-button__open"
                aria-label='Menu'
                aria-controls='menu'
                aria-expanded={this.context.isOpen}
                onClick={this.context.onOpenMenu.bind(this)}
            >
                <IconContext.Provider value={{ size: '2em', className: 'fa-bars' }}>
                    <FaBars />
                </IconContext.Provider>
            </button>
        )
    }
}


export default MenuButton;