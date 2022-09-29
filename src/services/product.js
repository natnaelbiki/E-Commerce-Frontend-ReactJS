import axios from 'axios';
const BaseURL = "http://127.0.0.1:8000";

class ProductService{
	getAll(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/")
	}
	home(){
		return axios.get(BaseURL+"/api/")
	}

	recent(){
		return axios.get(BaseURL+"/api/recent")
	}
		getUserProfile(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/user/"+id)

	}
	getNotifications(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/notification/")		
	}
	getTransactions(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/transaction/")		
	}
	userEditProfile(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/usereditprofile/"+id, data)
	}

	login(data){
		return axios.post(BaseURL+"/api/login/", data);
		}
	signup(data){
		return axios.post(BaseURL+"/api/newuser/", data);
		}

	getCategory(){
		return axios.get(BaseURL+"/api/category/");
	}
	viewOrders(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/orders/", data)
	}
	viewOrderedProducts(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/ordereditems/", data)
	
	}
	newOrder(token, data){}
	newOrderItem(token, data){}

	chatbot(token, data){
	axios.defaults.headers.common["Authorization"] = "Token " + token
	return axios.post(BaseURL+"/api/chatbot/", data);	
	}
	
}
export default new ProductService();