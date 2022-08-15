import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavBar"
import "./Home.css"
import axios from "axios";
import RestCard from "./RestCard";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

function Home() {
    const [product, setProduct] = useState([])

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
    return <div> <NavbarComponent></NavbarComponent>

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