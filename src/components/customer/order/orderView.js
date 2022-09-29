import React from 'react';
import './orderView.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import Item from '../item/item.js';
import ProductService from '../services/product.js';
import EditOrderItem from './orderItemEdit.js';
import {Alert, Button, Container, Row, Col } from 'react-bootstrap';

const OrderView=({items, order, ordered_items, user, token, updateOrders, onUserUpdated})=> {
 const[editItems, setEditItem] = React.useState(false)
 const[item, setItem] = React.useState(null)

  const getTotal=()=>{
    let temp = 0;
    ordered_items.map(i=>{
       temp = temp+(i.price*1)
       return temp
    })
    return temp
  }

  const editItem=(item)=>{
    setItem(item)
    setEditItem(true)
  }
  const onFinishUpdate=(id, data)=>{
    onEditOrder(id, data)
    setEditItem(false)
  }
  const onDeleteItem=(id)=>{
    let state = window.confirm('Are You Sure You Want to delete this order?')
    if(state){ProductService.deleteOrderItem(token, id).then(res=>{
          alert(res.data.message)
          updateOrders()
          onUserUpdated()
        }).catch(err=>{
          alert(err.toString())
        });}
  }
  const onEditOrder=(id, data)=>{
    ProductService.updateOrderItem(token, id, data).then(res=>{
      alert(res.data.message)
      updateOrders()
      onUserUpdated()
    }).catch(err=>{
      alert(err.toString())
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
        {ordered_items.length === 0 ? 
          (
            <>
              <Alert variant='warning'><center>You Don't Have an Order Yet</center></Alert>
            </>
          ):(
            <Container>
              {editItems ? (
                <EditOrderItem item={item} onFinishUpdate={onFinishUpdate}/>
              ):(
                <div>
                  <Alert>
                    <center><b><h4>Orders</h4></b></center>
                    </Alert>
                    <Row>
                      {ordered_items.map(item=>
                      <Col className="ordered_items">        
                        {items.map(i=>
                          <>
                            {i.name === item.product ? (
                              <Item item={i}>
                                <center>
                                  <Button variant="primary" onClick={()=>editItem(item)}>Edit Order</Button>
                                    <> </>
                                  <Button variant="danger" onClick={()=>onDeleteItem(item.id)}>Delete Order</Button>
                                </center>
                              </Item>
                            ):(null)}
                              </>
                        )}
                        <Row>
                          <Alert>
                            <h6>Order Id: <b>{item.id}</b> Status: <b>{item.status}</b> <br/>Quantity:<b> {item.quantity}</b> <br/>Total Price:<b> {item.price}</b>  <br/>Paid:<b> {item.paid === "Paid" ?("You have paid"):("You haven't paid")}</b></h6>
                          </Alert>
                        </Row>
                      </Col>
                      )}
                    </Row>
                    <Alert>
                    <center><p><b>Total Price: {getTotal()} Birr</b></p></center>
                    </Alert>
                    </div>     
                    )}
                  <br/>        
                </Container>
              )}
            </div>
          )}
        </>
     );
}
OrderView.propTypes = {
  items: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired,
  ordered_items: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  updateOrders: PropTypes.func.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
}

export default OrderView;
