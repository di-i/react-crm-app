 import casual from 'casual-browserify';
 import faker from 'faker';

class HelpersGenerateData {


    static generateId(value) {
        return value + 1;
    }


    static generateRandomDate(start, end) {
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }


    static generateDataFaker() {
        let generateCustomers = [];
        for (let id = 1; id <= 50; id++) {

            let fullname = faker.name.findName();
            let email = faker.internet.email();
            let phone = faker.phone.phoneNumberFormat();
            let avatar = faker.image.avatar();
            let date = this.generateRandomDate(new Date(2020, 0, 1), new Date());
            let active = faker.random.boolean()
            let city = faker.address.city()
            let street = faker.address.streetAddress()
            let job = faker.name.jobTitle()

            generateCustomers.push({
                'id': id,
                'fullname': fullname,
                'email': email,
                'phone': phone,
                'date': date,
                'avatar': avatar,
                'active': active,
                'city': city,
                'street': street,
                'job': job,
            });
        }

        return generateCustomers;

    }

    static generateDataCasual() {
        let generatedOrders = [];

        for (let id = 1; id <= 30; id++) {
            let item = casual.integer(1, 10);
            let fullname = casual.full_name;
            let phone = casual.phone;
            let day = casual.random_element(['Today', 'Next Day']);
            let time = casual.time('LT');
            let address = casual.address1;
            let city = casual.city;
            let amount = casual.integer(20, 200);
            let status = casual.random_element(['On the Way', 'In Kitchen', 'Delivered', 'Undelivered', 'Delayed']);
            let paid = casual.random_element(['Paid', 'Unpaid']);
            let cardType = casual.random_element(['MasterCard', 'Visa', 'PayPal'])


            generatedOrders.push({
                'id': id,
                'fullname': fullname,
                'item': item,
                'phone': phone,
                'day': day,
                'time': time,
                'address': address,
                'city': city,
                'amount': amount,
                'status': status,
                'paid': paid,
                'cardType': cardType,
            });
        }
        return generatedOrders;
    }
}


export default HelpersGenerateData;