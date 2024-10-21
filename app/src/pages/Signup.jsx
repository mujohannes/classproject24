import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export function Signup ( props ) {
    const [ password, setPassword ] = useState('')
    const [ validpassword, setValidPassword ] = useState( false )

    const navigate = useNavigate()

    const reqNumbers = "0123456789"
    const reqChars = "abcdefghijklmnopqrstuvwxyz"
    const reqCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const reqSymbols = "!@#?$%^&*()_-+="

    const includesNumbers = () => {
        const numbersArray = reqNumbers.split('')
        let result = false
        numbersArray.forEach( ( number ) => {
            if( password.includes(number) ) {
                result = true
            }
        })
        return result
    }

    const includesChars = () => {
        const charsArray = reqChars.split('')
        let result = false
        charsArray.forEach( (char) => {
            if( password.includes(char) ) {
                result = true
            }
            
        } )
        return result
    }

    const includesCaps = () => {
        const capsArray = reqCaps.split('')
        let result = false
        capsArray.forEach( (cap) => {
            if( password.includes(cap) ) {
                result = true
            }
        } )
        return result
    }

    const includesSymbols = () => {
        const symbolsArray = reqSymbols.split('')
        let result = false
        symbolsArray.forEach( (symbol) => {
            if( password.includes(symbol) ) {
                result = true
            }
        })
        return result
    }

    useEffect( () => {
        if( 
            (password.length >= 8 && password.length <= 15)
            && includesNumbers() == true
            && includesChars() == true
            && includesCaps() == true
            && includesSymbols() == true
        ) 
        {
            setValidPassword( true )
        }
        else {
            setValidPassword( false )
        }
    } , [ password ] )

    const signUpUser = ( event ) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password") 
        createUserWithEmailAndPassword( props.authapp, email, password )
        .then( (response) => navigate("/") )
        .catch( (error) => console.log(error) )
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="mt-4" onSubmit={ (event) => signUpUser(event) }>
                            <h2>Sign up for an account</h2>
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
                                    placeholder="minimum 8 characters" 
                                    name="password"
                                    value={ password }
                                    onChange={ (event) => setPassword( event.target.value ) }
                                />
                                <Form.Text>
                                    Password must contain at least one uppercase, lowercase, a number and a symbol and be between 8 and 15 characters long
                                </Form.Text>
                            </Form.Group>
                            <Button 
                            type="submit" 
                            variant="primary" 
                            className="my-3 mx-auto d-block w-100"
                            disabled = { (validpassword) ? false : true }
                            >
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}