import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ActionBar from './components/customer/sidebar/actionbar.js';
import TransactionBar from './components/customer/sidebar/Transactionbar.js';
import Container from 'react-bootstrap/Navbar'
import { Switch, Route, Link } from 'react-router-dom';
import MainPage from './components/customer/item/itemPage.js';
import ItemDetail from './components/customer/item/itemDetail.js';
import Login from './components/customer/account/login.js';
import Signup from './components/customer/account/signup.js';
import CartPage from './components/customer/cart/cartpage.js';
import CartOrderPage from './components/customer/order/cartOrderPage.js';
import OrderView from './components/customer/order/orderView.js';
import AccountItem from './components/customer/account/accountOptions.js';
import SearchResult from './components/customer/search/searchResult.js';
import ProductService from './services/product.js';
import ControlService from './services/control.js';
import CategoryPage from './components/customer/category/categoryPage.js'
import CategoryList from './components/customer/category/categoryList.js'
import ItemOrderPage from './components/customer/order/orderItemPage.js';
import Chatbot from './components/customer/chatbot/chatbot.js';
import ChangePassword from './components/customer/account/changePassword.js'
import EditProfile from './components/customer/account/editProfile.js'
import {Form, FormControl, Nav, Navbar, Row} from 'react-bootstrap';

class App extends Component{
  state = {
    loginState: false,
    seeAction: false,
    seeTransaction: false,
    items: [],
    recent: [],
    cart: [],
    item: [],
    orders: [],
    ordered_items: [],
    order: [],
    user: null,
    token: null,
    notifications: [],
    transactions: [],
    udata: [],
    oid: null,
    category: [],
    categoryItems: [],
    error: null,
    id: 0,
    name: "",
  }
  initState(){
    this.setState({orders: []})
    this.setState({ordered_items: []})
  }
  

  componentDidMount(){
    this.getProducts();
    this.getCategory();
    this.getRecent();
    
  }

  updateAll=(id)=>{
    this.getUserDetail(id)
  }
  onUserLoggedIn=(id, oid)=>{
    this.getUserDetail(id)
    this.getOrders(id)
    this.getNotifs()
    this.getTransaction()
  }
  updateNotifications=()=>{
    this.getNotifs()
    this.getTransaction()
  }
  onUserUpdated=()=>{
    let id = this.state.udata.id
    this.getUserDetail(id)
    this.getNotifs()
    this.getTransaction()

 }
 updateOrders=()=>{
  let id = this.state.udata.id
  this.getOrders(id)
 }
 updateCart=()=>{
    this.setState({cart: []})
 }
  async getUserDetail(id){
    let token = this.state.token
    ProductService.getUserProfile(token, id).then(res=>{
      this.setState({udata: res.data})
    }).catch(err=>{
      alert(err.toString())
    })
  }

  async getNotifs(){
    let token = this.state.token
    ProductService.getNotifications(token).then(res=>{
          this.setState({notifications: res.data})         
    }).catch(err=>{
      alert(err.toString())
    })
  }

  async getTransaction(){
    let token = this.state.token
    ProductService.getTransactions(token).then(res=>{
          this.setState({transactions: res.data})         
    }).catch(err=>{
      alert(err.toString())
    })
  }

  async getRecent(){
    ProductService.recent().then(res=>{
      this.setState({recent: res.data})
    }).catch(err=>{
      alert(err.toString())
    })
  }

  async getProducts(){
    ProductService.home().then(res=>{
      this.setState({items: res.data});
    }).catch(err=>{
      console.log(err);
    });
  }

  async getCategory(){
    ProductService.getCategory().then(res=>{
      this.setState({category: res.data});
    }).catch(err=>{
      alert(err.toString())
      console.log(err);
    });
  }

  async getOrders(id){
    let token = this.state.token
    try{
      let data = {
      "uid": id,
    }
    ProductService.viewOrders(token, data).then(res=>{
      this.setState({orders: res.data.order})
      //alert(res.data.message)
      let status = res.data.status 
      if (status===1) {
          let items = res.data.items
          let s = ControlService.OrderItemMap(items)
          this.setState({ordered_items: s})         
      }
    }).catch(err=>{
      console.log(err.toString())
    })
  }catch(e){
    console.log(e.toString())
  }
    
  }

  onCategorySelected=(categoryId)=>{
    this.setState({id: categoryId});
  }

  handleAddToCart=(item)=>{
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  }

