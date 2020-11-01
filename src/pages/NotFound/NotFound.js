import React, { Component } from 'react';
import './notFound.css'

class NotFound extends Component {

    render() {
        return (
            <div className='notfound-wrapper'>
                <div className='notfound'>
                    <div className='notfound-bg'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h2>Error 404 : Page Not Found</h2>
                    <h1>oops!</h1>
                </div>
            </div>
        )
    }
}

export default NotFound;