import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom';
import OrderAddressItem from './orderAddress.js';

const OrderItem = ({ item, onUpdateOrder }) => {
	const [changeStatus, setChangeStatus] = React.useState(false)
	const [status, setStatus] = React.useState(item.status)
	const [paid, setPaid] = React.useState(item.paid)

	const onStatusChange=e=>{
		let status = e.target.value
		setStatus(status)
	}
	const onPaidChange=e=>{
		let paid = e.target.value
		setPaid(paid)
	}

	const onSubmit=()=>{
		let data = {
			'status': status,
			'paid': paid,
		}
		onUpdateOrder(item.id, data)
		setChangeStatus(false)
	}

	return (
	<Alert className="Item">
		<Container id='item'>
			<Row>
				<Col><td><b>Ordered By:</b> {item.owner}</td></Col>
				<Col><td><b>Submited on:</b> {item.age}</td></Col>
				<Col><td><b>Order Status:</b> {item.status}</td></Col>
				<Col><td><b>Payment Status:</b> {item.paid}</td></Col>
				<Col><td><b>Product:</b> {item.product}</td></Col>
				<Col><td><b>Product Quantity:</b> {item.quantity}</td></Col>
				<Col><td><b>Order Price:</b> {item.price}</td></Col>
			</Row>
			<Row>
				<OrderAddressItem item={item.address}/>
			</Row>
			<Row>
				<Col>
				</Col>
				<Col>
				</Col>
				<Col>
					<Button onClick={()=>setChangeStatus(true)}>Change Status</Button>
				</Col>
				<Col>
				</Col>
				<Col>
				</Col>
			</Row>
			{changeStatus ? (
				<Container>
					<Row>
				<Alert >
					<center><b><h4>Update Order</h4></b></center>
				</Alert>
			</Row>
			<Row>				
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
				<Col><Button variant='warning' onClick={()=>setChangeStatus(false)}>Cancel Editing</Button>
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