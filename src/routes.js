import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Category from './components/category/category';
import Container from 'react-bootstrap/Navbar'
import { Switch, Route, Link } from 'react-router-dom';
import ItemPage from './components/item/itemPage.js';
import Login from './components/account/login.js';
import Signup from './components/account/signup.js';
import CartPage from './components/cart/cartpage.js';
import CartOrderPage from './components/order/orderPage.js';
import AccountItem from './components/account/accountOptions.js';
import Accounts from './components/account/accounts.js';
import SearchPage from './components/search/search.js';
import SearchResult from './components/search/searchResult.js';
import axios from 'axios';
import ProductService from './services/product.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Basic from './components/chatbot/basic.js'
import CategoryPage from './components/category/categoryPage.js'
import CategoryList from './components/category/categoryList.js'
import ItemOrderPage from './components/order/orderItemPage.js';


class App extends Component{
  state = {
    items: [],
    cart: [],
    order: [],
    user: null,
    token: null,
    category: [],
    categoryItems: [],
    error: '',
    id: 0,
    name: ""


  }
  componentDidMount(){
    this.getProducts();
    this.getCategory();
  }

  getProducts(){
    axios.get("http://127.0.0.1:8000/api/").then(res=>{
      this.setState({items: res.data});
    }).catch(err=>{
      console.log(err);
    });
  }

  getCategory(){
    axios.get("http://127.0.0.1:8000/api/category/").then(res=>{
      this.setState({category: res.data});
    }).catch(err=>{
      console.log(err);
    });
  }

  onCategorySelected=(categoryId)=>{
    this.state.id = categoryId;
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

  


  calculateCartTotal(Cartitems){
    let temp = 0;
    Cartitems.map(item=>{
      temp = temp + (item.price*item.count)
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
item.category === parseInt(category, 10)
);
// Create a new "item" that also has a 'count' property
return item;
}


  login=(user=null)=>{
    ProductService.login(user).then(res=>{
    this.setState({token: res.data.token});
    this.setState({user: user.username});
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', user.username);
    this.setState({error: ''});
  }).catch(e=>{
    console.log('login',e);
    this.setError({error: e.toString()});
  });
  }
  signup=()=>{

  }
  logout(){
    this.setState({user: null});
    alert("logged out");
  }
 
  search=(name)=>{
    this.state.name=name;
  }
  renderContent(){
    return (<>
        <div className="main-content">
          <Switch>
            <Route exact path="/" render={(props)=> 
              <ItemPage items={this.state.items} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} /> 
            }> 
            </Route>
            <Route path="/cart" render={(props)=> 
              <CartPage items={this.renderCart()} onAddOne={this.handleAddToCart} onRemoveOne={this.onRemoveOne} total={this.calculateCartTotal(this.renderCart())} onOrderCart={this.onOrderCart}/> 
            }> 
            </Route>
            <Route path="/login" render={(props)=> <Login {...props} login={this.login} /> }></Route>
            <Route path="/chatbot" render={(props)=> <Basic /> }></Route>
            <Route path="/order" render={(props)=> <CartOrderPage items={this.state.order}/> }></Route>
            <Route path="/itemorder" render={(props)=> <ItemOrderPage items={this.state.order}/> }></Route>
            <Route path="/accounts" render={(props)=> <Accounts /> }></Route>
            <Route path="/search" render={(props)=> <SearchPage search={this.search}/> }></Route>
            <Route path="/searchResult" render={(props)=> <SearchResult items={this.state.items} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} name={this.state.name}/> }></Route>
            <Route path="/signup" render={(props)=> <Signup {...props} signup={this.signup}/> }> </Route>
            <Route path="/category" render={(props)=> <CategoryPage items={this.state.items} onAddToCart={this.handleAddToCart} onOrderItem={this.onOrderItem} id={this.state.id}/> }> 
            </Route>
          </Switch>
        </div>
        </>
    );
  }

  

  render(){
    return (
    <div className="App">
      <div className="row">
        <div className="nav-bar">
          <Navbar className="fixed-top" bg="primary" variant="dark">
            <div className="container-fluid">
              <Navbar.Brand href={"/"}>E-Commerce</Navbar.Brand>
              <Nav className="me-auto">
              <Container className="nav-items">
                  { this.state.user ? (
                  <>
                    <CategoryList category={this.state.category} onCategorySelected={this.onCategorySelected} />
                    <Link class="nav-link" to={"/search"}>Search</Link>
                    <Link class="nav-link" to={"/cart"}>Cart<sup>{this.state.cart.length}</sup></Link>
                    <Link class="nav-link" to={"/order"}>Orders</Link>
                    <Link class="nav-link" to={"/chatbot"}>Chatbot</Link>
                    <AccountItem user={this.state.user}>Accounts</AccountItem>
                    </>
                  ) : (
                  <>
                    <CategoryList category={this.state.category} onCategorySelected={this.onCategorySelected} />
                    <Link class="nav-link" to={"/search"}>Search</Link>
                    <Link class="nav-link" to={"/cart"}>Cart<sup>{this.state.cart.length}</sup></Link>
                    <Link class="nav-link" to={"/order"}>Orders<sup>{this.state.order.length}</sup></Link>
                    <Link class="nav-link" to={"/chatbot"}>Chatbot</Link>
                    <Link class="nav-link" to={"/login"}>Login</Link>
                    <Link class="nav-link" to={"/signup"}>Signup</Link>
                  </>
                )}
              </Container>
            </Nav>
            </div>
          </Navbar>
        </div>
      </div>
      <main>
        {this.renderContent()}        
      </main>
    </div>
    );
  }
}
export default App;