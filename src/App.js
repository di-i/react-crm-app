import React, { Component } from 'react';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage'
import NotFound from './pages/NotFound/NotFound'
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Menu from './components/common/Menu/Menu';
import MenuContext from './components/context/MenuContext';


class App extends Component {

    state = {
        isOpen: false,
    }

    onOpenMenuHandler = () => {
        this.setState({ isOpen: true })
    }

    onCloseMenuHandler = () => {
        this.setState({ isOpen: false })
    }

    
    render() {
        return (
            <MenuContext.Provider value={{
                isOpen: this.state.isOpen,
                onOpenMenu: this.onOpenMenuHandler.bind(this),
                onCloseMenu: this.onCloseMenuHandler.bind(this)
            }}>
                <Router key={1}>
                    <Menu />
                    <Switch className='router-main'>
                        <Route key={'Customer'} path="/" component={CustomerPage} exact={true} />
                        <Route key={'Order'} path="/orders" component={OrderPage}  />
                        <Route component={NotFound} />
                    </Switch>
                </Router >
            </MenuContext.Provider>
        )
    }
}


export default App;