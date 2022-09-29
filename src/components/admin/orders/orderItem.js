import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import {Button, Form} from 'react-bootstrap';
import {Link } from 'react-router-dom';

const OrderItem = ({ item, onUpdateOrder, onDeleteOrder}) => {
	const [quantity, setQuantity] = React.useState(item.quantity)
	const [status, setStatus] = React.useState(item.status)
	const [paid, setPaid] = React.useState(item.paid)
	const [enableEditing, setEnableEditing] = React.useState(false)

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
			'quantity': quantity,
			'status': status,
			'paid': paid,
		}
		alert(item.id)
		onUpdateOrder(item.id, data)
		setEnableEditing(false)
	}

	return (
	<Alert className="Item">
		<Container id='item'>
		<Row>
		<Col><td>{item.age}</td></Col>
		</Row>
			<Row>
				<Col><td><b>Ordered By:</b> {item.owner}</td></Col>
				<Col><td><b>Product:</b> {item.product}</td></Col>
				<Col><td><b>Quantity:</b> {item.quantity}</td></Col>
				<Col><td><b>Price:</b> {item.price}</td></Col>
				<Col><td><b>Status:</b> {item.status}</td></Col>
				<Col><td><b>Paid:</b> {item.paid}</td></Col>
				<Col><Button onClick={()=>setEnableEditing(true)}>Edit</Button></Col>
				<Col><Button variant='danger' onClick={()=>onDeleteOrder(item.id)}>Delete</Button></Col>
			</Row>
			{enableEditing ?(
				<Container>
				<Row>
				<Alert >
					<center><b><h4>Update Order</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					<center><b>Quantity</b></center>
					<Form.Control type="number" placeholder="Enter quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
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
				<Col><Button variant='warning' onClick={()=>setEnableEditing(false)}>Cancel Editing</Button>
				</Col><Col>
				</Col>
				<Col>
				</Col>
			</Row>
				</Container>
					):(null)}
		</Container>
	</Alert>
	);}

	
export default OrderItem;