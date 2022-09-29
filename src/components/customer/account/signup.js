import React, {useState} from 'react';
import {Form, Container, Button, Alert, Row, Col} from 'react-bootstrap';
import ProductService from '../services/product.js';

const Signup = props => {
		const [username, setUsername] = useState("");
		const [errorUN, setErrorUN] = useState("")
		const [isUNValid, setIsUNValid] = useState(false) 

		const [email, setEmail] = useState("");
		const [errorE, setErrorE] = useState("")
		const [isEValid, setIsEValid] = useState(false) 
		
		const [password, setPassword] = useState("");
		const [errorP, setErrorP] = useState("")
		const [isPValid, setIsPValid] = useState(false) 
		
		const [password2, setPassword2] = useState("");
		const [errorP2, setErrorP2] = useState("")
		const [isP2Valid, setIsP2Valid] = useState(false) 
		
		const[error, setError] = useState(null)
		const[status, setStatus] = useState(null)


		const onChangeUsername = e => {
			const username = e.target.value;
			setUsername(username);
			handleUNValidation(username)
		}

		const onChangeUserEmail = e => {
			const email = e.target.value;
			setEmail(email);
			handleEmailValidation(email)
		}

		const handleUNValidation=(name)=>{
   			if(!name){
      			setErrorUN(" *can't be empty")
    		}
    		else if (typeof name !== "undefined"){
      			if(!name.match(/^[a-zA-z]+$/)){
        			setErrorUN(" *Only Letters Allowed")
      			}
      			else if(name.match(/^[a-zA-z]+$/)){
        			setErrorUN("")
        			setIsUNValid(true)
      			}
      		}
      	}

      	const handlePasswordValidation=(name)=>{
   			if(!name){
      			setErrorP(" *can't be empty")
    		}
    		else if (typeof name !== "undefined"){
      			if(name.length <= 7){
        			setErrorP(" *too short")
      			}
      			else if(name.length >= 8){
        			setErrorP("")
        			setIsPValid(true)
      			}
      		}
      	}

		const handleEmailValidation=(email)=>{
    		if (typeof email !== "undefined") {
      			let lastAtPos = email.lastIndexOf("@");
      			let lastDotPos = email.lastIndexOf(".");
      			if(email.length === 0){
      				setErrorE(" *can't be empty")
      			}
      			else if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf("@@") === -1 && lastDotPos > 2 && email.length - lastDotPos > 2)){
      				setErrorE(" *is not valid");
      			}
      			else{
      				setErrorE("");
      				setIsEValid(true)
      			}
      		}
      	}

      	const handleP2Validation=(name)=>{
    		if(!name){
      			setErrorP2(" *can't be empty")
    		}
    		else if (typeof name !== "undefined"){
      			if(name.length <= 7){
        			setErrorP2(" *too short")
      			}
      			else if(name !== password){
      				setErrorP2(" *didnt match")
      			}
      			else if(name.length >= 8 && name === password){
        			setErrorP2("");
        			setIsP2Valid(true)
      			}
      		}
      	}
			const onChangePassword = e => {
			const password = e.target.value;
			setPassword(password);
			handlePasswordValidation(password)
		}
		const onChangePassword2 = e => {
			const password2 = e.target.value;
			setPassword2(password2);
			handleP2Validation(password2)
		}
		const signup = () => {
			handleUNValidation(username)
			handleEmailValidation(email)
			handlePasswordValidation(password)
			handleP2Validation(password2)
			const data = {
				"username": username,
				"email": email,
				"password": password,
			}
			if(isUNValid && isEValid && isPValid && isP2Valid){
				ProductService.signup(data).then(res=>{
					setStatus(res.data.status)
					let status = res.data.status
					if (status === 1) {
						let token = res.data.token
						let user = username
						let id = res.data.id
						let oid = res.data.oid
						let role = res.data.role
						if (role === 'customer') {
							let balance = res.data.balance;
							props.login({username: username, token: token, id: id, oid: oid, role: role, balance: balance})
							props.history.push('/');
						}
						props.login({username: username, token: token, id: id, oid: oid, role: role})
						props.history.push('/');
					}
					else if(status === 2){
						setErrorUN(res.data.message)
					}
					
				}).catch(err=>{
					alert(err.toString())
				})
				//props.signup({username: username, password: password}, data)
        		//props.history.push('/');	
			}
			else{
				alert("Invalid Data Please Correct the error")
			}
		}
	return(
		<Container>
			<Row>
				<Alert>
					<center><b><h4>Signup</h4></b></center>
				</Alert>
			</Row>
			<Row>
				<Col>
					<Alert variant={errorUN === "" ? ("primary"):("danger")} className="mb-3">
						<Alert variant={errorUN === "" ? ("primary"):("danger")}><center><b>Username</b><span>{errorUN}</span></center></Alert>
						<Form.Control type="text" placeholder="Enter your username" value={username} onChange={onChangeUsername} />
					</Alert>
				</Col>
				<Col>
					<Alert variant={errorE === "" ? ("primary"):("danger")} className="mb-3">
						<Alert variant={errorE === "" ? ("primary"):("danger")}><center><b>Email</b><span>{errorE}</span></center></Alert>
						<Form.Control type="text" placeholder="Enter email..." value={email} onChange={onChangeUserEmail} />
					</Alert>
				</Col>
			</Row>
			<Row>
				<Col>
					<Alert variant={errorP === "" ? ("primary"):("danger")} className="mb-3">
						<Alert variant={errorP === "" ? ("primary"):("danger")}><center><b>New Password</b><span>{errorP}</span></center></Alert>
						<Form.Control type="password" placeholder="Insert new password" value={password} onChange={onChangePassword} />
					</Alert>
				</Col>
				<Col>
					<Alert variant={errorP2 === "" ? ("primary"):("danger")} className="mb-3">
						<Alert variant={errorP2 === "" ? ("primary"):("danger")}><center><b>Confirm Password</b><span>{errorP2}</span></center></Alert>
						<Form.Control type="password" placeholder="Confirm new password" value={password2} onChange={onChangePassword2} />
					</Alert>
				</Col>
			</Row>
			<Row>
				<Alert>
					<center>
						<Button variant={status===2?('danger'):("primary")} onClick={signup}>
							Signup
						</Button>
					</center>
				</Alert>
			</Row>
		</Container>
	)
}
export default Signup;