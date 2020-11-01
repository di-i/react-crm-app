import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './orderForm.css';
import HelpersValidation from '../../helpers/Validation';


class OrderForm extends Component {

    constructor(props) {
        super(props);

        let fullname = null;
        let phone = null;
        let address = null;
        let city = null;
        let amount = null;
        let day = null;
        let status = null;
        let time = null;
        let item = null;
        let paid = null;
        let cardType = null;

        let order = this.props.order;

        if (order) {
            fullname = order.fullname;
            phone = order.phone;
            address = order.address;
            city = order.city;
            amount = order.amount;
            day = order.day;
            status = order.status;
            time = order.time;
            item = order.item;
            paid = order.paid;
            cardType = order.cardType;
        }

        this.state = {
            values: {
                fullname: fullname,
                phone: phone,
                address: address,
                city: city,
                amount: amount,
                day: day,
                status: status,
                time: time,
                item: item,
                paid: paid,
                cardType: cardType,

            },
            errorCount: null,
            errors: {
                fullname: '',
                phone: '',
                address: '',
                city: '',
                amount: '',
                time: '',
                item: '',
            }
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onCloseHandler = this.onCloseHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSaveHandler = this.onSaveHandler.bind(this)
    }

    isEditMode() {
        return !(this.props.order === null);
    }

    onCloseHandler() {
        this.props.onClose();
    }

    onSubmitHandler(event) {
        event.preventDefault();
    }

    onChangeHandler(event) {
        console.log(!!this.isEditMode())
        const { id, value } = event.target;
        let { errors, values } = this.state;
        values[id] = value;
        switch (id) {
            case 'fullname':
                errors.fullname =
                    HelpersValidation.isValidFullName(value)
                break;
            case 'phone':
                errors.phone =
                    HelpersValidation.isValidPhone(value)
                break;
            case 'address':
                errors.address =
                    HelpersValidation.isValidAddress(value)
                break;
            case 'city':
                errors.city =
                    HelpersValidation.isValidCity(value)
                break;
            case 'amount':
                errors.amount =
                    HelpersValidation.isValidNumber(value)
                break;
            case 'item':
                errors.item =
                    HelpersValidation.isValidNumber(value)
                break;
            case 'time':
                errors.time =
                    HelpersValidation.isValidTime(value)
                break;
            default:
                break;
        }
        this.setState({ errors, values });
    }

    onSaveHandler() {
        let { values } = this.state;
        let inputOrder = {
            fullname: values.fullname,
            phone: values.phone,
            address: values.address,
            city: values.city,
            amount: values.amount,
            day: values.day,
            status: values.status,
            time: values.time,
            item: values.item,
        }

        if (this.isEditMode()) {
            let { order } = this.props;
            inputOrder.id = this.props.order.id;
            let filteredOrder = obj => {
                Object.keys(obj).filter(key => obj[key] === null).forEach(key => delete (obj[key]))
                return obj
            }
            const ChangedOrder = { ...filteredOrder(order), ...filteredOrder(inputOrder) };
            this.props.onSaveOrder(ChangedOrder);
        } else {
            this.props.onSaveOrder(inputOrder);
        }
        this.clearForm();
    }

    clearForm() {
        this.setState({
            values: {
                fullname: null,
                phone: null,
                address: null,
                city: null,
                amount: null,
                time: null,
                item: null,
            }
        });
    }


    render() {
        const { order } = this.props;
        const { errors, values } = this.state;

        let isSaveDisabled = (this.isEditMode()) ? HelpersValidation.hasErrors(errors) : HelpersValidation.isSubmitDisabled(errors, values);

        let defFullName = '';
        let defPhone = '';
        let defAddress = '';
        let defCity = '';
        let defAmount = '';
        let defTime = '';
        let defItem = '';

        if (this.isEditMode()) {
            defFullName = order.fullname;
            defPhone = order.phone;
            defAddress = order.address;
            defCity = order.city;
            defAmount = order.amount;
            defItem = order.item;
            defTime = order.time
        }

        return (
            <div id='order-modalWindow'>
                <Modal show={this.props.isShown} onHide={this.onCloseHandler} className='order-modal'>
                    <Modal.Header className='order-modal__header' closeButton>
                        <Modal.Title className='order-modal__title'>{this.isEditMode() ? 'Edit order' : 'Create new order'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='order-modal__body'> <form onSubmit={this.onSubmitHandler}>
                        <div className='order-form-group form-group'>
                            <input type='text' className='order-form-input form-control' id='fullname' defaultValue={defFullName} placeholder='FullName' onChange={this.onChangeHandler} />
                            {errors.fullname.length > 0 &&
                                <span className='order-form-error'>{errors.fullname}</span>}
                        </div>
                        <div className='order-form-group form-group'>
                            <input type='phone' className='order-form-input form-control' id='phone' defaultValue={defPhone} placeholder='Phone' onChange={this.onChangeHandler} />
                            {errors.phone.length > 0 &&
                                <span className='order-form-error'>{errors.phone}</span>}
                        </div>
                        <div className='order-form-group form-group'>
                            <input className='order-form-input form-control' type='text' id='address' defaultValue={defAddress} placeholder='Street' onChange={this.onChangeHandler} />
                            {errors.address.length > 0 &&
                                <span className='order-form-error'>{errors.address}</span>}
                        </div>
                        <div className='order-form-group form-group'>
                            <input className='order-form-input form-control' type='text' id='order-city' defaultValue={defCity} placeholder='City' onChange={this.onChangeHandler} />
                            {errors.city.length > 0 &&
                                <span className='order-form-error'>{errors.city}</span>}
                        </div>
                        <div className='order-form-group form-group'>
                            <input className='order-form-input form-control' type='num' id='item' defaultValue={defItem} placeholder='Item' onChange={this.onChangeHandler} />
                            {errors.item.length > 0 &&
                                <span className='order-form-error'>{errors.item}</span>}
                        </div>
                        <div className='order-form-group form-group'>
                            <input className='order-form-input form-control' type='text' id='amount' defaultValue={defAmount} placeholder='Amount' onChange={this.onChangeHandler} />
                            {errors.amount.length > 0 &&
                                <span className='order-form-error'>{errors.amount}</span>}
                        </div>
                        <div className='select-wrapper'>
                            <div className='form-group-day'>
                                <label className='label-day'>
                                    Delivery day:
                                </label>
                                <select
                                    className='order-form-select form-control'
                                    id='day'
                                    defaultValue=''
                                    onChange={this.onChangeHandler}>
                                    <option value='' disabled>Select day</option>
                                    <option value='Today'>Today</option>
                                    <option value='Next Day'>Next Day</option>
                                </select>

                            </div>
                            <div className='form-group-status'>
                                <label className='label-status'>
                                    Delivery status:
                                </label>
                                <select
                                    className='order-form-select form-control'
                                    id='status'
                                    defaultValue=''
                                    onChange={this.onChangeHandler}>
                                    <option value='' disabled>Select status</option>
                                    <option value='In Kitchen'>In Kitchen</option>
                                    <option value='On the way'>On the way</option>
                                    <option value='Delivered'>Delivered</option>
                                    <option value='Undelivered'>Undelivered</option>
                                    <option value='Delayed'>Delayed</option>
                                </select>
                            </div>
                        </div>
                        <div className='select-wrapper'>
                            <div className='form-paid'>
                                <label className='status-paid'>
                                    Status Payment:
                                </label>
                                <select
                                    className='order-form-select form-control'
                                    id='paid'
                                    defaultValue=''
                                    onChange={this.onChangeHandler}>
                                    <option value='' disabled>Select</option>
                                    <option value='Paid'>Paid</option>
                                    <option value='Unpaid'>Unpaid</option>
                                </select>

                            </div>
                            <div className='form-group-status'>
                                <label className='card-type'>
                                    Card Type:
                                </label>
                                <select
                                    className='order-form-select form-control'
                                    id='cardType'
                                    defaultValue=''
                                    onChange={this.onChangeHandler}>
                                    <option value='' disabled>Select</option>
                                    <option value='MasterCard'>MasterCard</option>
                                    <option value='Visa'>Visa</option>
                                    <option value='PayPal'>PayPal</option>
                                </select>
                            </div>
                        </div>
                        <div className='order-form-group form-group'>
                            <input className='order-form-control form-control' type='text' id='time' defaultValue={defTime} placeholder='9:00 AM' onChange={this.onChangeHandler} />
                            {errors.time.length > 0 &&
                                <span className='order-form-error'>{errors.time}</span>}
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer className='order-modal-footer'>
                        <Button variant='secondary' onClick={this.onCloseHandler}>
                            Close
              </Button>
                        <Button className='order-modal__button' variant='primary' disabled={isSaveDisabled} onClick={this.onSaveHandler}>
                            Save Changes
              </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


export default OrderForm;