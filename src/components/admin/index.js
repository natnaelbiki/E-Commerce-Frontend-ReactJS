import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Alert } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import ProductService from './services/adminServices.js'
import ControlService from './services/control.js'
import Axios from 'axios';
import ProductItem from './products/ProductItem.js'
import AddNewProduct from './products/addnewproduct.js'
import CategoryItem from './categories/categoryItem.js';
import AddNewCategory from './categories/newcategory.js';
import OrderItem from './orders/orderItem.js';
import AddNewOrder from './orders/addneworder.js'
import TagItem from './chatbot/tagItem.js';
import TokenItem from './chatbot/tokenItem.js';
import UserMessageItem from './chatbot/userMesageItem.js';
import UserItem from './users/userItem.js';
import AddNewUser from './users/newuser.js';

const AdminMainPage=({token})=> {
  const [products, setProducts] = React.useState([])
  const [seeProducts, setSeeProducts] = React.useState(false)
  const [addproduct, setAddProduct] = React.useState(false)

  const [category, setCategory] = React.useState([])
  const [seeCategory, setSeeCategory] = React.useState(false)
  const [addCategory, setAddCategory] = React.useState(false)

  const [orders, setOrders] = React.useState([])
  const [seeOrders, setSeeOrders] = React.useState(false)
  const [addOrder, setAddOrder] = React.useState(false)

  const [users, setUsers] = React.useState([])
  const [seeUsers, setSeeUsers] = React.useState(false)
  const [addUser, setAddUser] = React.useState(false)

  const [userMessages, setUserMessages] = React.useState([])
  const [seeUserMessages, setSeeUserMessages] = React.useState(false)

  const [tags, setTags] = React.useState([])
  const [seeTags, setSeeTags] = React.useState(false)

  const [tokens, setTokens] = React.useState([])
  const [seeTokens, setSeeTokens] = React.useState(false)

  const onUpdateProduct=(id, data)=>{
    ProductService.updateProduct(token, id, data).then(res=>{
      alert(res.data.message)
      if (res.data.status === 1) {
        onViewProducts()
      }
    }).catch(err=>{
      alert(err.toString())
    })
  }

   const onDeleteProduct=(id)=>{
    let isSure = window.confirm("Are You Sure You Want to delete this item ?")
    if (!isSure) {
      onViewProducts()
    }
    else{
        ProductService.deleteProduct(token, id).then(res=>{
          alert(res.data.message)
          if (res.data.status === 1) {
            onViewProducts()
          }
        }).catch(err=>{
          alert(err.toString())
        })}
  }


  const onViewProducts=()=>{
    if (!seeProducts) {ProductService.getProducts(token).then(res=>{
          setProducts(res.data)
          setSeeProducts(true)
          ProductService.getCategory(token).then(res=>{
          setCategory(res.data)
          //alert(res.data.length)
          //setSeeCategory(true)
        }).catch(err=>{
          alert(err.toString())
        })
        }).catch(err=>{
          alert(err.toString())
        })}
        else setSeeProducts(false)
  }
  const onFinishViewProduct=()=>{
    setSeeProducts(false)
  }
  const onAddNewProduct=()=>{
    if(!addproduct){ProductService.getCategory(token).then(res=>{
          setCategory(res.data)
          //alert(res.data.length)
          //setSeeCategory(true)
        }).catch(err=>{
          alert(err.toString())
        })
        setAddProduct(true)}
        else setAddProduct(false)
  }

  

  const onSubmitNewProduct=(data)=>{
    ProductService.addProduct(token, data).then(res=>{
      alert(res.data.message)
      let status = res.data.status
      if (status===1) {setAddProduct(false)}
        if (res.data.status === 1) {
        onViewProducts()
      }
    }).catch(err=>{
      alert(err.toString())
    })
    
  }

  const onSubmitNewOrder=(data)=>{
    ProductService.addOrders(token, data).then(res=>{
      alert(res.data.message)
      let status = res.data.status
      if (status===1) {setAddOrder(false)}
        if (res.data.status === 1) {
        onViewOrders()
      }
    }).catch(err=>{
      alert(err.toString())
    })
    
  }

  const onAddNewCategory=()=>{
    if(!addCategory){setAddCategory(true)}
      else setAddCategory(false)
    }

  const onSubmitNewCategory=(data)=>{
      //alert(data.name)
      ProductService.addCategory(token, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
        onViewCategories()
      }
      }).catch(err=>{
        alert(err.toString())
      })
      setAddCategory(false)
  }

  const onUpdateCategory=(id, data)=>{
      ProductService.updateCategory(token, id, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewCategories();
          }
      }).catch(err=>{
        alert(err.toString())
      });
      setAddCategory(false)
  }

  const onDeleteCategory=(id)=>{
      //alert(id)
      let isSure = window.confirm('Are You Sure You Want to delete this item ?')
      if(isSure){
            ProductService.deleteCategory(token, id).then(res=>{
              alert(res.data.message)
              if (res.data.status === 1) {
              onViewCategories()
            }
            }).catch(err=>{
              alert(err.toString())
            })}
  }

  const onViewOrders=()=>{
    if(!seeOrders){ProductService.getOrders(token).then(res=>{
          //alert(res.data.message)
          let order = ControlService.OrderItemMap(res.data.orders)
          setOrders(order)
          ProductService.getProducts(token).then(res=>{
          setProducts(res.data)
        }).catch(err=>{
          alert(err.toString())
        })
        ProductService.getUsers(token).then(res=>{
          //alert(res.data.users)
          setUsers(ControlService.UserItemMap(res.data.users))
          //setSeeUsers(true)
        }).catch(err=>{
          alert(err.toString())
        })
          setSeeOrders(true)
        }).catch(err=>{
          alert(err.toString())
        })}else setSeeOrders(false)
  }
  const onFinishViewOrders=()=>{
    setSeeOrders(false)
  }
  const onAddNewOrder=()=>{
    setAddOrder(true)
    }
  
  const onUpdateOrder=(id, data)=>{
      alert(data.quantity)
      ProductService.updateOrders(token, id, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewOrders();
          }
      }).catch(err=>{
        alert(err.toString())
      });
      setAddCategory(false)
  }

  const onDeleteOrder=(id)=>{
      alert(id)
      ProductService.deleteOrders(token, id).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
        onViewOrders()
      }
      }).catch(err=>{
        alert(err.toString())
      })
  }

  const onViewUsers=()=>{
    if(!seeUsers) {ProductService.getUsers(token).then(res=>{
          //alert(res.data.users)
          setUsers(ControlService.UserItemMap(res.data.users))
          setSeeUsers(true)
        }).catch(err=>{
          alert(err.toString())
        })
      }
      else
        setSeeUsers(false)
  }
  const onFinishViewUsers=()=>{
    setSeeUsers(false)
  }
  const onAddNewUser=()=>{
    if(!addUser){setAddUser(true)}
      else setAddUser(false)
    }
  const onUpdateUser=(id, data)=>{
      ProductService.updateUsers(token, id, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewUsers();
          }
      }).catch(err=>{
        alert(err.toString())
      });
      setAddCategory(false)
  }
  const onDeleteUser=(id)=>{
      ProductService.deleteUsers(token, id).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewUsers();
          }
      }).catch(err=>{
        alert(err.toString())
      });
      setAddCategory(false)
  }
  const onCancelNewUser = () => {
    setAddUser(false)
  }
  const onSubmitNewUser=(data)=>{
      ProductService.addUsers(token, data).then(res=>{
        alert(res.data.message)
        if (res.data.status === 1) {
          onViewUsers();
          setAddUser(false)
          }
      }).catch(err=>{
        alert(err.toString())
      });
      
  }
 
