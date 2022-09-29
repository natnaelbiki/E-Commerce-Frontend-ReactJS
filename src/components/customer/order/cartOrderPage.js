import React from 'react';
import PropTypes from 'prop-types';
import '../item/itemPage.css';
import Item from '../item/item'
import {Link } from 'react-router-dom';
import {Alert, Button, Container, Row, Col} from 'react-bootstrap';
import ProductService from '../services/product.js';

const CartOrderPage=({items, user, udata, total, token, updateOrders, updateCart, onUserUpdated})=> {
  const[message, setMessage] = React.useState("")
  const[orderSubmitted, setSubmitted] = React.useState(false)
  const[status, setStatus] = React.useState(0)
  const[oid, setOID] = React.useState(null)
  const onOrderCart = ()=>{
    let data = {
    "uid": udata.id
}
    ProductService.newOrder(token, data).then(res=>{
      setStatus(res.data.status)
      setMessage(res.data.message)
      OrderItem(res.data.orderid, items)
      let status = res.data.status
      if (status === 1) {
        updateCart()
        updateOrders()
        onUserUpdated()
      }
      
      //setSubmitted(true)
    }).catch(err=>{
      alert(err.toString())
      setMessage(err.toString())
    })
    //alert("make order")
  }
  const OrderItem=(id, item)=>{
    let data = {
      'method': 'cart',
      'item': item,
      'total': total,
      "uid": udata.id,
      "order": id,
}
ProductService.newOrderItem(token, data).then(res=>{
      setStatus(res.data.status)
      setMessage(res.data.message)
      if(res.data.status === 1){
        setOID(res.data.oid)
        setSubmitted(true)
      }
    }).catch(err=>{
      alert(err.toString())
      setMessage(err.toString())
    });
  }

  return (
    <>
    {user === null ? 
      (
        <>
          <Alert variant='warning'><center>You Must <Link to={'/login'}>Login</Link> or <Link to={'/signup'}>Signup</Link> to continue!</center></Alert>
        </>
      ):(
      <div>
        {items.length === 0 && !orderSubmitted ? 
        (
          <><center><h4>Your Cart is Empty</h4></center></>
        ):(
        <>
        {orderSubmitted ? (null):(
          <Container>
        <Alert><h4><center>Cart Order Page</center></h4>
        </Alert>
        <Row>
                <Alert><h6><center>Cart Items Information</center></h6></Alert>
          {items.map(item =>
              <Col key={item.id} className="CartPage-item">
             <br/> <Item item={item}>
              <p>Quantity: {item.count} {item.unit}</p>
              <p>Total: {(item.price*item.count)} Birr</p>
              </Item>
              </Col>
              )}
        </Row>
        <Alert>              <center><h4>Total Price: {total} <b>Birr</b></h4>
</center></Alert>
          <Alert className="CartPage-items">
            
              <center>
              <Link to={"/cart"}><Button>Edit Cart</Button></Link><br/>
              </center>
            </Alert>
          {udata.balance < total ? (
            <Alert variant="danger">
              <h6><center><b>Your Balance is Insufficent</b></center></h6>
            </Alert>
            ):(
              <Alert className="form-container">
              <center>
                <Button variant="primary" onClick={onOrderCart}>
                  Order
                </Button>
              </center>
              </Alert>
            )}  
            </Container>
          )}
        
        </>
        )}
    </div>
    )}
    {orderSubmitted ? (
      <Alert>
      <center><b>{message}</b></center>
      
      </Alert>
      ):(null
      )}
    </>
       );
}
CartOrderPage.propTypes = {
  items: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
}

export default CartOrderPage;
