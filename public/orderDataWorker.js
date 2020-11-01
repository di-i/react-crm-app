import orderBy from 'lodash.orderby';

this.addEventListener(
    'message',
    (e) => {
        const ordersSet = e.data;
        const perPage = ordersSet.perPage;
        const offset = ordersSet.offset;
        const sortCol = ordersSet.sortCol;
        const isSortAsc = ordersSet.isSortAsc;
        const sortOrders = isSortAsc ? ['asc'] : ['desc'];
        const filteredOrders = orderBy(orders, [sortCol], sortOrders).filter((customer) => {
            return (
                order.fullname.toLowerCase().includes(this.state.searchText) ||
                order.phone.toLowerCase().includes(this.state.searchText) ||
                order.address.toLowerCase().includes(this.state.searchText))
        }).slice(offset, offset + perPage);
        this.postMessage(filteredOrders);
    },
    false,
)