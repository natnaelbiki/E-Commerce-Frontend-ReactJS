import React from 'react';
import PropTypes from 'prop-types';
import './orderItemPage.css';
import {Link } from 'react-router-dom';
import Item from '../item/item.js';
import ProductService from '../services/product'
import {Form, Alert, Button, Container, Row, Col} from 'react-bootstrap';

const ItemOrderPage=({items, user, udata, token, updateOrders, onUserUpdated})=> {
  const[quantity, setQuantity] = React.useState(1);
  const[message, setMessage] = React.useState("")
  const[oid, setOID] = React.useState(null)
  const[orderSubmitted, setSubmitted] = React.useState(false)
  const[orderItemSubmitted, setItemSubmitted] = React.useState(false)
  const[status, setStatus] = React.useState(0)
  const[trans, setTrans] = React.useState(null)
  const onChangeQuantity = e => {
    const _quan = e.target.value;
    setQuantity(_quan);
  }
  const onOrder = ()=>{
    let data = {
    "uid": udata.id
}
    ProductService.newOrder(token, data).then(res=>{
      let state = res.data.status
      setStatus(res.data.status)
      
      setMessage(res.data.message)
      if(state === 1){
        setTrans(res.data.trans)
            //alert(res.data.message)
            //alert(res.data.orderid)
            OrderItem(res.data.orderid)
            setSubmitted(true)}
    }).catch(err=>{
      //alert(err.toString())
      setMessage(err.toString())
    })
    //alert("make order")
  }
  const OrderItem=(id)=>{
    let data = {
      'method': 'item',
      "uid": udata.id,
      "quantity": quantity,
      "order": id,
      "product": items.id
}
ProductService.newOrderItem(token, data).then(res=>{
      setStatus(res.data.status)
      setMessage(res.data.message)
      setOID(res.data.orderid)
      setItemSubmitted(true)
      updateOrders()
      onUserUpdated()
    }).catch(err=>{
      //alert(err.toString())
      setMessage(err.toString())
    });
  }

  return (
    <div>
   {user === null ? 
        (
          <>
            <Alert variant='warning'><center>You Must <Link to={'/login'}>Login</Link> or <Link to={'/signup'}>Signup</Link> to continue!</center></Alert>
          </>
        ):(
        <>
    <>
    
      {items===null ?(
        <Alert variant="danger"><center><b>No Product Selected</b></center></Alert>
        ):(
        <>
        {orderItemSubmitted ? (
          <Container>
          <Row>
          <Row>
          <Alert variant={status === 1 ? ("primary"):("danger")}>
    <center>{message} <b>{oid === null || "undefined" ? (null):(" Order ID: "+oid)}</b></center>
    <h6>Order Information</h6>
    <>Order Id:<b> {oid}</b></>
    </Alert>
          </Row>
          <Row>
          <Col>
          {status===1?(<>
            <Alert><center><h4>Ordered Product</h4></center></Alert>
      <Item item={items}/></>
      ):(null)}
      </Col>
          </Row>
          </Row>
    
    </Container>
          ):(
          <Container>
         <Alert> <center><h4>Product Order Page</h4></center></Alert>
          <Row>
          <Col>
<Alert><h5><center>Item Information</center></h5>
</Alert>
          <Item item={items}></Item>
          </Col>
          <Col>
              <Alert><center><b>Quantity</b></center></Alert>
              <Alert><Form.Control type="number" placeholder="Enter The Quantity You Need. . ." value={quantity} onChange={onChangeQuantity}/>
            <center><b>Total Price: {items.price*quantity}</b></center></Alert>
          </Col>
          </Row>
          {orderSubmitted ? (null):(
            <>
           
            {udata.balance > (items.price*quantity) ?(
              <Alert>
         <center>
                <Button variant="primary" onClick={onOrder}>
                  Order
                </Button></center>
</Alert>
              ):(
              <Alert variant='danger'><center><b>Your Balance is Insufficent</b></center></Alert>
              )}</>

          )}
          </Container>
        
            
            )}
        </>
        )}
    
    </>
   </>
   )}
    </div>
        
  );
}
ItemOrderPage.propTypes = {
  items: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}
export default ItemOrderPage;
