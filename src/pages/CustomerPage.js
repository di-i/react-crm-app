import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/customers/customer.css';
import orderBy from 'lodash.orderby';
import faker from 'faker';
import CustomersList from '../components/customers/CustomerList/CustomerList';
import CustomerForm from '../components/customers/CustomerForm/CustomerForm';
import CustomerCard from '../components/customers/CustomerCard/CustomerCard';
import EmptySearchList from '../components/common/SearchWithoutResults/EmptySearchList'
import CustomerPageHeader from '../components/common/PageHeader/CustomerPageHeader';
import CustomerPageNavigation from '../components/common/PageNavigation/CustomerPageNavigation';
import Loader from '../components/common/Loader/Loader';
import ListRowContext from '../components/context/ListRowContext';
import PageNavigationContext from '../components/context/PageNavigationContext';
import CustomerPageHeaderContext from '../components/context/CustomerPageHeaderContext';
import HelpersGenerateData from '../components/helpers/GenerateData';
import EmptyTable from '../components/common/EmptyTable/EmptyTable';



class CustomerPage extends Component {

  constructor() {
    super();

    this.state = {
      currentPage: 0,
      offset: 0,
      searchText: '',
      filteredCustomers: [],
      perPage: 10,
      sortCol: 'id',
      isSortAsc: true,
      isCustomerFormShown: false,
      isCustomerCardShown: false,
      selectedCustomer: null,
      lastCustomerId: 50,
      customers: [],
      checkedCustomers: [],
      isCheckedAll: false,
      searchCustomers: []
    }

    this.worker = new Worker('customerDataWorker.js', { type: "module" });
    this.worker.addEventListener('message', (e) => {
      this.setState({
        filteredCustomers: e.data
      });
    });

    this.onCustomerFormCloseHandler = this.onCustomerFormCloseHandler.bind(this)
    this.onSaveCustomerHandler = this.onSaveCustomerHandler.bind(this)
  }

  componentDidMount() {
    this.loadData();
  }

  generateCustomerId() {
    return this.state.lastCustomerId + 1;
  }

  loadData() {
    this.setState({
      customers: HelpersGenerateData.generateDataFaker(),
    }, () => {
      this.filterCustomers()
    });
  }

  mainThreadSearch() {
    const customers = this.state.customers;
    const perPage = this.state.perPage;
    const offset = this.state.offset;
    const sortCol = this.state.sortCol;
    const isSortAsc = this.state.isSortAsc;
    const sortOrders = isSortAsc ? ['asc'] : ['desc'];
    const visibleCustomers = orderBy(customers, [sortCol], sortOrders).filter((customer) => {
      return (
        customer.fullname.toLowerCase().includes(this.state.searchText) ||
        customer.email.toLowerCase().includes(this.state.searchText) ||
        customer.date.includes(this.state.searchText))
    });
    this.onChangeSearchCustomers(visibleCustomers);
    let filteredCustomers = visibleCustomers.slice(offset, offset + perPage);
    return filteredCustomers.map(customer => {
      customer.selected = this.state.checkedCustomers.indexOf(customer.id) !== -1;
      return customer;
    });

  }

  filterCustomers() {
    this.setState({
      filteredCustomers: this.mainThreadSearch(),
    });
  }

  filterCustomersInBackground() {

    const sortCol = this.state.sortCol;
    const isSortAsc = this.state.isSortAsc;
    const sortOrders = isSortAsc ? ['asc'] : ['desc'];
    const customers = this.state.customers;
    const perPage = this.state.perPage
    const currentPage = this.state.currentPage;
    const offset = this.state.offset;
    const customersSet = {
      sortCol: sortCol,
      isSortAsc: isSortAsc,
      sortOrders: sortOrders,
      customers: customers,
      searchText: this.state.searchText,
      offset: offset,
      perPage: perPage,
      currentPage: currentPage,
    };
    this.worker.postMessage(customersSet);
  }


  getSelectedCustomer() {
    const customer = this.state.customers.find(customer => {
      return customer.id === this.state.selectedCustomer;
    });
    return customer;
  }


  /* =======================    Sort    ======================= */


  onSortHandler(sortCol, isSortAsc) {
    this.setState({
      sortCol: sortCol,
      isSortAsc: isSortAsc
    }, () => {
      this.filterCustomers()
    });
  }

  /* =======================  /  Sort    ======================= */


