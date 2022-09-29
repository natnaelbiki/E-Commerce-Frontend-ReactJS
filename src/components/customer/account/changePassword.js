import React from 'react';
import '../item/item.css';
import 'react-bootstrap';
import {Button, Alert, Container, Col, Row, Form} from 'react-bootstrap';
import Axios from 'axios';

const ChangePassword = ({user, udata, token}) => {
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [verifyPassword, setVerifyPassword] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)
  const [status, setStatus] = React.useState(0)
  const [message, setMessage] = React.useState("")

  const onChangeOldPassword = e => {
    const password = e.target.value;
    setOldPassword(password);
  }

  const onChangeNewPassword = e => {
    const username = e.target.value;
    setNewPassword(username);
  }
    const onChangeVerifyPassword = e => {
    const password = e.target.value;
    setVerifyPassword(password);
  }

  const onSubmit=()=>{
    if (oldPassword==='') {
      alert("old Password is empty")
    }
    if (newPassword===''){
      alert("new Password is empty")
    }
    if (verifyPassword===''){
      alert("Confirm Password is empty")
    }
    if (newPassword!==verifyPassword){
      alert("new Password is didnt")
    }
    if(oldPassword !== "" && newPassword === verifyPassword){
      let data = {
        'uid': udata.id,
        'old_password': oldPassword,
        'password': newPassword
      }
      alert(data.uid)
      Axios.defaults.headers.common["Authorization"] = "Token " + token
      Axios.post("http://127.0.0.1:8000/api/changepassword/", data).then(res=>{
        setStatus(res.data.status)
        setMessage(res.data.message)
        setSubmitted(true)
      }).catch(err=>{
        alert(err.toString())
        setMessage(err.toString())
      })
      alert("submitted")
    }
  }

  return(
   <Container>
   {user === null ?(null):(
    <div className="form-container">
    {submitted ? (
      <Alert>{message}</Alert>
      ):(
        <Container>
        <Alert><center><h2>Change Password</h2></center></Alert>
        <Row>
          <Alert className="mb-3">
          <Form.Label><center><b>Old Password</b></center></Form.Label>
          <Form.Control type="password" placeholder="Enter old password" value={oldPassword} onChange={onChangeOldPassword} />
        </Alert>
        </Row>
        <Row>
        <Col>
        <Alert className="mb-3">
          <Form.Label><b>New Password</b></Form.Label>
          <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={onChangeNewPassword} />
        </Alert>
        </Col>
        <Col>
        <Alert className="mb-3">
          <Form.Label><b>Confirm New Password</b></Form.Label>
          <Form.Control type="password" placeholder="Confirm new password" value={verifyPassword} onChange={onChangeVerifyPassword} />
        </Alert>
        </Col>
        </Row>
        <Alert>
        <center>
        <Button variant="primary" onClick={()=>onSubmit()}>
          Change Password
        </Button>
        </center>
      </Alert>
    </Container>
      )}
    </div>
    )}
  </Container>
   )
  }
export default ChangePassword;