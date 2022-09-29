import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './item.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import {Link } from 'react-router-dom';

const Item = ({ item, onItemDetail, children }) => (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<div className="Item-title">
					<h5>{item.name}</h5>
				</div>
			</Row>
			<Row>
				<Col>
					<Link to={"/itemdetail"} onClick={()=>onItemDetail(item)}>
						<img id="image" src={item.image} alt={item.name}/>
					</Link>
				</Col>
				<Col>
					<b>{item.description}</b>
				</Col>
			</Row>
			<Row>
				<div className='Item-Right'>
					<div className="Item-price">
						<b>Price: {item.price} Birr per {item.unit}</b>
					</div>
				</div>
			</Row>
			<Row md='3' sm='3'>
				{children}
			</Row>
		</Container>
	</Alert>
	);

	Item.propTypes = {
		item: PropTypes.object.isRequired,
		onItemDetail: PropTypes.func.isRequired,
		children: PropTypes.node
	};
export default Item;