import React from 'react';
import ProductService from '../services/product.js';
import Button from 'react-bootstrap/Button';

const NotifItem=({item, token, updateNotifications})=>{
	const[seeDetail, setSeeDetail] = React.useState(false)
	const itemSeen=(id)=>{
		ProductService.ItemSeen(token, id).then(res=>{
			updateNotifications()
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
						<span>{item.message}</span>
						):(null)}
					<p onClick={()=>itemSeen(item.id)}><center>{item.age}</center></p>
				</div>
			)}
		</>
		)

}
export default NotifItem;