import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

function NavBar(props) {
   
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" id="navHeading">MyCart</Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav className="navBar">
            <Nav.Link className="navBar" onClick={(e)=>props.setShow(!props.show)} >Cart</Nav.Link>
        </Nav>
    </Navbar >
}

export default NavBar;