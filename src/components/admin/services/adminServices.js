import axios from 'axios';
const BaseURL = "http://127.0.0.1:8000";

class ProductService{
	getProducts(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminViewProducts/")
	}
	addProduct(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/adminAddNewProducts/", data)
	}
	updateProduct(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/adminUpdateProduct/"+id, data)
	}
	deleteProduct(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.delete(BaseURL+"/api/adminUpdateProduct/"+id)
	}

	getCategory(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminViewCategory/")
	}
	addCategory(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/adminAddCategory/", data)
	}
	updateCategory(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/adminUpdateCategory/"+id, data)
	}
	deleteCategory(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.delete(BaseURL+"/api/adminUpdateCategory/"+id)
	}
	getOrders(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminOrderView/")
	}
	addOrders(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/adminNewOrder/", data)
	}
	updateOrders(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/adminUpdateOrder/"+id, data)
	}
	deleteOrders(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.delete(BaseURL+"/api/adminUpdateOrder/"+id, data)
	}
	getUsers(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminUserView/")
	}
	addUsers(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/adminNewUser/", data)
	}
	updateUsers(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/adminUpdateUser/"+id, data)
	}
	deleteUsers(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.delete(BaseURL+"/api/adminUpdateUser/"+id)
	}
	getTags(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminTagView/")
	}
	getTokens(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminTokenView/")
	}
	getUserMessages(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminUserMessageView/")
	}		
}
export default new ProductService();