  /* =======================     Page Navigation    ======================= */

  onChangePageHandler = (event) => {
    const selectedPage = event.selected
    this.setState({
      currentPage: selectedPage,
      offset: selectedPage * this.state.perPage,
    }, () => {
      this.filterCustomers()
    });
  }


  clearCurrentPage() {
    this.setState({
      currentPage: 0,
      offset: 0
    })
  }


  onChangePerPageHandler = (event) => {
    this.setState({
      perPage: parseInt(event.target.value, 10),
    }, () => {
      this.filterCustomers()
    });
    this.clearCurrentPage()
  }


  onSubmitPerPageHandler = (event) => {
    event.preventDefault();
    this.onChangePerPageHandler(this.state.perPage);
  }


  renderRangeCustomers() {
    const { offset, perPage, searchCustomers } = this.state
    const endIndex = offset + perPage;
    if (searchCustomers.length === 0) {
      return `0 - 0 of 0`
    } else if (endIndex <= searchCustomers.length) {
      return `${offset + 1} - ${endIndex} of ${searchCustomers.length}`
    } else {
      return `${offset + 1} - ${searchCustomers.length} of ${searchCustomers.length}`
    }
  }


  /* =======================  /   Page Navigation    ======================= */


  /* =======================  Add / Edit Customer    ======================= */


  onSaveCustomerHandler(customer) {
    if (customer) {
      if (customer.id === undefined) {
        customer.id = this.generateCustomerId()
        customer.avatar = faker.image.avatar()
        this.setState({
          customers: this.state.customers.concat(customer),
          lastCustomerId: customer.id,
        }, () => {
          this.filterCustomers();
        });
      } else {
        this.setState({
          customers: this.state.customers.map((obj) => {
            return (customer.id === obj.id) ? customer : obj
          })
        }, () => {
          this.filterCustomers();
        });
      }
    };
    this.setState({
      selectedCustomer: null,
    })
    this.closeCustomerForm();
  }

  onEditCustomerHandler(id) {
    let selectedCustomer = this.state.customers.find((customer) => {
      return customer.id === id;
    });
    this.setState({
      selectedCustomer: selectedCustomer,
      isCustomerFormShown: true,
    }, () => {
      this.filterCustomers();
    });
  }


  /* =======================  / Add / Edit Customer   ======================= */


  /* =======================  Form   ======================= */


  onCreateCustomerHandler() {
    this.setState({
      selectedCustomer: null,
      isCustomerFormShown: true,
      isEdited: false,
    });
  }

  onCustomerFormCloseHandler() {
    this.closeCustomerForm();
  }

  closeCustomerForm() {
    this.setState({
      isCustomerFormShown: false,
    });
  }


  /* ============================ / Form   ============================ */


  /* ============================   Search   ============================ */


  onSearchHandler(value) {
    this.setState({
      searchText: value.toLowerCase()
    }, () => {
      this.filterCustomers()
    });
  }

  onChangeSearchCustomers(visibleCustomers) {
    this.setState({
      searchCustomers: visibleCustomers
    });
  }


  /* ============================  /  Search   ============================ */


  onChangeStatusHandler(id) {
    const customerIndex = this.state.customers.findIndex(customer => customer.id === id)
    let changedCustomers = [...this.state.customers]
    changedCustomers[customerIndex] = { ...changedCustomers[customerIndex], active: !changedCustomers[customerIndex].active }
    this.setState({
      customers: changedCustomers,
    }, () => this.filterCustomers())
  }


  /* =======================   Delete Customer   ======================= */


  onDeleteCustomerHandler(id) {
    let changedCustomers = this.state.customers.filter((customer) => {
      return customer.id !== id
    });
    this.setState({
      customers: [].concat(changedCustomers)
    }, () => this.filterCustomers());

  }


  /* =======================  / Delete Customer   ======================= */


  /* =======================    Checkbox actions    ======================= */


  onDeleteCheckedCustomersHandler() {
    let changedCustomers = this.state.customers.filter((customer) => {
      return this.state.checkedCustomers.indexOf(customer.id) < 0
    });
    if (this.state.checkedCustomers.length === this.state.customers.length) {
      this.setState({
        customers: []
      }, () => this.filterCustomers())
    } else {
      this.setState({
        customers: [].concat(changedCustomers)
      }, () => this.filterCustomers())
    }
  }

