class ControlService{
	NotifItemMap(items){
		let s = []
          for(var x in items){
              let sl = {
                "id": items[x].id,
                "action": items[x].action,
                "message": items[x].message,
                'date': items[x].created
              }
              s = [...s, sl]
            }
            //some sorting with s array by date
        return s
	}
	OrderItemMap(items){
		let s = []
		for(var x in items){
              let sl = {
                "id": items[x].id,
                "product": items[x].product,
                "price": items[x].price,
                "quantity": items[x].quantity,
                "paid": items[x].paid,
                "status": items[x].status
              }
              s = [...s, sl]
            }
            return s
	}
  NotifItemSort(items){
    //do some sorting for the items
  }
}
export default new ControlService();