import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import {Link } from 'react-router-dom';

const AdminAccountItem = ({user, logout}) => (
  <>{user === null ?(null):(
    <Dropdown className="d-inline mx-2">
    <Dropdown.Toggle id="dropdown-autoclose-true">
      Accounts
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item><Link to="/changePassword">Change Password</Link></Dropdown.Item>
      <Dropdown.Item onClick={()=>logout()}><Link to="/">logout {user}</Link></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    )}
	</>
	);
export default AdminAccountItem;