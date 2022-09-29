import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';


const AddNewCategory = ({onSubmitNewCategory}) => {
	const [name, setName] = React.useState(null)
	

	const onSubmit=()=>{
		let data = {
			'name': name,
		}
		onSubmitNewCategory(data)
	}
	return(
		<Container className="form-container">
			<Row>
				<Alert >
					<center><b><h4>Add New Category</h4></b></center>
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
	)
}
export default AddNewCategory;