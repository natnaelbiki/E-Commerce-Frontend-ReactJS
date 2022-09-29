import axios from 'axios';
const BaseURL = "http://127.0.0.1:8000";



class ProductService{
	login(data){
		return axios.post(BaseURL+"/api/login/", data);
	}
	signup(data){
		return axios.post(BaseURL+"/api/signup/", data);
	}
	viewOrders(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/ordereditems/", data)
	}

	newOrder(token, data){
	axios.defaults.headers.common["Authorization"] = "Token " + token
	return axios.post(BaseURL+"/api/neworder/", data)
	}
	changePassword(token, data){
		axios.defaults.headers.common["Authorization"] = "Token" + token
		return axios.post(BaseURL+"/api/changepassword/", data)
	}
	
	deleteOrderItem(token, id){
	axios.defaults.headers.common["Authorization"] = "Token " + token
	return axios.delete(BaseURL + "/api/ordereditems/" + id)
	}

	updateOrderItem(token, id, data){
	axios.defaults.headers.common["Authorization"] = "Token " + token
	return axios.put(BaseURL + "/api/ordereditems/" + id, data)
	}
	
	newOrderItem(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/neworderitem/", data)
	}
	unChatbot(data){
	return axios.post(BaseURL+"/api/chatbott/", data);	
	}
	chatbot(token, data){
	axios.defaults.headers.common["Authorization"] = "Token " + token
	return axios.post(BaseURL+"/api/chatbot/", data);	
	}
	order(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/orders/")
	}
	ItemSeen(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/notification/"+id)
	}
}
export default new ProductService();