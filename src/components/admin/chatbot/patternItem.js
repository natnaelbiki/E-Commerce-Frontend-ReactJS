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

const PatternItem = ({ item }) => (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<Col><td><b>{'String'}:</b> {item.string}</td></Col>
			</Row>
		</Container>
	</Alert>
	);

	
export default PatternItem;