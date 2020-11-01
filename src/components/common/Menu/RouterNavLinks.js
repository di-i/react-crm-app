import React, { Component } from 'react';
import './menu.css';
import {
    NavLink,
} from 'react-router-dom';
import {MdGroup, MdAssignment} from 'react-icons/md'
import { IconContext } from 'react-icons'


class RouterNavLink extends Component {

    render() {
        
        return (
            <>
                <NavLink
                    exact
                    activeClassName='active-navlink-customer'
                    className='router-link-customer'
                    to='/'>
                    <IconContext.Provider value={{ size: '1.5em', className: 'md-group' }}>
                        <MdGroup />
                    </IconContext.Provider>
                    Customers
                </NavLink>
                    { ' '}
                <NavLink
                    activeClassName='active-navlink-order'
                    className='router-link-order'
                    to='/orders'>
                    <IconContext.Provider value={{ size: '1.5em', className: 'md-assignment' }}>
                        <MdAssignment />
                    </IconContext.Provider>
                        Orders
                </NavLink>
                    { ' '}
            </>
        )
    }
}


export default RouterNavLink;