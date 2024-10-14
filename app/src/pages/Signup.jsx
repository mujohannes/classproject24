import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export function Signup ( props ) {
    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Tabs defaultActiveKey="Sign up" fill>
                            <Tab title="sign up" eventKey="signup">
                                <Form className="mt-4">
                                    <h2>Sign up for an account</h2>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="you@domain.com"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="mt-3">Password</Form.Label>
                                        <Form.Control type="password" placeholder="minimum 6 characters" />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" className="my-3 mx-auto d-block w-100">
                                        Sign up
                                    </Button>
                                    <p>Already have an account? Go to sign in</p>
                                </Form>
                            </Tab>
                            <Tab title="Sign in" eventKey="signin">
                                <Form className="mt-4">
                                    <h2>Sign in to your account</h2>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="you@domain.com"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="mt-3">Password</Form.Label>
                                        <Form.Control type="password" placeholder="minimum 6 characters" />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" className="my-3 mx-auto d-block w-100">
                                        Sign up
                                    </Button>
                                    <p>Don't have an account? Go to sign up</p>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    )
}