import React from 'react';
import ProductService from '../services/product.js';
import Button from 'react-bootstrap/Button';

const TransItem=({item, token, updateTransaction})=>{
	const[seeDetail, setSeeDetail] = React.useState(false)
	const itemSeen=(id)=>{
		ProductService.ItemSeen(token, id).then(res=>{
			updateTransaction()
		}).catch(err=>{
			alert(err)
		})

	}
	const onSeeDetail=()=>{
		if (seeDetail) {
			setSeeDetail(false)
		}
		else{
			setSeeDetail(true)
		}
	}
	return (
		<>
			{item === 0 ? (null):(
				<div className='notifItem' id="notifItem">
					<center><a onClick={onSeeDetail}>{item.action}</a></center>
					{seeDetail ? (
						<span>{item.action.includes('Payment') ? (
							<>{item.amount} is deducted from your account, Your current {'Bal'} is. {item.current_balance}</>
							):(item.action.includes('Refund') ? (
							<>{item.amount} is refunded to your account, Your current {'Bal'} is. {item.current_balance}</>
							):(null))}</span>
						):(null)}
					<p onClick={()=>itemSeen(item.id)}><center>{item.age}</center></p>
				</div>
			)}
		</>
		)

}
export default TransItem;