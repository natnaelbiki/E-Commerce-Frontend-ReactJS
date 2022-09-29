import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';


const AddNewProduct = ({category, onSubmitNewProduct}) => {
	const [name, setName] = React.useState(null)
	const [price, setPrice] = React.useState(null)
	const [categories, setCategory] = React.useState(null)
	const [description, setDescription] = React.useState(null)
	const [stock, setStock] = React.useState(null)
	const [unit, setUnit] = React.useState(null)
	const [image, setImage] = React.useState(null)
	const [imageAlt, setAltImage] = React.useState(null)
	const [imageAlt1, setAltImage1] = React.useState(null)

	const onSubmit=()=>{
		let data = {
			'name': name,
			'price': price,
			'categories': categories,
			'description': description,
			'stock': stock,
			'unit': unit,
		}
		
		onSubmitNewProduct(data)
	}
	return(
		<Container className="form-container">
			<Row>
				<Alert >
					<center><b><h4>Add New Product</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					<Alert >
						<center><b>Product Name</b></center>
						<Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/>
					</Alert>
				</Col>
				<Col>
					<Alert>
						<center><b>Product Price</b></center>
						<Form.Control type="number" placeholder="Enter price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
					</Alert>
				</Col>
				<Col>
					<Alert >
						<center>
						<Row><b>Category</b></Row>
						<select type="text" placeholder="Enter product name" value={categories} onChange={(e)=>setCategory(e.target.value)}>
							{category.map(item=>
								<option value={item.id}>{item.name}</option>
							)}
						</select>
						</center>
					</Alert>
				</Col>
			</Row>
			<Row>
				<Col>
					<Alert >
						<center>
						<Row><b>Description</b></Row>
						<Row>
						<textarea type="text" placeholder="Enter product Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
						</Row>
						</center>
					</Alert>
				</Col>
				<Col>
					<Alert>
						<center><b>Stock</b></center>
						<Form.Control type="number" placeholder="Enter product stock " value={stock} onChange={(e)=>setStock(e.target.value)} />
					</Alert>
				</Col>
				<Col>
					<Alert>
						<center>
						<Row><b>Unit</b></Row>
						<select type="text" placeholder="Enter product name" value={unit} onChange={(e)=>setUnit(e.target.value)}>
							<option selected value='piece'>piece</option>
							<option value='kg'>kg</option>
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
				</Col>
				<Col>
				</Col>
			</Row>
		</Container>
	)
}
export default AddNewProduct;