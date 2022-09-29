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
import PatternItem from './patternItem.js'

const TagItem = ({ item }) => {
	const [seePatterns, setSeePatterns] = React.useState(false)

	const onViewPatterns=()=>{
		let state = seePatterns;
		if(state){
			setSeePatterns(false)
		}
		else if(!state){
			setSeePatterns(true)
			}
	}
	return (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<Col><td><b>Method:</b> {item.method}</td></Col>
				<Col><Link onClick={onViewPatterns}>{seePatterns ? ("Minmize"):('View Patterns')}</Link></Col>
			</Row>
			{seePatterns ? (
				<Row>
			<h6>Patterns</h6>
			{item.patterns.map(p=>
				<PatternItem item={p}/>
			)}
			</Row>
				):(null)}
			
		</Container>
	</Alert>
	);}

	
export default TagItem;