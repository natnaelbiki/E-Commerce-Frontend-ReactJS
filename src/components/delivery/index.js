import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Alert } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import ProductService from './services/deliveryServices.js'
import ControlService from './services/control.js'
import OrderItem from './orders/orderItem.js';


const DeliveryMainPage = ({token})=> {
  const [orders, setOrders] = React.useState([])
  const [seeOrders, setSeeOrders] = React.useState(false)
  
  const onViewOrders=()=>{
    ProductService.getOrders(token).then(res=>{
      //alert(res.data.message)
      let order = ControlService.OrderItemMap(res.data.orders)
      setOrders(order)
      //alert(order.address)
      setSeeOrders(true)
    }).catch(err=>{
      alert(err.toString())
    })
  }
  const onUpdateOrder=(id, data)=>{
      ProductService.updateOrders(token, id, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewOrders();
          }
      }).catch(err=>{
        alert(err.toString())
      });
  }
  
  const onFinishViewOrders=()=>{
    setSeeOrders(false)
  }
  
  return (
    <Container>
    <Alert><center><h4>Welcome to Ecommerce Delivery Page</h4></center></Alert>
    <Row>
        <Alert><center><h4>Orders</h4></center></Alert>
        <Alert>
        <center><h6>All Orders</h6>
        {seeOrders ? (
          <Row><Col>
          </Col><Col></Col>
          <Col>
          <Button onClick={onFinishViewOrders}>Minmize</Button>
          </Col>
          <Col>
          </Col><Col></Col>
          </Row>
          ):(
          <Row>
          <Col>
          </Col><Col></Col>
          <Col>
          <Button onClick={onViewOrders}>View Orders</Button>
          </Col>
          <Col></Col><Col></Col>
          </Row>
          )}
        </center></Alert>
        {seeOrders ? (
          <>
          {orders === [] ? (null):(
          <Row>
            {orders.map(item=>
              <OrderItem item={item} onUpdateOrder={onUpdateOrder}/>
              )}
          </Row>)}
          </>
          ):(null)}
        
    </Row>
    </Container>
  );
}

export default DeliveryMainPage;