const onViewCategories=()=>{
   if(!seeCategory){ ProductService.getCategory(token).then(res=>{
         setCategory(res.data)
         //alert(res.data.length)
         setSeeCategory(true)
       }).catch(err=>{
         alert(err.toString())
       })}
       else {setSeeCategory(false)}
  }

   const onFinishViewCategory=()=>{
    setSeeCategory(false)
  }

  const onViewTags=()=>{
    if(!seeTags){ProductService.getTags(token).then(res=>{
          //alert(res.data.tags)
          setTags(ControlService.TagItemMap(res.data.tags))
          //setTags(res.data)
          setSeeTags(true)
        }).catch(err=>{
          alert(err.toString())
        })} else setSeeTags(false)
  }
  const onFinishViewTags=()=>{
    setSeeTags(false)
  }

  const onViewUserMessages=()=>{
    if(!seeUserMessages){ProductService.getUserMessages(token).then(res=>{
          //alert(res.data.tags)
          setUserMessages(ControlService.UserMessageItemMap(res.data.userMessages))
          setSeeUserMessages(true)
        }).catch(err=>{
          alert(err.toString())
        })} else setSeeUserMessages(false)
  }
  const onFinishViewUserMessages=()=>{
    setSeeUserMessages(false)
  }

  const onViewTokens=()=>{
    if(!seeTokens){ProductService.getTokens(token).then(res=>{
          setTokens(ControlService.TokenItemMap(res.data.tokens))
          setSeeTokens(true)
        }).catch(err=>{
          alert(err.toString())
        })} else setSeeTokens(false)
  }
  const onFinishViewTokens=()=>{
    setSeeTokens(false)
  }

  return (
    <Container>
    <Row>
        <Alert><center><h4>Welcome to Ecommerce Admin Page</h4></center></Alert>
    </Row>
    <Row>
        <Alert><center><h4>Products</h4></center></Alert>
        <Alert>
        <center>
        
          <Row><Col><Link onClick={onViewProducts}><h6>All Products</h6></Link>
          </Col><Col></Col><Col></Col><Col></Col>
          <Col>
          </Col>
          <Col><Link onClick={onAddNewProduct}>Add Products</Link></Col>
          <Col>
          </Col><Col></Col>
          </Row>
        </center>
        </Alert>
        {seeProducts ? (
          <>
          {products === [] ? (null):(
          <Row>
            {products.map(item=>
              <ProductItem item={item} category={category} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct}/>
              )}
          </Row>)}
          </>
          ):(null)}
          {addproduct ? (
            <AddNewProduct category={category} onSubmitNewProduct={onSubmitNewProduct}/>
            ):(null)}
        
        <Alert>
        <Row>
        <Col>
        <Link onClick={onViewCategories}><h6>All Categories</h6></Link>
        </Col>
        <Col></Col>
        <Col>
            <Link onClick={onAddNewCategory}>New Category</Link>
        </Col>
        </Row>
        </Alert>
            
        
        {seeCategory ? (
          <>
          {category === [] ? (null):(
          <Row>
            {category.map(item=>
              <CategoryItem item={item} onUpdateCategory={onUpdateCategory} onDeleteCategory={onDeleteCategory}/>
              )}
          </Row>)}
          </>
          ):(null)}
          {addCategory ? (
            <AddNewCategory onSubmitNewCategory={onSubmitNewCategory}/>
            ):(null)}
        
    </Row>
    <Row>
        <Alert><center><h4>Orders</h4></center></Alert>
        <Alert>
        <Link onClick={onViewOrders}><h6>All Orders</h6></Link>
        </Alert>
        {seeOrders ? (
          <>
          {orders === [] ? (null):(
          <Row>
            {orders.map(item=>
              <OrderItem item={item} onUpdateOrder={onUpdateOrder} onDeleteOrder={onDeleteOrder}/>
              )}
          </Row>)}
          </>
          ):(null)}
         
        
    </Row>
    <Row>
        <Alert><center><h4>Users</h4></center></Alert>
        <Alert>
          <Row><Col><Link onClick={onViewUsers}><h6 >All Users</h6></Link>
          </Col><Col></Col>
          <Col>