  onUpdateCheckedCustomersHandler(id) {
    this.setState(previous => {
      let checkedCustomers = previous.checkedCustomers
      let index = checkedCustomers.indexOf(id)
      if (index === -1) {
        checkedCustomers.push(id)
      } else {
        checkedCustomers.splice(index, 1)
      } return checkedCustomers
    }, () => this.filterCustomers())
  }


  onCheckedAllHandler(isChecked) {
    if (!isChecked) {
      this.setState({
        checkedCustomers: this.state.customers
      })
      this.onDeleteCheckedCustomersHandler()
    }
  }


  /* =======================   / Checkbox actions    ======================= */


  /* ============================   Card   ============================ */


  onCustomerCardCloseHandler() {
    this.closeCustomerCard();
  }


  closeCustomerCard() {
    this.setState({
      isCustomerCardShown: false,
    });
  }


  onSelectedRowHandler(id) {
    this.setState({
      selectedCustomer: id,
      isCustomerCardShown: true,
    });
  }

  /* ============================  /  Card   ============================ */


  render() {
    const name = 'customers'
    const message = 'пользователей'
    const totalPages = Math.ceil(this.state.searchCustomers.length / this.state.perPage);
    const visibleCustomers = this.state.filteredCustomers
    const selectedCustomer = this.state.selectedCustomer
    const sortCol = this.state.sortCol;
    const isSortAsc = this.state.isSortAsc;


    return (
      <ListRowContext.Provider value={{
        onDelete: this.onDeleteCustomerHandler.bind(this),
        onEdit: this.onEditCustomerHandler.bind(this),
        onChangeStatus: this.onChangeStatusHandler.bind(this),
        onUpdateCheckedCustomers: this.onUpdateCheckedCustomersHandler.bind(this),
        onDeleteChecked: this.onDeleteCheckedCustomersHandler.bind(this),
      }}>
        <CustomerPageHeaderContext.Provider value={{
          onSearch: this.onSearchHandler.bind(this),
          onCreateHandler: this.onCreateCustomerHandler.bind(this),
        }}>
          <PageNavigationContext.Provider value={{
            onSubmit: this.onSubmitPerPageHandler.bind(this),
            onChangePerPage: this.onChangePerPageHandler.bind(this),
            perPage: this.state.perPage,
            renderRange: this.renderRangeCustomers.bind(this),
            totalPages: totalPages,
            onChangePage: this.onChangePageHandler.bind(this),
            name: { name }
          }}>
            <section className="page-content">
              <div className="container-fluid">
                <div className="main-wrapper">
                  <div className="row">
                    <div className="col-12">
                      <CustomerForm
                        key={this.state.customers.fullname}
                        isShown={this.state.isCustomerFormShown}
                        onClose={this.onCustomerFormCloseHandler}
                        onSaveCustomer={this.onSaveCustomerHandler}
                        customer={selectedCustomer}
                      />
                    </div>
                  </div>
                  <CustomerPageHeader key={this.state.customers} />
                  {this.state.isLoading
                    ? <Loader />
                    : <React.Fragment>
                      <section className="content-wrapper">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-12 table-wrapper">
                              <div className="table-responsive mb-4">
                                {this.state.searchCustomers.length === 0 && this.state.customers.length !== 0 ?
                                  <EmptySearchList />
                                  :
                                  (this.state.customers.length === 0) ? 
                                  <EmptyTable message={message}/>
                                  :
                                  <CustomersList
                                    customers={visibleCustomers}
                                    onSelectedRow={this.onSelectedRowHandler.bind(this)}
                                    sortCol={sortCol}
                                    isSortAsc={isSortAsc}
                                    onSort={this.onSortHandler.bind(this)}
                                    onCheckedAllHandler={this.onCheckedAllHandler.bind(this)}
                                  />}

                                <CustomerCard
                                  isShown={this.state.isCustomerCardShown}
                                  onClose={this.onCustomerCardCloseHandler.bind(this)}
                                  customer={this.getSelectedCustomer()} />
                              </div>
                              <CustomerPageNavigation />
                            </div>
                          </div>
                        </div>
                      </section>
                    </React.Fragment>}
                </div>
              </div>
            </section>
          </PageNavigationContext.Provider>
        </CustomerPageHeaderContext.Provider>
      </ListRowContext.Provider>
    );
  }
}


export default CustomerPage;
