import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom';

const OrderAddressItem = ({ item }) => (
	<Alert className="Item">
		<Container id='item'>
		<Alert><center><h6><b>Delivery Address</b></h6></center></Alert>
			<Row>
				<Col><td><b>Region:</b> {item.region}</td></Col>
				<Col><td><b>Zone:</b> {item.zone}</td></Col>
				<Col><td><b>City:</b> {item.city}</td></Col>
				<Col><td><b>Phone:</b> {item.Phone}</td></Col>
			</Row>
		</Container>
	</Alert>
	);

	
export default OrderAddressItem;