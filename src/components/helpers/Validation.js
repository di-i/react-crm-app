
class HelpersValidation {

    static countErrors = (errors) => {
        let count = 0;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (count = count + 1)
        );
        return count;
    }

    static isValidFullName = (value) => {
        return (
            value.length < 5
                ? 'Full Name must be 5 characters long!'
                : ''
        );
    }

    static isValidEmail = (value) => {
        const validEmailRegex = RegExp(/^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/)
        return (
            validEmailRegex.test(value) && value.length > 0
                ? ''
                : 'Email is not valid!'
        );
    }

    static isValidDate = (value) => {
        const validDateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
        return (
            validDateRegex.test(value) && value.length > 0
                ? ''
                : 'Date is not valid. Valid format is dd/mm/yyyy.'
        );
    }

    static isValidPhone = (value) => {
        const validPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return (
            validPhoneRegex.test(value) && value.length > 0
                ? ''
                : 'Phone is not valid.'
        );
    }

    static isValidAddress = (value) => {
        return (
            value.length < 5
                ? 'Address must be 5 characters long!'
                : ''
        );
    }

    static isValidNumber = (value) => {
        const valueAmountRegex = /^[0-9\b]+$/;
        return (
            valueAmountRegex.test(value) && value.length > 0
                ? ''
                : 'Field is not valid.'
        )
    }

    static isValidCity = (value) => {
        return (
            value.length < 5
                ? 'City must be 4 characters long!'
                : ''
        );
    }

    static isValidTime = (value) => {
        let valueTimeRegex = /\b((1[1-2]|0?[0-9]):([0-5][0-9]) ([AP][MM]))/;
        return (
            valueTimeRegex.test(value) && value.length > 0
                ? ''
                : 'Time is not valid.'
        )
    }

    static isValidJob = (value) => {
        return (
            value.length < 6
                ? 'Job must be 6 characters long!'
                : ''
        );
    }

    static isSubmitDisabled = (errors, values) => {
        return (!Object.values(errors).every(error => error.length === 0)
            || !Object.values(values).every(val => val !== null)
        );
    }

    static hasErrors = (errors) => {
        return !Object.values(errors).every(error => error.length === 0)
    }

    static hasNullValues = (values) => {
        return !Object.values(values).every(val => val !== null)
    }
}


export default HelpersValidation;
