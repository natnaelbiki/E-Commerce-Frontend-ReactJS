import React from 'react';
import '../item/item.css';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link } from 'react-router-dom';

const CategoryList = ({category, onCategorySelected}) => (
	<Dropdown className="d-inline mx-2">
    <Dropdown.Toggle id="dropdown-autoclose-true">
      Categories
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {category.map(item=><>
      
      <Dropdown.Item onClick={()=>onCategorySelected(item.id)}><Link to="/category">{item.name}</Link></Dropdown.Item>  
     </> )}      
      
     </Dropdown.Menu>
  </Dropdown>
	);
export default CategoryList;