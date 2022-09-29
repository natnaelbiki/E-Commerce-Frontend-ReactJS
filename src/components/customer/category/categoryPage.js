import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../item/itemPage.css';
import Item from '../item/item'
import {Link } from 'react-router-dom';
import {Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CategoryPage=({items, category, onAddToCart, onOrderItem, id, onItemDetail})=>{
  return (
    <Container>
      <Alert>
        {category.map(cat=>
          <>
          {cat.id === id ?(
            <center><b><h4>{cat.name}</h4></b></center>
            ):(null)}
          </>
        )}
      </Alert>
      <Row md='3'>
        {items.map(item =>
          <>
            {item.category!==id ? (null):(
              <Col md='4'>
                <Item item={item} onItemDetail={onItemDetail}>
                  <Col md='3'>
                    <Button variant="primary" className="Item-addToCart" onClick={()=>onAddToCart(item)}>
                      +Cart
                    </Button>
                  </Col>
                  <Col md='3'>
                    <Link to={"/itemorder"}>
                      <Button onClick={()=>onOrderItem(item)}>Order</Button>
                    </Link>
                  </Col>
                  <Col md='3'>
                    <Link to="/itemdetail">
                      <Button variant="primary" className="Item-detail" onClick={()=>onItemDetail(item)}>
                        Detail
                      </Button>
                    </Link>
                  </Col>
                </Item>
              </Col>
            )}   
          </>
        )}
      </Row>
    </Container>
      
        
  );
}
CategoryPage.propTypes = {
  items: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onOrderItem: PropTypes.func.isRequired,
  onItemDetail: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};
export default CategoryPage;
