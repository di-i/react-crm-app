import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import "shards-ui/dist/css/shards.min.css";
import { renderStatus } from '../../helpers/RenderStatus'
import {
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import { FaHome, FaCcMastercard, FaCcPaypal, FaCcVisa, FaTruck, FaDollarSign } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import './orderCard.css'

class OrderCard extends Component {

    renderPaymentMethod(cardType) {

        if (cardType === 'MasterCard') {
            return <FaCcMastercard />
        } else if (cardType === 'Visa') {
            return <FaCcVisa />
        } else {
            return <FaCcPaypal />
        }

    }

    renderAmountItem(item) {
        return item === 1 ? 'item' : 'items'
    }

    render() {
        const order = this.props.order

        if (order) {
            return (

                <Modal show={this.props.isShown} onHide={this.props.onClose.bind(this)}>
                    <CardHeader className='order-card__header'>
                        <CardTitle className='order-card__title'>
                            <p className='order-card__id'>
                                Order ID {'#00' + order.id}
                            </p>
                            <p className={`badge ${renderStatus(order.status)} font-size-12`}>
                                {order.status}
                            </p>
                        </CardTitle>
                    </CardHeader>
                    <CardBody className='order-card__body container'>
                        <div className='row'>
                            <div className='col-md-8 col-12 order-card__info'>
                                <div className='order-card__subtitle'>
                                    <IconContext.Provider value={{ size: '1.5em', color: '', className: 'fa-address' }}>
                                        <FaHome /><p>Info</p>
                                    </IconContext.Provider>
                                </div>
                                <div className='order-card__note'>
                                    <p className='order-card__fullname'>
                                        {order.fullname}
                                    </p>
                                    <p className='order-card__address'>
                                        {order.address}
                                    </p>
                                    <p className='order-card__city'>
                                        {order.city}
                                    </p>
                                    <p className='order-card__zip'>
                                        {order.zip}
                                    </p>
                                </div>
                            </div>
                            <div className='col-md-4 col-12 order-card__payment'>
                                <div className='order-card__subtitle'>
                                    <IconContext.Provider value={{ size: '1.5em' }}>
                                        {this.renderPaymentMethod(order.cardType)} <p>Payment</p>
                                    </IconContext.Provider>
                                </div>
                                <div className='order-card__note'>
                                    <p className='order-card__paid'>
                                        {order.paid}
                                    </p>
                                </div>
                            </div>
                            <div className='col-md-6 col-12 order-card__delivery'>
                                <div className='order-card__subtitle'>
                                    <IconContext.Provider value={{ size: '1.5em' }}>
                                        <FaTruck /><p>Delivery</p>
                                    </IconContext.Provider>
                                </div>
                                <div className='order-card__note'>
                                    <p className='order-card__day'>
                                        {order.day} {order.time}
                                    </p>
                                </div>
                            </div>
                            <div className='col-md-6 col-12 order-card__total'>
                                <div className='order-card__subtitle'>
                                    <IconContext.Provider value={{ size: '1.4em' }}>
                                        < FaDollarSign /><p>Amount</p>
                                    </IconContext.Provider>
                                </div>
                                <div className='order-card__note'>
                                    <p className='order-card__amount'>
                                        {order.item} {this.renderAmountItem()} :  ${order.amount}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </CardBody >
                    <CardFooter className='order-card__footer'>
                        <Button outline theme='secondary' onClick={this.props.onClose.bind(this)}>
                            Close
                        </Button>
                    </CardFooter>
                </Modal >
            )
        } else {
            return (
                <div />
            )
        }
    }
}

export default OrderCard;