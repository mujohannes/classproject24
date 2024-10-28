import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

import { FirestoreContext } from '../contexts/FirestoreContext';
import { doc, setDoc } from '@firebase/firestore'
import { ProfileContext } from '../contexts/ProfileContext';

export function Signup ( props ) {
    const [ password, setPassword ] = useState('')
    const [ validpassword, setValidPassword ] = useState( false )
    const [ email, setEmail ] = useState('')
    const [ validEmail, setValidEmail ] = useState(false)
    const [ password2, setPassword2 ] = useState('')
    const [ validPassword2, setValidPassword2 ] = useState( false )
    const [ firstName, setFirstName ] = useState( '' )
    const [ lastName, setLastName ] = useState( '' )
    const [ errorMessage, setErrorMessage ] = useState()

    const navigate = useNavigate()
    const db = useContext( FirestoreContext )
    const userProfile = useContext( ProfileContext )

    const reqNumbers = "0123456789"
    const reqChars = "abcdefghijklmnopqrstuvwxyz"
    const reqCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const reqSymbols = "!@#?$%^&*()_-+=/<>\"[]~"

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
        // validate email
        if( 
            (email.indexOf('@') > 0 && email.indexOf('@') < email.length-1 ) 
            && (email.indexOf('.') > 0 && email.indexOf('.') < email.length-1 )
        )
        { setValidEmail( true ) }
    }, [email])

    useEffect( () => {
        // validate password against the rules
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

    useEffect( () => {
        // validate that password2 matches password
        if( password2 == password && password.length > 0 ) {
            setValidPassword2( true )
        }
        else {
            setValidPassword2( false )
        }

    }, [password2])

    useEffect( () => {
        console.log( validPassword2 )
    })

    const signUpUser = ( event ) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password") 
        createUserWithEmailAndPassword( props.authapp, email, password )
        .then( (response) => {
            // create user profile in Firestore
            createUserProfile( response.user.uid )
            // set user profile in the app
            userProfile.setUserProfile(
                {
                    first: firstName,
                    last: lastName,
                    uid: response.user.uid,
                    email: response.user.email
                }
            )
            navigate("/")} 
        )
        .catch( (error) => console.log(error) )
    }

    const createUserProfile = async ( userId ) => {
        const document= doc( db, "users", userId )
        const userData = { first: firstName, last: lastName }
        const docRef = await setDoc( document, userData )
    }
    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="mt-4" onSubmit={ (event) => signUpUser(event) }>
                            <h2>Sign up for an account</h2>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="Dylan"
                                    name="first"
                                    value={ firstName }
                                    onChange={ (event) => setFirstName(event.target.value) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    required
                                    type="text" 
                                    placeholder="Smith"
                                    name="last"
                                    value={ lastName }
                                    onChange={ (event) => setLastName(event.target.value) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    required
                                    type="email" 
                                    placeholder="you@domain.com"
                                    name="email"
                                    value={email}
                                    onChange={ (event) => setEmail(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Password</Form.Label>
                                <Form.Control 
                                    required
                                    type="password" 
                                    placeholder="minimum 8 characters" 
                                    name="password"
                                    value={ password }
                                    onChange={ (event) => setPassword( event.target.value ) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Repeat password</Form.Label>
                                <Form.Control 
                                    required
                                    type="password" 
                                    placeholder="type your password again" 
                                    name="password2"
                                    value={ password2 }
                                    onChange={ (event) => setPassword2( event.target.value ) }
                                />
                            </Form.Group>
                            <Form.Text>
                                    Password must contain at least an uppercase, a lowercase, a number and a symbol, like {reqSymbols} and be between 8 and 15 characters long
                                </Form.Text>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="my-3 mx-auto d-block w-100"
                                disabled = { 
                                    (validpassword
                                    && validEmail 
                                    && validPassword2 ) 
                                    ? false : true 
                                }
                            >
                                Sign up
                            </Button>
                            <Form.Text>{ errorMessage }</Form.Text>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}