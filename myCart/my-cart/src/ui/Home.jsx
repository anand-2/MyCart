import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"
import "./Home.css"
import axios from "axios";
import RestCard from "./RestCard";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import CartView from "./CartView";

axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwIjp7ImRhdGEiOnsiZW1haWwiOiJtYW5vakBnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJElSdnJGNVBFTG1jVjd5OXBWOXBzZy5keEcwYjR5ZEVlTzVIZmVBY2hwR0NhSUpCT3FObDVXIn0sImVycm9yIjpmYWxzZSwibWVzc2FnZSI6IlVzZXIgZGV0YWlsZWQgZmV0Y2hlZCJ9LCJpYXQiOjE2NjE4ODExNjB9.c7d5tqqok2jLkzACL6xMB1FrE3eVbXvysehscCWWRjs"

function Home() {
    const [product, setProduct] = useState([])
    const [show, setShow] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/api/product")
            .then((res) => {
                let data = res.data.data
                setProduct(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return <div> <NavBar show={show} setShow={setShow}></NavBar>
        <CartView  show={show} setShow={setShow}></CartView>
        <Container fluid>
            <Row>
                {
                    product.map((one_res) => {
                        return <Col key={one_res.id} lg={3}>
                            <RestCard product={one_res}></RestCard>
                        </Col>
                    })
                }
            </Row>
        </Container>
        <br />

    </div >
}

export default Home;