</Col><Col></Col><Col></Col><Col></Col><Col></Col>
          <Col>
            <Link onClick={onAddNewUser}>Add User</Link>
          </Col><Col>
          </Col><Col></Col>
          </Row>
          </Alert>

        {seeUsers ? (
          <Alert>
          {users === [] ? (null):(
          <Row>
            {users.map(item=>
              <UserItem item={item} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser}/>
              )}
          </Row>)}
          </Alert>
          ):(null)}
          {addUser ? (
            <Alert>
            <AddNewUser onSubmitNewUser={onSubmitNewUser} onCancel={onCancelNewUser}/>
            </Alert>
          ):(null)}
        
    </Row>
    <Row>
        <Alert><center><h4>Chatbot</h4></center></Alert>
        <Alert>
            <Link onClick={onViewTags}><h6>Tags</h6></Link>
          <Row>
          <Col>
          </Col>
          </Row>
          </Alert>
        
        {seeTags ? (
          <>
          {tags === [] ? (null):(
          <Row>
            {tags.map(item=>
              <TagItem item={item}/>
              )}
          </Row>)}
          </>
          ):(null)}
        

        <Alert>
        <Link onClick={onViewTokens}><h6>Tokens</h6></Link>
        </Alert>
        {seeTokens ? (
          <>
          {tokens === [] ? (null):(
          <Row>
            {tokens.map(item=>
              <TokenItem item={item}/>
              )}
          </Row>)}
          </>
          ):(null)}
        
        <Alert>
        <Row>
        <Col><Link onClick={onViewUserMessages}><h6>User Messages</h6></Link>
        </Col>
        </Row>
        </Alert>

        {seeUserMessages ? (
          <>
          {userMessages === [] ? (null):(
          <Row>
            {userMessages.map(item=>
              <UserMessageItem item={item}/>
              )}
          </Row>)}
          </>
          ):(null)}
        
    </Row>
      <Row>
        <Alert><center>All Rights Reserved 2022, Ethiopia</center></Alert>
      </Row>
    </Container>
  );
}

export default AdminMainPage;
