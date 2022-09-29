import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import {Button, Form} from 'react-bootstrap';
import {Link } from 'react-router-dom';

const ProductItem = ({ item, category, onUpdateProduct, onDeleteProduct }) => {
	const [enableEditing, setEnableEditing] = React.useState(false)
	const [name, setName] = React.useState(item.name)
	const [price, setPrice] = React.useState(item.price)
	const [categories, setCategory] = React.useState(item.category)
	const [description, setDescription] = React.useState(item.description)
	const [stock, setStock] = React.useState(item.stock)
	const [unit, setUnit] = React.useState(item.unit)
	const [image, setImage] = React.useState(null)
	const [imageAlt, setAltImage] = React.useState(null)
	const [imageAlt1, setAltImage1] = React.useState(null)

	const onEditItem=()=>{
		setEnableEditing(true)
	}
	const onSubmit=()=>{
		let data = {
			'name': name,
			'price': price,
			'categories': categories,
			'description': description,
			'stock': stock,
			'unit': unit,

		}
		onUpdateProduct(item.id, data)
		setEnableEditing(false)
	}
	return (
		<Alert className="Item">
			<Container id='item'>
				<Row>
					<Col><div><img src={item.image} alt={item.name}/></div></Col>
					<Col><td><b>Name: </b>{item.name}</td></Col>
					<Col><td><b>Stock: </b>{item.stock}</td></Col>
					<Col><td><b>Price: </b>{item.price}</td></Col>
					<Col><Button onClick={onEditItem}>Edit</Button></Col>
					<Col><Button variant='danger' onClick={()=>onDeleteProduct(item.id)}>Delete</Button></Col>
				</Row>
				{enableEditing ?(
				<Container>
				<Row>
					<Alert >
					<center><b><h4>Update Product</h4></b></center>
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
					):(null)}
			</Container>
		</Alert>
	);
}
	
export default ProductItem;