  onRemoveOne=(item)=>{
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    });
  }

  onOrderCart=(items)=>{
    this.setState({order: items});
  }
  
  onOrderItem=(item)=>{
    this.setState({order: item});
  }

  onItemDetail=(item)=>{
    this.setState({item: item})
  }

  calculateCartTotal(Cartitems){
    let temp = 0;
    Cartitems.map(item=>{
      temp = temp + (item.price*item.count);
    });
    return temp;
  }

  renderCart() {
    // Count how many of each item is in the cart
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});
    // Create an array of items
    let cartItems = Object.keys(itemCounts).map(itemId => {
      // Find the item by its id
      var item = this.state.items.find(item =>
        item.id === parseInt(itemId, 10)
      );
      // Create a new "item" that also has a 'count' property
      return {
        ...item,
        count: itemCounts[itemId]
      }
    });
    return cartItems;
  }

  renderCategory(category) {
    // Find the item by its id
    var item = this.state.items.find(item =>
      item.category === parseInt(category)
    );
    return item;
  }
  renderSearchResult() {
    let name = this.state.name
    let s = []
    let item = this.state.items.map(item=>{
      if (item.name.includes(name) || item.description.includes(name)) {
        s = [...s, item]

      }return item
    })
    console.log('item', item)
    return s;
  }

  login=(user=null)=>{
    this.initState()
    this.setState({user: user.username})
    this.setState({token: user.token})
    let id = user.id;
    let oid = user.oid;
    this.setState({oid: oid})
    this.onUserLoggedIn(id, oid)
    this.setState({loginState: true})
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', user.username);
    localStorage.setItem('id', id);
  }

  signup=(user=null, data)=>{
    ProductService.signup(data).then(respo=>{
      this.login(user)
      alert("Account created successfuly! Please confirm the Email: "+respo.data.email)
    }).catch(err=>{
      alert(err.toString())
    });
  }
  
  logout=()=>{
    this.setState({user: null});
this.setState({udata: null});
    this.setState({orders: null})
    this.setState({token: null});
    this.setState({loginState: false})
    this.setState({notifications: []})
    this.setState({cart: []})
    this.setState({ordered_items: []})
    this.setState({oid: null})
    this.setState({seeAction: false})
    this.setState({seeTransaction: false})

  }
 
  search=(name)=>{
    this.setState({name: name});
  }
  onSearchText = e =>{
    let n = e.target.value
    alert(n)
  }

  onNotifView=()=>{
    let staten = this.state.seeTransaction
    if(staten){
      this.setState({seeTransaction: false})
    }
    let state = this.state.seeAction
    if (state) {
      this.setState({seeAction: false})
    }
    else{
      this.setState({seeAction: true})
    }
  }

  onTransactionView=()=>{
    let staten = this.state.seeAction
    if(staten){
      this.setState({seeAction: false})
    }
    let state = this.state.seeTransaction
    if (state) {
      this.setState({seeTransaction: false})
    }
    else{
      this.setState({seeTransaction: true})
    }
  }

  onFinishNotif=()=>{
    this.setState({seeAction: false})
  }

  onFinishTransaction=()=>{
    this.setState({seeTransaction: false})
  }
  renderCustomer(){
    return (
      <>
      customer
      </>
      )
  }
  
  renderAdmin(){
    return (
      <>
      admin
      </>
      )
  }

  renderSupplier(){
    return (
      <>
      supplier
      </>
      )
  }

  renderDelivery(){
    return (
      <>
      delivery
      </>
      )
  }

  renderContent(){
   
    return (<>
        <div className="main-content">
          <Switch>
            <Route exact path="/" render={(props)=> <MainPage items={this.state.items} recent={this.state.recent} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} onItemDetail={this.onItemDetail} /> 
            }> 
            </Route>
            <Route path="/cart" render={(props)=> <CartPage items={this.renderCart()} onAddOne={this.handleAddToCart} onRemoveOne={this.onRemoveOne} total={this.calculateCartTotal(this.renderCart())} onOrderCart={this.onOrderCart}/> 
            }> 
            </Route>
            <Route path="/login" render={(props)=> <Login {...props} login={this.login} /> }></Route>
            <Route path="/changePassword" render={(props)=> <ChangePassword {...props} user={this.state.user} udata={this.state.udata} token={this.state.token}/> }></Route>
            <Route path="/editprofile" render={(props)=> <EditProfile {...props} token={this.state.token} user={this.state.user} udata={this.state.udata} onUserUpdated={this.onUserUpdated}/> }></Route>
            <Route path="/signup" render={(props)=> <Signup {...props} login={this.login} /> }></Route>
            <Route path="/itemdetail" render={(props)=> <ItemDetail item={this.state.item} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem}/> }></Route>
            <Route path="/order" render={(props)=> <OrderView items={this.state.items} order={this.state.orders} udata={this.state.udata} user={this.state.user} ordered_items={this.state.ordered_items} token={this.state.token} updateOrders={this.updateOrders} onUserUpdated={this.onUserUpdated}></OrderView> }></Route>
            <Route path="/cartorder" render={(props)=> <CartOrderPage items={this.renderCart()} user={this.state.user} udata={this.state.udata} total={this.calculateCartTotal(this.renderCart())} token={this.state.token} updateOrders={this.updateOrders}  updateCart={this.updateCart} onUserUpdated={this.onUserUpdated}/> }></Route>
            <Route path="/itemorder" render={(props)=> <ItemOrderPage items={this.state.order} user={this.state.user} udata={this.state.udata} token={this.state.token} updateOrders={this.updateOrders} onUserUpdated={this.onUserUpdated}/> }></Route>
            <Route path="/searchResult" render={(props)=> <SearchResult items={this.renderSearchResult()} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} name={this.state.name} onItemDetail={this.state.onItemDetail}/> }></Route>
            <Route path="/category" render={(props)=> <CategoryPage items={this.state.items} category={this.state.category} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} id={this.state.id} onItemDetail={this.onItemDetail}/> }> 
            </Route>
          </Switch>
        </div>
        </>
    );
  }
  render(){

    const onChangeSearchName = e =>{
      let n = e.target.value;
      this.setState({name: n})
    }
    return (
    <div className="App">
    <Row>
      <Navbar className="fixed-top" bg="primary" variant="dark">
        <div className="container-fluid">
          <Link to="/" class="nav-link"><Navbar.Brand>E-Commerce</Navbar.Brand></Link>
          <Nav className="mt-auto">
            <Container className="nav-items">
              { this.state.user ? (
                <>
                  <Link class="nav-link" to={'searchResult'}>
                    <Form inline>
                      <FormControl type="text" placeholder="Search Product" className="mr-sm-2" value={this.state.name} onChange={onChangeSearchName}/>
                    </Form>
                  </Link>
                  <CategoryList category={this.state.category} onCategorySelected={this.onCategorySelected}/>
                  <Link class="nav-link" to={"/cart"}>Cart<sup>{this.state.cart.length}</sup></Link>
                  <Link class="nav-link" to={"/order"}>Orders<sup>{this.state.ordered_items.length}</sup></Link>
                  <Link class="nav-link" onClick={this.onNotifView}>Notifications<sup>{this.state.notifications.length}</sup></Link>
                  <Link class="nav-link" onClick={()=>this.onTransactionView()}>Transactions<sup>{this.state.transactions.length}</sup></Link>
                  <AccountItem user={this.state.user} udata={this.state.udata} logout={this.logout}>Accounts</AccountItem>
                </>
              ) : (
                <>
                  <Link class="nav-link" to={'searchResult'}>
                    <Form inline>
                      <FormControl type="text" placeholder="Search Product" className="mr-sm-4" value={this.state.name} onChange={onChangeSearchName}/>
                    </Form>
                  </Link>
                  <CategoryList category={this.state.category} onCategorySelected={this.onCategorySelected}/>
                  <Link class="nav-link" to={"/cart"}>Cart<sup>{this.state.cart.length}</sup></Link>
                  <Link class="nav-link" to={"/login"}>Login</Link>
                  <Link class="nav-link" to={"/signup"}>Signup</Link>
                  </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
    </Row>   
    <Row>
    <main >
    <div className='notif-bar'>
      {this.state.seeAction ? (
        <ActionBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} updateNotifications={this.updateNotifications}  isVisible={this.state.seeAction} token={this.state.token} handleClose={this.onNotifView} notifications={this.state.notifications}/>
      ):(null)}
      {this.state.seeTransaction ? (
        <TransactionBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} updateTransaction={this.updateNotifications}  isVisible={this.state.seeTransaction} token={this.state.token} handleClose={this.onTransactionView} transactions={this.state.transactions}/>
      ):(null)}
      </div>
      <div id='page-wrap'>
      {this.renderContent()}
      </div>
      <Chatbot token={this.state.token}/>
    </main>
    </Row>
    </div>
    );
  }
}
export default App;