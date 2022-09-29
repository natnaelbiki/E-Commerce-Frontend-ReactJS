import axios from 'axios';
const BaseURL = "http://127.0.0.1:8000";

class ProductService{
	getProducts(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/supplierViewProducts/")
	}
	addProduct(token, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.post(BaseURL+"/api/supplierAddNewProducts/", data)
	}
	updateProduct(token, id, data){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.put(BaseURL+"/api/supplierUpdateProduct/"+id, data)
	}
	deleteProduct(token, id){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.delete(BaseURL+"/api/supplierUpdateProduct/"+id)
	}
	getCategory(token){
		axios.defaults.headers.common["Authorization"] = "Token " + token
		return axios.get(BaseURL+"/api/adminViewCategory/")
	}
	
}
export default new ProductService();