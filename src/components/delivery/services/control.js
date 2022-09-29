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
                "owner": items[x].order,
                'address': items[x].address,
                'age': items[x].created_at,
                "quantity": items[x].quantity,
                "paid": items[x].paid,
                "status": items[x].status
              }
              s = [...s, sl]
            }
            return s
	}
AddressItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "region": items[x].region,
                "zone": items[x].zone,
                "city": items[x].city,
              }
              s = [...s, sl]
            }
            return s
  }

  TagItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "id": items[x].id,
                "method": items[x].method,
                "description": items[x].description,
                'patterns': this.PatternItemMap(items[x].patterns)
              }
              s = [...s, sl]
            }
            return s
  }

  PatternItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "id": items[x].id,
                "string": items[x].string,
              }
              s = [...s, sl]
            }
            return s
  }

  UserItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "id": items[x].id,
                "username": items[x].username,
              }
              s = [...s, sl]
            }
            return s
  }
  UserMessageItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "id": items[x].id,
                "message": items[x].message,
                'age': items[x].timestamp,
                'identified_tag': items[x].identified_tag,
                'correct_tag': items[x].correct_tag,
              }
              s = [...s, sl]
            }
            return s
  }
  TokenItemMap(items){
    let s = []
    for(var x in items){
              let sl = {
                "id": items[x].id,
                "token": items[x].token,
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