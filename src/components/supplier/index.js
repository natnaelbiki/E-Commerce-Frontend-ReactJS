import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Alert } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import ProductService from './services/supplierServices.js'
import ControlService from './services/control.js'
import ProductItem from './products/productItem.js'
import AddNewProduct from './products/addnewproduct.js'


function SupplierMainPage({token}) {
  const [products, setProducts] = React.useState([])
  const [seeProducts, setSeeProducts] = React.useState(false)
  const [addproduct, setAddProduct] = React.useState(false)
  const [category, setCategory] = React.useState(null)

const onViewProducts=()=>{
    if(!seeProducts){ProductService.getProducts(token).then(res=>{
          setProducts(res.data)
          setSeeProducts(true)
          getCategory()
        }).catch(err=>{
          alert(err.toString())
        })} else setSeeProducts(false)
  }

  const onCancel=()=>{
    setAddProduct(false)
  }

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
    alert(id)
    ProductService.deleteProduct(token, id).then(res=>{
      alert(res.data.message)
      if (res.data.status === 1) {
        onViewProducts()
      }
    }).catch(err=>{
      alert(err.toString())
    })
  }

  const getCategory=()=>{
    ProductService.getCategory(token).then(res=>{
      //alert(res.data)
      setCategory(res.data)
    }).catch(err=>{
      alert(err.toString())
    })
  }
  const onFinishViewProduct=()=>{
    setSeeProducts(false)
  }
  const onAddNewProduct=()=>{
   if(!addproduct){ getCategory()
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
  return (
    <Container>
    <Alert><center><h4>Welcome to Ecommerce Supplier Page</h4></center></Alert>
    <Alert><center><h4>All Products</h4></center></Alert>
     <Alert>
     <Row>
       <Col> <Link onClick={onViewProducts}><h6 >All Products</h6></Link></Col>
       <Col></Col>
       <Col> <Link onClick={onAddNewProduct}><h6 >Add Product</h6></Link></Col>
</Row>
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
            <AddNewProduct category={category} onSubmitNewProduct={onSubmitNewProduct} onCancel={onCancel}/>
            ):(null)}
        
      <Row>
        <Alert><center>All Rights Reserved 2022, Ethiopia</center></Alert>
      </Row>
    </Container>
  );
}

export default SupplierMainPage;
