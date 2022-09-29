import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import Item from '../item/item.js';
import {Alert, Container, Button, Row, Col} from 'react-bootstrap';
import './cartpage.css';

function CartPage({ items, onAddOne, onRemoveOne, total, onOrderCart }) {
	return (
		<Container>
			{items.length === 0 ? 
				(
					<Alert variant='warning'><center>Your Cart is Empty</center></Alert>
				):(
				<>
				<Alert>
                    <center><b><h4>Cart Products</h4></b></center>
                </Alert>
					<Row md='3'>
						{items.map(item =>
							<Col md='4' key={item.id} className="CartPage-item">
								<Item item={item}>
								<Row className="CartItem-controls">
								<Col md='12'>
								<button
								className="CartItem-removeOne"
								onClick={() => onRemoveOne(item)}>&ndash;</button>
								<span className="CartItem-count">{item.count}</span>
								<button
								className="CartItem-addOne"
								onClick={() => onAddOne(item)}>+</button>
								</Col>
								</Row>
								</Item>
							</Col>
						)}
					</Row>
					<Row>
					<Alert>
					<center>
						<h4>Total Price: {total} <b>Birr</b></h4>
						<Link to="/cartorder">
							<Button variant="primary" className="Item-order" onClick={()=>onOrderCart(items)}>
				            	Order Items
				            </Button>
			            </Link>
			            </center>
			            </Alert>
			        </Row>
				</>
			)}
		</Container>
    );
}
CartPage.propTypes = {
	items: PropTypes.array.isRequired,
	onAddOne: PropTypes.func.isRequired,
	onRemoveOne: PropTypes.func.isRequired,
	onOrderCart: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
};
export default CartPage;