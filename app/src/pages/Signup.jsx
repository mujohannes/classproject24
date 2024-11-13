import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../contexts/AuthContext'

export function Signup(props) {
    const [password, setPassword] = useState('')
    const [validpassword, setValidPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [validemail, setValidEmail] = useState(false)
    const [password2, setPassword2] = useState('')
    const [validpassword2, setValidPassword2] = useState(false)
    const [username, setUserName ] = useState('')
    const [validusername,setValidUserName ] = useState(false)

    const navigate = useNavigate()
    const auth = useContext( AuthContext)

    const reqNumbers = "0123456789"
    const reqChars = "abcdefghijklmnopqrstuvwxyz"
    const reqCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const reqSymbols = "!@#?$%^&*()_-+=/|<>"

    const includesNumbers = (str) => {
        const numbersArray = reqNumbers.split('')
        let result = false
        numbersArray.forEach((number) => {
            if (str.includes(number)) {
                result = true
            }
        })
        return result
    }

    const includesChars = ( str ) => {
        const charsArray = reqChars.split('')
        let result = false
        charsArray.forEach((char) => {
            if (str.includes(char)) {
                result = true
            }

        })
        return result
    }

    const includesCaps = (str) => {
        const capsArray = reqCaps.split('')
        let result = false
        capsArray.forEach((cap) => {
            if (str.includes(cap)) {
                result = true
            }
        })
        return result
    }

    const includesSymbols = (str) => {
        const symbolsArray = reqSymbols.split('')
        let result = false
        symbolsArray.forEach((symbol) => {
            if (str.includes(symbol)) {
                result = true
            }
        })
        return result
    }
    // validate username
    useEffect( () => {
        if( username.length >= 4 
            && includesSymbols(username) == false
        )
        {
            setValidUserName(true)
        }
        else {
            setValidUserName( false )
        }
        console.log( includesSymbols(username).toString() )
    }, [username])
    // validate password
    useEffect(() => {
        if (
            (password.length >= 8 && password.length <= 15)
            && includesNumbers(password) == true
            && includesChars(password) == true
            && includesCaps(password) == true
            && includesSymbols(password) == true
        ) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }, [password])
    // validate email
    useEffect(() => {
        if (email.indexOf('@') > 0 && email.indexOf('.') > 0 ) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }, [email])
    // validate confirm password
    useEffect( () => {
        if( password2 == password && validpassword ) {
            setValidPassword2( true )
        }
        else {
            setValidPassword2( false )
        }
    }, [password2])

    const signUpUser = (event) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password")
        const username = formdata.get("username")
        createUserWithEmailAndPassword(props.authapp, email, password)
            .then((response) => {
                console.log(response)
                //navigate("/")
            })
            .catch((error) => console.log(error.code.split('/').replace('-', ' ') ))
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form 
                        className="mt-4" 
                        onSubmit={(event) => signUpUser(event)}
                        noValidate
                        >
                            <h2>Sign up for an account</h2>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="username"
                                    required
                                    name="username"
                                    value={ username }
                                    onChange={ (evt) => setUserName(evt.target.value) }
                                    className={ (validusername) ? 
                                        "is-valid" : (username.length > 0) ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Username has to be at least 4 characters long and cannot contain symbols
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Looks good {username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="you@domain.com"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className={ 
                                        ( validemail) ? "is-valid" : 
                                        ( email.length > 0) ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please type a valid email address
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Looking good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="minimum 8 characters"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className={ 
                                        ( validpassword) ? "is-valid" : 
                                        ( password.length > 0) ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                Password must contain at least an <strong>uppercase</strong>, 
                                a <strong>lowercase</strong>, a <strong>number</strong> 
                                and a <strong>symbol </strong>  
                                like <span style={{letterSpacing: "2px"}}>{reqSymbols}</span> and be <strong>between 8 and 15 characters</strong> long
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Hope you can remember this one!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Retype Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="confirm your password"
                                    name="password2"
                                    value={password2}
                                    onChange={(event) => setPassword2(event.target.value)}
                                    className={ 
                                        ( validpassword2) ? "is-valid" : 
                                        ( password2.length > 0) ? "is-invalid" : ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Yo! This has to match the other one
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Awesome!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                className="my-3 mx-auto d-block w-100"
                                disabled={(validpassword && validemail && validpassword2 && validusername ) ? false : true}
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