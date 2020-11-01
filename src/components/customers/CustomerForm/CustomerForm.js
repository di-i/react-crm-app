import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './customerForm.css';
import HelpersValidation from '../../helpers/Validation';


class CustomersForm extends Component {

    constructor(props) {
        super(props);

        let fullname = null;
        let email = null;
        let date = null;
        let phone = null;
        let job = null;
        let city = null;
        let street = null;

        let customer = this.props.customer;

        if (customer) {
            fullname = customer.fullname;
            email = customer.email;
            date = customer.date;
            phone = customer.phone;
            job = customer.job;
            city = customer.city;
            street = customer.street;
        }

        this.state = {
            values: {
                fullname: fullname,
                email: email,
                date: date,
                phone: phone,
                job: job,
                city: city,
                street: street,
            },
            errorCount: null,
            errors: {
                fullname: '',
                email: '',
                date: '',
                phone: '',
                job: '',
                city: '',
                street: '',
            }
        }

        this.onCloseHandler = this.onCloseHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSaveHandler = this.onSaveHandler.bind(this)
    }

    onSaveHandler() {
        let { values } = this.state;
        let inputCustomer = {
            fullname: values.fullname,
            email: values.email,
            date: values.date,
            phone: values.phone,
            job: values.job,
            city: values.city,
            street: values.street,

        }

        if (this.isEditMode()) {
            let { customer } = this.props;
            inputCustomer.id = customer.id
            let filteredCustomer = obj => {
                Object.keys(obj).filter(key => obj[key] === null).forEach(key => delete (obj[key]))
                return obj
            }
            const ChangedCustomer = { ...filteredCustomer(customer), ...filteredCustomer(inputCustomer) }
            this.props.onSaveCustomer(ChangedCustomer)
        } else {
            this.props.onSaveCustomer(inputCustomer)
        }
        this.clearForm()
    }

    isEditMode() {
        return !(this.props.customer === null);
    }

    onChangeHandler(event) {
        const { id, value } = event.target;
        let { errors, values } = this.state;
        values[id] = value;
        switch (id) {
            case 'fullname':
                errors.fullname =
                    HelpersValidation.isValidFullName(value)
                break;
            case 'email':
                errors.email =
                    HelpersValidation.isValidEmail(value)
                break;
            case 'date':
                errors.date =
                    HelpersValidation.isValidDate(value)
                break;
            case 'phone':
                errors.phone =
                    HelpersValidation.isValidPhone(value)
                break;
            case 'city':
                errors.city =
                    HelpersValidation.isValidCity(value)
                break;
            case 'street':
                errors.street =
                    HelpersValidation.isValidAddress(value)
                break;
            case 'job':
                errors.job =
                    HelpersValidation.isValidJob(value)
                break;
            default:
                break;
        }

        this.setState({ errors, values });
    }

    onCloseHandler() {
        this.clearForm();
        this.props.onClose();
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({ errorCount: HelpersValidation.countErrors(this.state.errors) });
    }

    clearForm() {
        this.setState({
            values: {
                fullname: null,
                email: null,
                date: null,
                phone: null,
                job: null,
                city: null,
                street: null,
            }
        });
    }

    render() {

        const { errors, values } = this.state;
        const { customer } = this.props;

        let isSaveDisabled = (this.isEditMode()) ? HelpersValidation.hasErrors(errors) : HelpersValidation.isSubmitDisabled(errors, values);

        let defaultFullName = '';
        let defaultEmail = '';
        let defaultDate = '';
        let defaultCity = '';
        let defaultPhone = '';
        let defaultStreet = '';
        let defaultJob = '';

        if (this.isEditMode()) {
            defaultFullName = customer.fullname;
            defaultEmail = customer.email;
            defaultDate = customer.date;
            defaultCity = customer.city;
            defaultPhone = customer.phone;
            defaultStreet = customer.street;
            defaultJob = customer.job;
        }

        return (
            <Modal show={this.props.isShown} onHide={this.onCloseHandler} className='customer-modal'>
                <Modal.Header closeButton className='customer-modal__header'>
                    <Modal.Title className='customer-modal__title'>{this.isEditMode() ? 'Edit customer' : 'Create new customer'}</Modal.Title>
                </Modal.Header >
                <Modal.Body className='customer-modal__body'>
                    <form onSubmit={this.onSubmitHandler} noValidate>
                        <div className='customer-form-group form-group'>
                            <input type='text' className='customer-form-input  form-control' id='fullname' defaultValue={defaultFullName} placeholder='FullName' onChange={this.onChangeHandler} noValidate />
                            {errors.fullname.length > 0 &&
                                <span className='customer-form-error'>{errors.fullname}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input type='text' className='customer-form-input form-control' id='email' defaultValue={defaultEmail} placeholder='Email' onChange={this.onChangeHandler} noValidate />
                            {errors.email.length > 0 &&
                                <span className='customer-form-error'>{errors.email}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input className='customer-form-input  form-control' type='phone' id='phone' defaultValue={defaultPhone} placeholder='000-000-0000' onChange={this.onChangeHandler} noValidate />
                            {errors.phone.length > 0 &&
                                <span className='customer-form-error'>{errors.phone}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input className='customer-form-input  form-control' type='text' id='date' defaultValue={defaultDate} placeholder='00/00/0000' onChange={this.onChangeHandler} noValidate />
                            {errors.date.length > 0 &&
                                <span className='customer-form-error'>{errors.date}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input type='text' className='customer-form-input  form-control' id='city' defaultValue={defaultCity} placeholder='City' onChange={this.onChangeHandler} noValidate />
                            {errors.city.length > 0 &&
                                <span className='customer-form-error'>{errors.city}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input type='text' className='customer-form-input  form-control' id='street' defaultValue={defaultStreet} placeholder='Street' onChange={this.onChangeHandler} noValidate />
                            {errors.street.length > 0 &&
                                <span className='customer-form-error'>{errors.street}</span>}
                        </div>
                        <div className='customer-form-group form-group'>
                            <input type='text' className='customer-form-input  form-control' id='job' defaultValue={defaultJob} placeholder='Job' onChange={this.onChangeHandler} noValidate />
                            {errors.job.length > 0 &&
                                <span className='customer-form-error'>{errors.job}</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.onCloseHandler}>
                        Close
          </Button>
                    <Button variant='primary' disabled={isSaveDisabled} onClick={this.onSaveHandler}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default CustomersForm;
