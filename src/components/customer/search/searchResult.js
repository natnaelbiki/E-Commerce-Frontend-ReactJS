import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../item/itemPage.css';
import Item from '../item/item'
import {Link } from 'react-router-dom';
import {Alert, Button, Container, Row, Col } from 'react-bootstrap';


const SearchResult=({items,onAddToCart,onOrderItem, name, onItemDetail})=>{
  return (
    <Container>
    {items.length === 0 ? (
          <Alert><center>No Result for <b>{name}</b></center></Alert>    
      ):(
           <>
           {name === ''?(
                      <Alert><center><b>Search Products</b></center></Alert> 

           ):(
                      <Alert><center>Search Result for <b>{name}</b></center></Alert> 
           )}
      <Row md='3'>
      {items.map(item =>
    <Col md='4' className="ItemPage-item">
        <Item item={item}>
          <Row md='3'>
            <Col md='4'>
              <Button variant="primary" className="Item-addToCart" onClick={()=>onAddToCart(item)}>
                +Cart
              </Button>
               </Col>
               <Col md='4'>
              <Button variant="primary" className="Item-order" onClick={()=>onOrderItem(item)}>
                Order
              </Button>
              </Col>
              <Col md='4'>
              <Link to="/itemdetail">
              <Button variant="primary" className="Item-order" onClick={()=>onItemDetail(item)}>
                Detail
              </Button>
              </Link>
              </Col>
            </Row>
          </Item>
    </Col>
    )}</Row></>
      )}
    
    
    </Container>
  );
}
SearchResult.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onOrderItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
export default SearchResult;
