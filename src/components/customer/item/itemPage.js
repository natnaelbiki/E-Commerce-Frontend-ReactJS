import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Item from './item'
import {Button, Container, Row, Col, Alert } from 'react-bootstrap';
import {Link } from 'react-router-dom';


function MainPage({ items , recent, onAddToCart, onOrderItem, onItemDetail}) {

  return (
    <Container>
    <Alert><center><h4>Recently Added</h4></center></Alert>
    <Row md='3' sm='2'>
    {recent.map(res=>
      <Col md='4'>
        <Item item={res}>
        <Col md='3' sm='3'>
            <Button variant="primary" onClick={()=>onAddToCart(res)}>
              +Cart
            </Button>
            </Col>
            <Col md='3' sm='3'>
            <Link to="/itemorder">
            <Button variant="primary" className="Item-order" onClick={()=>onOrderItem(res)}>
              Order
            </Button></Link>
          </Col>
          <Col md='3' sm='3'>
            <Link to="/itemdetail">
            <Button variant="primary" className="Item-detail" onClick={()=>onItemDetail(res)}>
              Detail
            </Button></Link>
            </Col>
        </Item>
      </Col>
    )}
    </Row>
    <Alert><center><h4>All Products</h4></center></Alert>
    <Row md='3'>
      {items.map(item =>
        <Col md="4">
          <Item item={item} onItemDetail={onItemDetail}>
          <Col md='3'>
            <Button variant="primary" className="Item-addToCart" onClick={()=>onAddToCart(item)}>
              +Cart
            </Button>
            </Col>
            <Col md='3'>
            <Link to="/itemorder">
            <Button variant="primary" className="Item-order" onClick={()=>onOrderItem(item)}>
              Order
            </Button></Link>
          </Col>  
          <Col md='3'>
            <Link to="/itemdetail">
            <Button variant="primary" className="Item-detail" onClick={()=>onItemDetail(item)}>
              Detail
            </Button></Link>
            </Col>
          </Item>
          </Col>
      )}
      </Row>
      <Row>
        <Alert><center><h4><b>About Us</b></h4></center></Alert>
        <Col>
          <Alert><center><h5><b>Services</b></h5></center></Alert>
          <Alert>
            <center><b>Retailing</b></center>
            <center><b>Sales</b></center>
            <center><b>Product Booking</b></center>
            <center><b>Delivery</b></center>
          </Alert>
        </Col>
        <Col>
          <Alert><center><h5>Contact Us</h5></center></Alert>
          <Alert>
            <center><b>Address</b></center>
            <center>Addis Abeba, Bole Sub City, Woreda 10 near Summit square</center>
            <center mailto='natnaelbiki@gmail.com'><b>Email:</b> natibiki@ecommrece.com</center>
          </Alert>
        </Col>
        <Col>
          <Alert><center><h5>Working Hours</h5></center></Alert>
          <Alert>
            <center><b><u>Monday - Sunday</u></b></center>
            <center><b>Morninig: {"8:00am - 12:00pm"}</b></center>
            <center><b>Noon: {"2:00pm - 6:00pm"}</b></center>
            <center><b><u>Online</u></b></center>
            <center><b>24/7</b></center>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Alert><center>All Rights Reserved 2022, Ethiopia</center></Alert>
      </Row>
    </Container>
  );
}
MainPage.propTypes = {
  items: PropTypes.array.isRequired,
  recent: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onOrderItem: PropTypes.func.isRequired,
  onItemDetail: PropTypes.func.isRequired

};
export default MainPage;
