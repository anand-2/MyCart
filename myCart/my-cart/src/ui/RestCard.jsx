import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import "./RestCard.css"

function menuredirect() {
    window.location("/Dish")
}

function RestCard(props) {
    const encodedBase64 = props.image;
    return <Card style={{ width: '18rem' }}>
        <Card.Img className="img justify-content-center" src={props.image} fluid variant="top"  />
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text id="cardDesc">
                {props.description}
            </Card.Text>
            <Button variant="primary" href="/cart" onClick={}>Add to cart</Button>
        </Card.Body>
    </Card>
}

export default RestCard;