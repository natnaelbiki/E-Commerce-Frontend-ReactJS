import React from 'react';
import {Form, Container, Button, Alert, Row, Col} from 'react-bootstrap';
import './editProfile.css'
import Axios from 'axios'


const EditProfile = ({token, user, udata,onUserUpdated}) => {
  const [firstName, setFirstName] = React.useState(udata.first_name)
  const [middleName, setMiddleName] = React.useState(udata.middle_name)
  const [lastName, setLastName] = React.useState(udata.last_name)
  const [woreda, setWoreda] = React.useState(udata.woreda)
  const [region, setRegion] = React.useState(udata.region)
  const [zone, setZone] = React.useState(udata.zone)
  const [city, setCity] = React.useState(udata.city)
  const [kebelle, setKebelle] = React.useState(udata.kebelle)
  const [phone, setPhone] = React.useState(udata.Phone)
  const [errorFN, setErrorFn] = React.useState("")
  const [errorMN, setErrorMn] = React.useState("")
  const [errorLN, setErrorLn] = React.useState("")
  const [errorR, setErrorR] = React.useState("")
  const [errorZ, setErrorZ] = React.useState("")
  const [errorC, setErrorC] = React.useState("")
  const [errorW, setErrorW] = React.useState("")
  const [errorK, setErrorK] = React.useState("")
  const [errorP, setErrorP] = React.useState("")

  const [message, setMessage] = React.useState('')
  const [enableEditing, setEnableEditing] = React.useState(false);

  const onEditProfile=()=>{
    setEnableEditing(true)
    setMessage('')
  }

   const onChangeFirstName = e => {
    const first_name = e.target.value;
    setFirstName(first_name);
    handleFNValidation(first_name)
    //UserEditProfileValidater.onValidateFirstName(first_name)
  }
  const handleFNValidation=(name)=>{
    if(!name){
      setErrorFn(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorFn(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorFn("")
      }
    }

  }

  const handleMNValidation=(name)=>{
    if(!name){
      setErrorMn(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorMn(" *only letters allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorMn("")
      }
    }

  }
  const handleLNValidation=(name)=>{
    if(!name){
      setErrorLn(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorLn(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorLn("")
      }
    }

  }
  //include space validation in re
  const handleRegionValidation=(name)=>{
    if(!name){
      setErrorR(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorR(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorR("")
      }
    }

  }

    //include space validation in re
const handleZoneValidation=(name)=>{
    if(!name){
      setErrorZ(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+[ ]$/)){
        setErrorZ(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorZ("")
      }
    }

  }
    //include space validation in re
  const handleCityValidation=(name)=>{
    if(!name){
      setErrorC(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorC(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorC("")
      }
    }

  }

  const handleWoredaValidation=(name)=>{
    if(!name){
      setErrorW(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[a-zA-z]+$/)){
        setErrorW(" *Only Letters Allowed")
      }
      else if(name.match(/^[a-zA-z]+$/)){
        setErrorW("")
      }
    }

  }

  const handleKebelleValidation=(name)=>{
    if(!name){
      setErrorK(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(!name.match(/^[0-9]+$/)){
        setErrorK(" *Only Numbers Allowed")
      }
      else if(name.match(/^[0-9]+$/)){
        setErrorK("")
      }
    }

  }
  const handlePhoneValidation=(name)=>{
    alert(name.length())
    if(!name){
      setErrorP(" *can't be empty")
    }
    else if (typeof name !== "undefined"){
      if(name.match(/^[0-9]+$/)){
        setErrorP("")
      }
      else if (name.match(/^[0-9]+$/) && name.length()!==10){
        setErrorP(" *too short")
      }
      else if(!name.match(/^[0-9]+$/)){
        setErrorP(" *Only Numbers Allowed")
      }
    }

  }
  const onChangeMiddleName = e => {
    const middle_name = e.target.value;
    setMiddleName(middle_name);
    handleMNValidation(middle_name)
  }
  
    const onChangeLastName = e => {
    const _name = e.target.value;
    setLastName(_name);
    handleLNValidation(_name)
  }

  const onChangeRegion = e => {
    const _region = e.target.value;
    setRegion(_region)
    handleRegionValidation(_region)
  }
  const onChangeZone = e => {
    const _zone = e.target.value;
    setZone(_zone);
    handleZoneValidation(_zone)
  }

  const onChangeCity = e => {
    const _city = e.target.value;
    setCity(_city);
    handleCityValidation(_city)
  }
  const onChangeWoreda = e => {
    const _woreda = e.target.value;
    setWoreda(_woreda);
    handleWoredaValidation(_woreda)
  }

  const onChangeKebelle = e => {
    const _kebelle = e.target.value;
    setKebelle(_kebelle);
    handleKebelleValidation(_kebelle)
  }


  const onChangePhone = e => {
    const _phone = e.target.value;
    setPhone(_phone);
    handlePhoneValidation(_phone)
  }
  const onSubmit=()=>{
    let data = {
      "first_name": firstName, 
      "middle_name": middleName, 
      "last_name": lastName, 
      "region": region, 
      "zone": zone, 
      "city": city, 
      "woreda": woreda, 
      "kebelle": "1", 
      "Phone": 930600822}
   Axios.post("http://localhost:8000/api/usereditprofile/"+udata.id, data).then(res=>{
      onUserUpdated()
      setMessage(res.data.message)
      setEnableEditing(false)
    }).catch(err=>{
      setMessage(err.toString())
      console.log(err);
    });
  }
  return(
    <>
    {token === null ?(
      <Alert variant="warning"><center><b>You Should Login</b></center></Alert>
    ):(
        <Container className="form-container">    
          {enableEditing?(
          <>
          <Alert>
            <center><b><h4>Edit Profile</h4></b></center>
          </Alert>
          <Alert>
            <center><b><h5>Edit Personal Information</h5></b></center>
          </Alert>
          <Row>
          <Col>
          <Alert variant={errorFN === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorFN === "" ? ("primary"):("danger")}><center><b>First Name</b><span>{errorFN}</span></center></Alert>
                <Form.Control refs="firstName" type="text" placeholder="Your First Name" value={firstName} onChange={onChangeFirstName} />
              </Alert>
          </Col>
          <Col>
          <Alert variant={errorMN === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorMN === "" ? ("primary"):("danger")}><center><b>Middle Name</b><span>{errorMN}</span></center></Alert>
                <Form.Control type="text" placeholder="Your Middle Name" value={middleName} onChange={onChangeMiddleName} />
              </Alert>
          </Col>

          <Col>
          <Alert variant={errorLN === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorLN === "" ? ("primary"):("danger")}><center><b>Last Name</b><span>{errorLN}</span></center></Alert>
                <Form.Control type="text" placeholder="Your Last Name" value={lastName} onChange={onChangeLastName}/>
              </Alert>
          </Col>
          </Row>
          <Alert>
            <center><b><h5>Edit Address Information</h5></b></center>
          </Alert>
          <Row>
          <Col>
          <Alert variant={errorR === "" ? ("primary"):("danger")} className="mb-3">
              <Alert variant={errorR === "" ? ("primary"):("danger")}><center><b>Region</b><span>{errorR}</span></center></Alert>
              <Form.Control type="text" placeholder="Your region" value={region} onChange={onChangeRegion}/>
              </Alert>
          </Col>
          <Col>
      <Alert variant={errorZ === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorZ === "" ? ("primary"):("danger")}><center><b>Zone</b><span>{errorZ}</span></center></Alert>
                <Form.Control type="text" placeholder="Your zone" value={zone} onChange={onChangeZone}/>
              </Alert>
          </Col>
          <Col>
          <Alert variant={errorC === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorC === "" ? ("primary"):("danger")}><center><b>City</b><span>{errorC}</span></center></Alert>
                <Form.Control type="text" placeholder="Your city" value={city} onChange={onChangeCity}/>
              </Alert>
          </Col>
          </Row>
          <Row>
          <Col>
      <Alert variant={errorW === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorW === "" ? ("primary"):("danger")}><center><b>Woreda</b><span>{errorW}</span></center></Alert>
                <Form.Control type="number" placeholder="Your Woreda" value={woreda} onChange={onChangeWoreda}/>
              </Alert>
          </Col>
          <Col>
          <Alert variant={errorK === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorK === "" ? ("primary"):("danger")}><center><b>Kebelle</b><span>{errorK}</span></center></Alert>
                <Form.Control type="number" placeholder="Your Kebelle" value={kebelle} onChange={onChangeKebelle}/>
              </Alert>
          </Col>
          <Col>
          <Alert variant={errorP === "" ? ("primary"):("danger")} className="mb-3">
                <Alert variant={errorP === "" ? ("primary"):("danger")}><center><b>Phone Number</b><span>{errorP}</span></center></Alert>
                <Form.Control type="text" placeholder="Your Phone Number" value={phone} onChange={onChangePhone} />
              </Alert>
          </Col>
          </Row>
            <Alert>     
              <center>
              <Button className="save-button" variant="primary" onClick={()=>onSubmit()}>
                Save
              </Button>
              </center>
              
            </Alert>
          </>
            ):(
           <Container>
           <Alert>
                        <h4><center><b>Current Information</b></center></h4>
            </Alert>
           <Row>
           <Col>
           <Alert>
      <h5><center><b>Personal Information</b></center></h5></Alert>
      <Alert>
      <h6><center><b>First name:</b> {udata.first_name}</center></h6>
      <br/>
      <h6><center><b>Middle name:</b> {udata.middle_name}</center></h6><br/>
      <h6><center><b>Last name:</b> {udata.last_name}</center></h6><br/>
           </Alert>
           </Col>
           <Col>
      <Alert>
      <h5><center><b>Address</b></center></h5></Alert><Alert>
      <h6><center><b>Region:</b> {udata.region}</center></h6>          
      <h6><center><b>Zone:</b> {udata.zone}</center></h6>
      <h6><center><b>City:</b> {udata.city}</center></h6>
      <h6><center><b>Woreda:</b> {udata.woreda}</center></h6>
      <h6><center><b>Kebelle:</b> {udata.kebelle}</center></h6>
      <h6><center><b>Phone:</b> {udata.Phone}</center></h6>
      </Alert>
      </Col>
      </Row>
      <Alert>                 
        <center>
          <Button onClick={()=>onEditProfile()} >Edit Profile</Button>
        </center>
      </Alert>
      </Container>
      )}    
      {message==="" ? (null):(<Alert><center><b>{message}</b></center></Alert>)}
      </Container>
    )}
    </>
   )
}
export default EditProfile;
