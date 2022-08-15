import Modal from "react-bootstrap/Modal"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios";
import "./CartView.css"

function updateCart(cart,handleClose)
{
    let requestCart = JSON.parse(JSON.stringify(cart))
    requestCart.forEach(item=> {
        item.image = null;
    });
    axios.put("http://localhost:5000/api/cart",requestCart)
    .then((res) => {
        let data = res.data.data
        handleClose()
    })
    .catch((err) => {
        console.log(err)
    })
}

function DeleteCart(product,setCart)
{
    axios.delete("http://localhost:5000/api/cart?" + "cart_id=" + product.cart_id + "&product_id=" + product.product_id)
    .then((res) => {
        let data = res.data.data
        loadCart(setCart)

    })
    .catch((err) => {
        console.log(err)
    })
}


function setProductQuantity(product, new_quantity, cart, setCart)
{
    let tempCart = cart; 
    for(let i=0; i < tempCart.length; i++)
    {
         if(product.product_id === tempCart[i].product_id)
         {
             tempCart[i].quantity = new_quantity;
             setCart(tempCart)
             return;
         }
    }
}

function loadCart(setCart)
{
    axios.get("http://localhost:5000/api/cart")
    .then((res) => {
        let data = res.data.data
        setCart(data)
    })
    .catch((err) => {
        console.log(err)
    })
}
function CartView(props) {

    const handleClose = () => props.setShow(false);
    const [cart, setCart] = useState([])
     useEffect(() => {
        loadCart(setCart)
     },[props.show]) 

    let items = cart && cart.map((product) => {
        return <Row key={product.product_id} lg={6} className="m-2 mb-3">
            <Image fluid className="cartimage" src={product.image} />
            <Col>{product.name}</Col>
            <Col><input type="number" onChange={e=>{setProductQuantity(product,e.target.value, cart, setCart)}}  defaultValue={product.quantity} min="1" max="1000" step="1"/></Col>
            <Col>{product.price}</Col>
            <Col>{product.price * product.quantity}</Col>
            <Col><button onClick={(e)=>DeleteCart(product,setCart)}>Delete</button></Col >
        </Row>
    })

    if(!cart || cart.length==0) items = <div>Nothing in cart ☹️ Please shop something</div>

    return (
     <Modal size="lg" show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {items}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e)=>updateCart(cart,handleClose)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  

  export default CartView;