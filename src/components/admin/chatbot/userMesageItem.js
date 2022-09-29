import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom';
import ControlService from '../services/control.js';

const UserMessageItem = ({ item }) => (
	<Alert className="Item">
		<Container id='item'>
		<Alert className="Item">
		<Row>
		<Col><center><b>{item.age}</b></center></Col>
		</Row></Alert>
		
			<Row>
				<Col><td>{item.id}. <b>{item.message}</b></td></Col>
				<Col><td><b>Identified Tag:</b> {item.identified_tag}</td></Col>
				<Col><td><b>Correct Tag:</b> {item.correct_tag}</td></Col>
			</Row>
		</Container>
	</Alert>
	);

	
export default UserMessageItem;