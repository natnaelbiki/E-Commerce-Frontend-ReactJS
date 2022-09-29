import axios from 'axios';
const BaseURL = "http://127.0.0.1:8000";

class ProductService{
	
	getOrders(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/deliveryViewOrders/")
	}
	updateOrders(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/deliveryUpdateOrder/"+id, data)
	}
	
}
export default new ProductService();