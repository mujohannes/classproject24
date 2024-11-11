import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export function Header(props) {
    const authState = useContext(AuthContext)

    if ( !authState) {
        return (
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            <Nav.Link as={Link} to="/signin">Signin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    else {
        return (
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}