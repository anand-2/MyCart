import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "./RestCard.css"
import axios from 'axios'
import React, { useState, useEffect } from "react";
import Alert from  "react-bootstrap/Alert"


function RestCard(props) {
    
    const [msg, setMessage] = useState({
        show : false,
        title : "Error",
        type: "danger",
        message: "Something went wrong!"
    })

    return <Card style={{ width: '18rem' }}>
        {msg.show && <Alert variant={msg.type}>
         {  msg.message}
        </Alert>}
        <Card.Img className="img justify-content-center" src={props.product.image} fluid variant="top"  />
        <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Text id="cardDesc">
                {props.product.description}
            </Card.Text>
            <Button variant="primary" onClick={(e)=>{addtocart(props,setMessage)}}>Add to cart</Button>
        </Card.Body>
    </Card>
}

function addtocart(props, setMessage){
    let product_details = {
        product_id : props.product.id,
        quantity : 1,  //Always add one item to cart. If it exists, cart is incremented automatically
        cart_id : 1 //Fetch user's cart Id during login. Hardcoding for now
    }
    axios.post("http://localhost:5000/api/cart", product_details)
            .then((res) => {
                let data = res.data
                if (data.error) {
                    setMessage({
                        show : true,
                        message: data.message,
                        type: "danger"
                    })
                }
                else {
                    setMessage({
                        show : true,
                        type: "success",
                        message: data.message
                    })
                }
            }).catch((error) => {
                setMessage({
                    show : true,
                    error : true,
                    message: JSON.stringify(error)
                })
            })
}

export default RestCard;