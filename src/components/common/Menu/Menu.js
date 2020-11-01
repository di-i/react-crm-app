import React, { Component } from 'react';
import './menu.css';
import OffCanvas from 'react-aria-offcanvas'
import { MdClear, MdRestaurant } from 'react-icons/md'
import { IconContext } from 'react-icons'
import RouterNavLink from './RouterNavLinks'
import MenuButton from './MenuButton'
import MenuContext from '../../context/MenuContext'


class Menu extends Component {

    static contextType = MenuContext;

    render() {
        return (
            <>
                <MenuButton />
                <OffCanvas
                    isOpen={this.context.isOpen}
                    onClose={this.context.onCloseMenu.bind(this)}
                    labelledby='menu'
                >
                    <div className='menu-button-wrapper'>
                        <button
                            className='menu-button__close'
                            onClick={this.context.onCloseMenu.bind(this)}>
                            <IconContext.Provider value={{ size: '1.5em', className: 'md-clear', color: '#fff' }}>
                                <MdClear />
                            </IconContext.Provider>
                        </button>
                    </div>
                    <nav id='menu'>
                        <div className='logo'>
                            <IconContext.Provider value={{ size: '1em', className: 'md-restaurant', }}>
                                <MdRestaurant />
                            </IconContext.Provider>
                            COSTIC
                        </div>
                        <RouterNavLink />
                    </nav>
                </OffCanvas>
            </>
        )
    }
}


export default Menu;