import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import CartView from "./CartView";
import React, { useState, useEffect } from "react";

function NavbarComponent(props) {
    const [show, setShow] = useState(false);
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" id="navHeading">Zethic</Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav className="navBar">

            <Nav.Link className="navBar" onClick={(e)=>setShow(!show)} >Cart</Nav.Link>

        </Nav><CartView  show={show} setShow={setShow}></CartView>
    </Navbar >
}

export default NavbarComponent;