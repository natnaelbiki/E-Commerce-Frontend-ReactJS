import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';


const AddNewUser = ({onSubmitNewUser, onCancel}) => {
	const [username, setUsername] = React.useState(null)
  	const [password, setPassword] = React.useState(null)
	const [firstName, setFirstName] = React.useState(null)
  	const [middleName, setMiddleName] = React.useState(null)
	const [lastName, setLastName] = React.useState(null)
	const [woreda, setWoreda] = React.useState(null)
	const [region, setRegion] = React.useState(null)
	const [zone, setZone] = React.useState(null)
	const [city, setCity] = React.useState(null)
	const [kebelle, setKebelle] = React.useState(null)
	const [phone, setPhone] = React.useState(null)
	const [role, setRole] = React.useState(null)
	const [balance, setBalance] = React.useState(null)

	const onSubmit=()=>{
		let data = {
			'username': username,
			'password': password,
			'first_name': firstName,
			'middle_name': middleName,
			'last_name': lastName,
			'region': region,
			'zone': zone,
			'city': city,
			'woreda': woreda,
			'kebelle': kebelle,
			'role': role,
			'phone': phone,
			'balance': balance,


		}
		onSubmitNewUser(data)
		
	}
	return(
		<Container className="form-container">
			<Row>
				<Alert><center><h4>Add New User</h4></center></Alert>
				</Row>
				<Row>
				<Alert><center><h6>User Personal Information</h6></center></Alert>
				</Row>
				<Row>
					<Col>
						<Alert className="mb-3">
			                <Alert><center><b>Username</b></center></Alert>
			                <Form.Control type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
		              	</Alert>
					</Col>
					<Col>
					<Alert className="mb-3">
			                <Alert><center><b>Password</b></center></Alert>
			                <Form.Control type="password" placeholder="user password" value={password} onChange={(e)=>setPassword(e.target.value)} />
		              	</Alert>
					</Col>
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
					<Button variant='warning' onClick={onCancel}>Cancel Editing</Button>
				</Col>
				<Col>
				</Col>
				<Col>
				</Col>
				</Row>
			
		</Container>
	)
}
export default AddNewUser;