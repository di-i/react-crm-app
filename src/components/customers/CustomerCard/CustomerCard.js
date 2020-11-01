import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import "shards-ui/dist/css/shards.min.css";
import {
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import './customerCard.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { IconContext } from 'react-icons'


class CustomerCard extends Component {

    onCloseHandler() {
        this.props.onClose()
    }


    render() {
        const customer = this.props.customer

        if (customer) {
            return (

                <Modal show={this.props.isShown} onHide={this.onCloseHandler.bind(this)}>
                    <CardHeader>
                        <div className='card-header-wrapper'>
                            <img src={customer.avatar} className='card__avatar' width="128" height="128" alt="Customer-Avatar" />
                            <CardTitle>
                                <div className='card__fullname'>{customer.fullname}</div>
                                <div className='card__job'>{customer.job} </div>
                                <div className='card__email'>{customer.email}</div>
                                <div className='card__phone'>{customer.phone}</div>
                                <div className='card-social'>
                                    <IconContext.Provider value={{ color: '#168eff', className: '' }}>
                                        <a href='https://facebook.com'><FaFacebook /></a>
                                        <a href='https://instagram.com'><FaInstagram /></a>
                                        <a href='https://twitter.com'> <FaTwitter /></a>
                                    </IconContext.Provider>
                                </div>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className='card-body-wrapper'>
                            <div className='card__address'>
                                <p>{customer.city}</p>
                                <p>{customer.street}</p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className='card-footer-wrapper'>
                            <Button outline theme='secondary' onClick={this.onCloseHandler.bind(this)}>
                                Close
                        </Button>
                        </div>
                    </CardFooter>
                </Modal>
            )
        } else {
            return (
                <div />
            )
        }
    }
}

export default CustomerCard;