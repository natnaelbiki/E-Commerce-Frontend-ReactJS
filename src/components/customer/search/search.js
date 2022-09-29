import React, {useState} from 'react';
import '../item/item.css';
import {Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const SearchPage = ({search}) => {
    const [name, setName] = useState("");

    const onChangeName = e => {
    const name = e.target.value;
    setName(name);
}

      return (<>
        <div className="form-container">
      <Form>
      <Alert><center><b>Search Product</b></center>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Enter product name. . ." value={name} onChange={onChangeName} onClick={()=>search(name)} />
        </Form.Group>
        <Link to="/searchResult">
        <center><Button variant="primary" onClick={()=>search(name)}>
          Search
        </Button></center></Link>
        </Alert>
      </Form>
      <br />
      
      </div>
  </>);
}
export default SearchPage;
