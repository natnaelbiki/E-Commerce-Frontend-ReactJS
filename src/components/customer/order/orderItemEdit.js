import React from 'react';
import {Form, Alert, Button} from 'react-bootstrap';

const EditOrderItem=({item, onFinishUpdate})=>{
	const[quantity, setQuantity] = React.useState(item.quantity)
	const onChangeQuantity=e=>{
		let _quan = e.target.value
		setQuantity(_quan)
	}
	const onSave=()=>{
		let data = {
			'quantity': quantity
		}
		onFinishUpdate(item.id, data)
	}

	return (
		<>
			{item === null ? (null):(
				<Alert>
					<span>{item.product}</span>
					<Form.Group className="mb-3">
	          		<Form.Label><center><b>Quantity</b></center></Form.Label>
	          		<Form.Control type="number" placeholder="update quantity" value={quantity} onChange={onChangeQuantity} />
	        		</Form.Group>
	        		<Button onClick={onSave}>Save</Button>
	        	</Alert>
			)}
		</>
		)

}
export default EditOrderItem;