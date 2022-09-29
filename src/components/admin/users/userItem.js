import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Alert, Button, Form, Row, Col} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import ControlService from '../services/control.js';

const UserItem = ({ item, onUpdateUser, onDeleteUser }) => {
 	
	const [role, setRole] = React.useState('customer')
	
	const [balance, setBalance] = React.useState(0)
	
	const [enableEditing, setEnableEditing] = React.useState(false)

	
	const onSubmit=()=>{
		if (true) {
			let data = {
				'role': role,
				'balance': balance,
			}
			onUpdateUser(item.id, data)
			setEnableEditing(false)
		}
		else
		{
			alert('There is an error')
		}
	}
	return (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<Col><td><b>ID: </b>{item.id}</td></Col>
				<Col><td><b>Username:</b> {item.username}</td></Col>
				<Col><Button onClick={()=>setEnableEditing(true)}>Edit</Button></Col>
				<Col><Button variant='danger' onClick={()=>onDeleteUser(item.id)}>Delete</Button></Col>
			</Row>
			{enableEditing ? (
				<Container>
				<Row>
				<Alert><center><h5>Edit User</h5></center></Alert>
				</Row>
				<Row>
				<Alert><center><h6>User Personal Information</h6></center></Alert>
				</Row>
				
				<Row>
				<Alert><center><h6>Other Informations</h6></center></Alert>
				</Row>
				<Row>
				<Col>
					<Alert>
						<center>
						<Row>
							<Alert><b>Role</b></Alert>
						</Row>

						<select type="text" placeholder="Enter product name" value={role} onChange={(e)=>setRole(e.target.value)}>
							<option value='admin'>Admin</option>
							<option selected value='customer'>Customer</option>
							<option value='supplier'>Supplier</option>
							<option value='delivery'>Delivery</option>
						</select>
						</center>
					</Alert>
				</Col>
				<Col>
					<Alert className="mb-3">
			                <Alert><center><b>Balance</b></center></Alert>
			                <Form.Control type="number" placeholder="User Balance" value={balance} onChange={(e)=>setBalance(e.target.value)} />
		              	</Alert>
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
					<Button variant='warning' onClick={()=>setEnableEditing(false)}>Cancel Editing</Button>
				</Col>
				<Col>
				</Col>
				<Col>
				</Col>
				</Row>
				</Container>
			):(null)}
		</Container>
	</Alert>
	);}

	
export default UserItem;