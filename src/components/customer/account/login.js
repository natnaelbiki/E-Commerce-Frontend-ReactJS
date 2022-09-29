import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductService from '../services/product.js';
import {Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';


const Login = props => {
		
		const [username, setUsername] = useState("");
		const [unError, setUNError] = useState('')
		const [isUNValid, setIsUNValid] = useState(false)

		const [password, setPassword] = useState("");
		const [pError, setPError] = useState('')
		const [isPValid, setIsPValid] = useState(false) 
		
		const [error, setError] = useState(null)
		const [status, setStatus] = useState(5)
		

		const onChangeUsername = e => {
		const user_name = e.target.value;
		setUsername(user_name);
		handleUNValidation(user_name)
	}
		const onChangePassword = e => {
		const _password = e.target.value;
		setPassword(_password);
		handlePasswordValidation(_password)
	}

	const handleUNValidation=(name)=>{
   			if(!name){
      			setUNError(" *can't be empty")
    		}
    		else if (typeof name !== "undefined"){
      			if(!name.match(/^[a-zA-z]+$/)){
        			setUNError(" *Only Letters Allowed")
      			}
      			else if(name.match(/^[a-zA-z]+$/)){
        			setUNError("")
        			setIsUNValid(true)
      			}
      		}
      	}

      	const handlePasswordValidation=(name)=>{
   			if(!name){
      			setPError(" *can't be empty")
    		}
    		else if (typeof name !== "undefined"){
      			if(name.length <= 7){
        			setPError(" *too short")
      			}
      			else if(name.length >= 8){
        			setPError("")
        			setIsPValid(true)
      			}
      		}
      	}

		const onLogin = () => {
			handleUNValidation(username)
			handlePasswordValidation(password)
			if (isUNValid && isPValid) {
				let data = {
				'username': username,
				'password': password
				}
				ProductService.login(data).then(res=>{
					let status = res.data.status
					setStatus(status)
	      			if (status === 0) {
	      				setUNError(res.data.message)
	      			}
	      			else if (status === 2) {
	      				setPError(res.data.message)
	      			}
	      			else if (status === 3) {
	      				setError(res.data.message)
	      			}
	      			else if(status===1){
	      				let token = res.data.token
	      				let id = res.data.id
	      				let oid = res.data.oid
	      				let role = res.data.role
	      				props.login({username: username, token: token, id: id, oid: oid, role: role})
	      				props.history.push('/');
	      			}
				}).catch(err=>{
					alert(err)
				})
				}
			else{
				alert("Invalid Data Please Correct the error")
				setStatus(0)
			}
			
			//login({username: username, password: password});
	}
	return(
		<Container className="form-container">
			<Row>
				<Alert variant={status === 3 ? ('danger'):('primary')}>
					<center><b><h4>Login</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					<Alert variant={status === 0 ? ('danger'):('primary')}>
						<center><b>Enter Your Username</b></center>
						<Form.Control type="text" placeholder="Enter username" value={username} onChange={onChangeUsername} />
						<span style={{color: 'red'}}><center>{unError !== ''? (unError):(null)}</center></span>
					</Alert>
				</Col>
				<Col>
					<Alert variant={status === 2 ? ('danger'):('primary')}>
						<center><b>Enter Your Password</b></center>
						<Form.Control type="password" placeholder="Enter password" value={password} onChange={onChangePassword} />
						<span style={{color: 'red'}}><center>{pError !== ''? (pError):(null)}</center></span>
					</Alert>
				</Col>
			</Row>
			<Row>
				<Alert>
					<center>
						<Button variant={status === 3 || status=== 0 || status === 2 ? ('danger'):("primary")} onClick={onLogin}>
							Login
						</Button>
					</center>
				</Alert>
			</Row>
		</Container>
	)
}
export default Login;