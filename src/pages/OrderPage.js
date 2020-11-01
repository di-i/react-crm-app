
import React, { Component } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderCard from '../components/orders/OrderCard/OrderCard';
import orderBy from 'lodash.orderby';
import '../components/orders/order.css';
import OrderPageNavigation from '../components/common/PageNavigation/OrderPageNavigation'
import OrderForm from '../components/orders/OrderForm/OrderForm';
import EmptySearchList from '../components/common/SearchWithoutResults/EmptySearchList'
import OrderListRowContext from '../components/context/OrderListRowContext';
import OrderPageHeader from '../components/common/PageHeader/OrderPageHeader';
import OrderPageHeaderContext from '../components/context/OrderPageHeaderContext';
import OrderPageNavigationContext from '../components/context/OrderPageNavigationContext';
import HelpersGenerateData from '../components/helpers/GenerateData'
import EmptyTable from '../components/common/EmptyTable/EmptyTable'


class OrderPage extends Component {
    constructor() {
        super()

        this.state = {
            orders: [],
            orderSearchText: '',
            filteredOrders: [],
            selectedOrder: null,
            perPage: 10,
            currentPage: 0,
            offset: 0,
            sortCol: 'id',
            isSortAsc: true,
            isOrderCardShown: false,
            isOrderFormShown: false,
            lastOrderId: 30,
            checkedOrders: [],
            searchOrders: [],
        }

        this.worker = new Worker('orderDataWorker.js', { type: "module" });
        this.worker.addEventListener('message', (e) => {
            this.setState({
                filteredOrders: e.data
            });
        });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {

        this.setState({
            orders: HelpersGenerateData.generateDataCasual(),
        }, () => {
            this.filterOrders()
        });

    }

    filterOrders() {
        this.setState({
            filteredOrders: this.mainThreadSearch(),
        });
    }

    mainThreadSearch() {
        const orders = this.state.orders;
        const perPage = this.state.perPage;
        const offset = this.state.offset;
        const sortCol = this.state.sortCol;
        const isSortAsc = this.state.isSortAsc;
        const sortOrders = isSortAsc ? ['asc'] : ['desc'];
        let visibleOrders = orderBy(orders, [sortCol], sortOrders).filter(order => {
            return (
                order.fullname.toLowerCase().includes(this.state.orderSearchText) ||
                order.phone.toLowerCase().includes(this.state.orderSearchText) ||
                order.address.toLowerCase().includes(this.state.orderSearchText))
        });
        this.onShowSearchOrders(visibleOrders)
        let filteredOrders = visibleOrders.slice(offset, offset + perPage);
        return filteredOrders.map(order => {
            order.selected = this.state.checkedOrders.indexOf(order.id) !== -1;
            return order;
        });
    }

    filterOrdersInBackground() {

        const sortCol = this.state.sortCol;
        const isSortAsc = this.state.isSortAsc;
        const sortOrders = isSortAsc ? ['asc'] : ['desc'];
        const orders = this.state.orders;
        const perPage = this.state.perPage
        const currentPage = this.state.currentPage;
        const offset = currentPage * perPage;
        const ordersSet = {
            sortCol: sortCol,
            isSortAsc: isSortAsc,
            sortOrders: sortOrders,
            orders: orders,
            searchText: this.state.orderSearchText,
            offset: offset,
            perPage: perPage,
            currentPage: currentPage,
        };
        this.worker.postMessage(ordersSet);
    }

    onSelectedRowHandler(id) {
        this.setState({
            selectedOrder: id,
            isOrderCardShown: true,
        }, () => this.filterOrders());
    }

    /* =======================    Add / Edit order    ======================= */

    generateOrderId() {
        return this.state.lastOrderId + 1;
    }

    onCreateOrderHandler() {
        this.setState({
            selectedOrder: null,
            isOrderFormShown: true,
        });
    }

    onCloseOrderFormHandler() {
        this.closeOrderForm();
    }

    closeOrderForm() {
        this.setState({
            isOrderFormShown: false,
        });
    }

    onSaveOrderHandler(order) {
        if (order) {
            if (order.id === undefined) {
                order.id = this.generateOrderId()
                this.setState({
                    orders: this.state.orders.concat(order),
                    lastOrderId: order.id,
                }, () => {
                    this.filterOrders()
                });
            } else {
                this.setState({
                    orders: this.state.orders.map((obj) => {
                        return (order.id === obj.id) ? order : obj
                    })
                }, () => {
                    this.filterOrders();
                });
            }
        };
        this.setState({
            selectedOrder: null,
        })
        this.closeOrderForm();
    }

    onEditOrderHandler(id) {
        let selectedOrder = this.state.orders.find((order) => {
            return order.id === id;
        });
        this.setState({
            selectedOrder: selectedOrder,
            isOrderFormShown: true,
        }, () => {
            this.filterOrders()
        });
    }

    /* =======================  /  Add / Edit order    ======================= */


    /* =======================    Delete order    ======================= */

    onDeleteOrderHandler(id) {
        let changedOrders = this.state.orders.filter((order) => {
            return order.id !== id
        });
        this.setState({
            orders: [].concat(changedOrders)
        }, () => this.filterOrders());
    }

    /* =======================  /  Delete order    ======================= */


    /* =======================    Checkbox action    ======================= */

    onDeleteCheckedOrdersHandler() {
        let changedOrders = this.state.orders.filter((order) => {
            return this.state.checkedOrders.indexOf(order.id) < 0
        });
        if (this.state.checkedOrders.length === this.state.orders.length) {
            this.setState({
                orders: []
            }, () => this.filterOrders())
        } else {
            this.setState({
                orders: [].concat(changedOrders)
            }, () => this.filterOrders())
        }
    }

    onUpdateCheckedOrdersHandler(id) {
        this.setState(previous => {
            let checkedOrders = previous.checkedOrders
            let index = checkedOrders.indexOf(id)
            if (index === -1) {
                checkedOrders.push(id)
            } else {
                checkedOrders.splice(index, 1)
            } return checkedOrders
        }, () => this.filterOrders())
    }

    onCheckedAllHandler(isChecked) {
        if (!isChecked) {
            this.setState({
                checkedOrders: this.state.orders
            })
            this.onDeleteCheckedOrdersHandler()
        }
    }

    /* =======================   / Checkbox actions    ======================= */


    /* =======================    Status    ======================= */

    onChangeStatusHandler(id, changedStatus) {
        let orderId = this.state.orders.findIndex(order => order.id === id);
        let changedOrders = [...this.state.orders];
        changedOrders[orderId] = { ...this.state.orders[orderId], status: changedStatus };
        this.setState({
            orders: changedOrders,
        }, () => {
            this.filterOrders();
        });
    }

    /* =======================  / Status    ======================= */


    /* =======================    Search   ======================= */

    onSearchOrderHandler(value) {
        this.setState({
            orderSearchText: value.toLowerCase(),
        }, () => {
            this.filterOrders()
        });
        console.log(this.state.orderSearchText, 'orderSearchText')
        console.log(this.state.filteredOrders, 'this.state.filteredOrders')
    }

    onShowSearchOrders(visibleOrders) {
        this.setState({
            searchOrders: visibleOrders
        });
    }

    /* =======================  / Search    ======================= */


    /* =======================    Sort    ======================= */

    onSortHandler(sortCol, isSortAsc) {
        this.setState({
            sortCol: sortCol,
            isSortAsc: isSortAsc,
        }, () => {
            this.filterOrders();
        });
    }

    /* =======================   / Sort   ======================= */


    /* =======================    Card    ======================= */

    onCloseOrderCardHandler() {
        this.closeOrderCard();
    }

    closeOrderCard() {
        this.setState({
            isOrderCardShown: false,
        });
    }

    /* =======================  /  Card    ======================= */


    /* =======================     Page Navigation    ======================= */

    onChangePageHandler = (event) => {
        const selectedPage = event.selected;
        this.setState({
            currentPage: selectedPage,
            offset: selectedPage * this.state.perPage,
        }, () => {
            this.filterOrders();
        });
    }

    clearCurrentPage() {
        this.setState({
            currentPage: 0,
            offset: 0,
        })
    }

    onChangePerPageHandler = (event) => {
        this.setState({
            perPage: parseInt(event.target.value, 10)
        }, () => {
            this.filterOrders();
        });
        this.clearCurrentPage();
    }

    onSubmitPerPageHandler = (event) => {
        event.preventDefault();
        this.onChangePerPageHandler(this.state.perPage);
    }

    renderRangeOrders() {
        const { offset, perPage, searchOrders } = this.state
        const endIndex = offset + perPage;
        if (searchOrders.length === 0) {
            return `0 - 0 of 0`
        } else if (endIndex <= searchOrders.length) {
            return `${offset + 1} - ${endIndex} of ${searchOrders.length}`
        } else {
            return `${offset + 1} - ${searchOrders.length} of ${searchOrders.length}`
        }
    }

    /* =======================  / Page Navigation    ======================= */


    getSelectedOrder() {
        const order = this.state.orders.find(order => {
            return order.id === this.state.selectedOrder;
        });
        return order;
    }


    render() {
        const totalPages = Math.ceil(this.state.searchOrders.length / this.state.perPage);
        const visibleOrders = this.state.filteredOrders;
        const message = 'заказов'
        return (
            <OrderListRowContext.Provider value={{
                onDeleteOrder: this.onDeleteOrderHandler.bind(this),
                onEditOrder: this.onEditOrderHandler.bind(this),
                onChangeStatus: this.onChangeStatusHandler.bind(this),
                onUpdateCheckedOrders: this.onUpdateCheckedOrdersHandler.bind(this),
                onDeleteChecked: this.onDeleteCheckedOrdersHandler.bind(this),
            }}>
                <OrderPageHeaderContext.Provider value={{
                    onSearch: this.onSearchOrderHandler.bind(this),
                    onCreateHandler: this.onCreateOrderHandler.bind(this),
                }}>
                    <OrderPageNavigationContext.Provider value={{
                        onSubmitPerPage: this.onSubmitPerPageHandler.bind(this),
                        onChangePerPage: this.onChangePerPageHandler.bind(this),
                        perPage: this.state.perPage,
                        renderRange: this.renderRangeOrders.bind(this),
                        totalPages: totalPages,
                        onChangePage: this.onChangePageHandler.bind(this),
                        currentPage: this.state.currentPage,
                    }}>
                        <section className='order-page'>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className="col-sm-12">
                                        <div className='order-content'>
                                            <OrderPageHeader />
                                            <div className='order-content__body'>
                                                <OrderForm
                                                    key={this.state.orders.fullname}
                                                    isShown={this.state.isOrderFormShown}
                                                    onClose={this.onCloseOrderFormHandler.bind(this)}
                                                    onSaveOrder={this.onSaveOrderHandler.bind(this)}
                                                    order={this.state.selectedOrder}
                                                />
                                                {(this.state.searchOrders.length === 0 && this.state.orders.length !== 0) ?
                                                    <EmptySearchList />
                                                    :
                                                    (this.state.orders.length === 0) ? 
                                                    <EmptyTable message={message}/>
                                                    :
                                                    <OrderList
                                                        key={this.state.orders.id}
                                                        orders={visibleOrders}
                                                        onSelectedRow={this.onSelectedRowHandler.bind(this)}
                                                        sortCol={this.state.sortCol}
                                                        isSortAsc={this.state.isSortAsc}
                                                        onSort={this.onSortHandler.bind(this)}
                                                        onCheckedAllHandler={this.onCheckedAllHandler.bind(this)}
                                                    />}
                                                <OrderCard
                                                    isShown={this.state.isOrderCardShown}
                                                    onClose={this.onCloseOrderCardHandler.bind(this)}
                                                    order={this.getSelectedOrder()} />
                                                <OrderPageNavigation />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </section >
                    </OrderPageNavigationContext.Provider>
                </OrderPageHeaderContext.Provider>
            </OrderListRowContext.Provider>
        )
    }
}


export default OrderPage;