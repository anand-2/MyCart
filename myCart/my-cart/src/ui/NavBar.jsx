import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"


function NavbarComponent() {
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" id="navHeading">Zethic MyCart</Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav className="navBar">

            <Nav.Link className="navBar" to="/cart"  href="/cart">Cart</Nav.Link>

        </Nav>
    </Navbar >
}

export default NavbarComponent;