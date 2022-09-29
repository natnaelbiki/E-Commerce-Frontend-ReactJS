import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';


const AddNewOrder = ({users, products, onSubmitNewOrder}) => {
	const [price, setPrice] = React.useState(null)
	const [quantity, setQuantity] = React.useState(null)
	const [status, setStatus] = React.useState(null)
	const [product, setProduct] = React.useState(null)
	const [paid, setPaid] = React.useState(null)
	const [user, setUser] = React.useState(null)

	const onUserChange=e=>{
		let uid = e.target.value
		setUser(uid)
	}

	const onProductChange=e=>{
		let pid = e.target.value
		alert(pid)
		setProduct(pid)
	}

	const onStatusChange=e=>{
		let status = e.target.value
		alert(status)
		setStatus(status)
	}

	const onPaidChange=e=>{
		let paid = e.target.value
		alert(paid)
		setPaid(paid)
	}

	const onSubmit=()=>{
		let data = {
			'uid': user,
			'quantity': quantity,
			'status': status,
			'paid': paid,
			'product': product,
		}
		onSubmitNewOrder(data)
	}
	return(
		<Container className="form-container">
			<Row>
				<Alert >
					<center><b><h4>Add New Order</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					<Row>
						<center><b>Product</b></center>
					</Row>
					<Row>
						<select type='number' value={product} onChange={onProductChange}>
							{products.map(item=>
								<option value={item.id}>{item.name}</option>
							)}
						</select>
					</Row>
				</Col>
				<Col>
					<center><b>Quantity</b></center>
					<Form.Control type="number" placeholder="Enter quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
				</Col>
				<Col>
					<Row>
						<center><b>User</b></center>
					</Row>
					<Row>
						<select type='number' value={user} onChange={onUserChange}>
							{users.map(item=>
								<option value={item.id}>{item.username}</option>
							)}
						</select>
					</Row>
				</Col>
				<Col>
					<Row>
						<center><b>Status</b></center>
					</Row>
					<Row>
						<select value={status} onChange={onStatusChange}>
							<option selected value={'pending'}>{'pending'}</option>
							<option value={'ordered'}>{'ordered'}</option>
							<option value={'delivered'}>{'delivered'}</option>
						</select>
					</Row>
				</Col>
				<Col>
					<Row>
						<center><b>Paid</b></center>
					</Row>
					<Row>
						<select value={paid} onChange={onPaidChange}>
								<option selected value={'Paid'}>{'yes'}</option>
								<option value={'Not Paid'}>{'no'}</option>
						</select>
					</Row>
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
	)
}
export default AddNewOrder;