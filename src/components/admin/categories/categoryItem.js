import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';

const CategoryItem = ({ item, onUpdateCategory, onDeleteCategory }) => {
	const [enableEditing, setEnableEditing] = React.useState(false)
	const [name, setName] = React.useState(item.name)
	const onEditItem=()=>{
		setEnableEditing(true)
	}
	const onSubmit=()=>{
		let data = {
			'name': name,
		}
		onUpdateCategory(item.id, data)
		setEnableEditing(false)
	}
	return (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<Col><td><b>{item.name}</b></td></Col>
				<Col><Button onClick={onEditItem}>Edit</Button></Col>
				<Col><Button variant='danger' onClick={()=>onDeleteCategory(item.id)}>Delete</Button></Col>
			</Row>
		</Container>
		{enableEditing ? (
			<Container>
			<Row>
				<Alert >
					<center><b><h4>Update Category</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					
				</Col>
				<Col>
					<Alert >
						<center><b>Category Name</b></center>
						<Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/>
					</Alert>
				</Col>
				<Col>
					
				</Col>
			</Row>
			<Row>
				<Col>
				</Col>
				<Col>
				</Col>
				<Col>
					<Button onClick={onSubmit}>Submit</Button>
				</Col>
				<Col>
				</Col>
				<Col>
				</Col>
			</Row>
			</Container>
		):(null)}
	</Alert>
	);}

	
export default CategoryItem;