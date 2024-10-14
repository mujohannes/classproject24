import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom"

export function Signin ( props ) {
    const navigate = useNavigate()

    const signInUser = ( event ) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password") 
        signInWithEmailAndPassword( props.authapp, email, password )
        .then( (response) => navigate("/") )
        .catch( (error) => console.log(error) )
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="mt-4" onSubmit={ (event) => signInUser(event) }>
                            <h2>Sign in to your an account</h2>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="you@domain.com"
                                    name="email"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="minimum 6 characters" 
                                    name="password"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="my-3 mx-auto d-block w-100">
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}