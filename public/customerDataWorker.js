import orderBy from 'lodash.orderby';

this.addEventListener(
    'message',
    (e) => {
        const customersSet = e.data;
        const perPage = customersSet.perPage;
        const offset = customersSet.offset;
        const sortCol = customersSet.sortCol;
        const isSortAsc = customersSet.isSortAsc;
        const sortOrders = isSortAsc ? ['asc'] : ['desc'];
        const filteredCustomers = orderBy(customers, [sortCol], sortOrders).filter((customer) => {
            return (
                customer.fullname.toLowerCase().includes(this.state.searchText) ||
                customer.email.toLowerCase().includes(this.state.searchText) ||
                customer.date.toLowerCase().includes(this.state.searchText))
        }).slice(offset, offset + perPage);
        this.postMessage(filteredCustomers);
    },
    false,
)