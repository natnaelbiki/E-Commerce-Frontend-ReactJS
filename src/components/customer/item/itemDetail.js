import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import {Link } from 'react-router-dom';


const ItemDetail = ({item, onAddToCart, onOrderItem}) => {
	const[seeMore, setSeeMore] = React.useState(false)
	const onSeeMore=()=>{
		let state = seeMore
		if (state) {
			setSeeMore(false)
		}
		else if (!state){
			setSeeMore(true);
		}
		
	}
	return(
		<Alert>
	<Container>
		<Row>
			<div className="Item-title">
				<h5>{item.name}</h5>
			</div>
		</Row>
		<Row>
			<div className="Item-left">
				<div className="Item-image">
						<img className="image" src={item.image} alt={item.name}/>
				</div>
			</div>
		</Row>
		<Row>
		<div className='Item-Right'>
				<b>{item.description}</b>
				<div className="Item-price">
					<b>Price: {item.price} Birr</b>
				</div>
			</div>
			<Col md='4'>
			<Button onClick={onSeeMore}>{seeMore ? ('Minimize'):('More Pictures')}</Button><> </>
			<Button onClick={()=>onAddToCart(item)}>+Cart</Button><> </>
			<Link to={"/itemorder"}>
			<Button onClick={()=>onOrderItem(item)}>Order</Button>
			</Link>
			</Col>
		</Row>
	<Row>
	
	</Row>
	{seeMore ? (
		<Row md='2'>
	<Col md='4'>
				<div className="Item-image"><img className="image" src={item.image_alt} alt={item.name}/></div>
	</Col>
	<Col md='4'>
				<div className="Item-image"><img className="image" src={item.image_alt1} alt={item.name}/></div>
	</Col>
	</Row>
		):(null)}
	
	</Container>
	</Alert>
		)

}

	

	ItemDetail.propTypes = {
		item: PropTypes.object.isRequired,
	};
export default ItemDetail;