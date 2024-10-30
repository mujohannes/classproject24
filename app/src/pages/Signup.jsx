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

export function Signup(props) {
    const [password, setPassword] = useState('')
    let validPassword = false;
    const [email, setEmail] = useState('')
    let validEmail = false
    const [password2, setPassword2] = useState('')
    let validPassword2 = false
    const [firstName, setFirstName] = useState('')
    let validFirstName = false
    const [lastName, setLastName] = useState('')
    let validLastName = false
    const [errorMessage, setErrorMessage] = useState()

    const navigate = useNavigate()
    const db = useContext(FirestoreContext)
    const profile = useContext(ProfileContext)

    document.title = "Sign up for an account"

    const reqNumbers = "0123456789"
    const reqChars = "abcdefghijklmnopqrstuvwxyz"
    const reqCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const reqSymbols = "!@#?$%^&*()_-+=/<>\"[]~"

    // function to check if password includes numbers
    const includesNumbers = ( str ) => {
        const numbersArray = reqNumbers.split('')
        let result = false
        numbersArray.forEach((number) => {
            if (str.includes(number)) {
                result = true
            }
        })
        return result
    }
    // function to check if password includes lowercase characters
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
    // function to check if password includes uppercase characters
    const includesCaps = ( str ) => {
        const capsArray = reqCaps.split('')
        let result = false
        capsArray.forEach((cap) => {
            if (str.includes(cap)) {
                result = true
            }
        })
        return result
    }
    // function to check if password includes special characters
    const includesSymbols = ( str ) => {
        const symbolsArray = reqSymbols.split('')
        let result = false
        symbolsArray.forEach((symbol) => {
            if (str.includes(symbol)) {
                result = true
            }
        })
        return result
    }
    // validate email address without using effect
    if (
        (email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1)
        && (email.indexOf('.') > 0 && email.indexOf('.') < email.length - 1)
    ) { validEmail = true }
    else {
        validEmail = false
    }

    if (
        (password.length >= 8 && password.length <= 15)
        && includesNumbers( password ) == true
        && includesChars( password ) == true
        && includesCaps( password ) == true
        && includesSymbols( password ) == true
    ) {
        validPassword = true
    }
    else {
        validPassword = false
    }

    // validating second password without using effect
    if (password2 == password && password.length > 0) {
        validPassword2 = true
    }
    else {
        validPassword2 = false
    }

    // validating first name
    if(firstName.length > 0 
        && includesChars( firstName )  == true 
        && includesNumbers( firstName ) == false
        && includesSymbols( firstName ) == false
    ) 
    {
        validFirstName = true
    }
    else {
        validFirstName = false
    }

    // validating last name
    if(lastName.length > 0 
        && includesChars( lastName )  == true 
        && includesNumbers( lastName ) == false
        && includesSymbols( lastName ) == false
    ) 
    {
        validLastName = true
    }
    else {
        validLastName = false
    }

    // useEffect( () => {
    //     console.log(validEmail, validpassword, validPassword2)
    // })

    const signUpUser = (event) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password")
        createUserWithEmailAndPassword(props.authapp, email, password)
            .then((response) => {
                // create user profile in Firestore
                createUserProfile(response.user.uid)
                // set user profile in the app
                profile(
                    {
                        first: firstName,
                        last: lastName,
                        uid: response.user.uid,
                        email: response.user.email
                    }
                )
                navigate("/")
            }
            )
            .catch((error) => console.log(error))
    }

    const createUserProfile = async (userId) => {
        // create user profile as a document in Firestore
        const document = doc(db, "users", userId)
        const userData = { first: firstName, last: lastName }
        const docRef = await setDoc(document, userData)
    }
    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="mt-4" onSubmit={(event) => signUpUser(event)} noValidate >
                            <h2>Sign up for an account</h2>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Dylan"
                                    name="first"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    className={ (validFirstName ) ? "is-valid" : ( firstName.length > 0) ? "is-invalid" : "" }
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                no numbers or symbols for first name
                            </Form.Control.Feedback>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Smith"
                                    name="last"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    className={ (validLastName) ? "is-valid" : ( lastName.length > 0) ? "is-invalid" : "" }
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
                                    onChange={(event) => setEmail(event.target.value)}
                                    className={ (validEmail) ? "is-valid" : ( email.length > 0) ? "is-invalid" : "" }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="minimum 8 characters"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className={ (validPassword) ? "is-valid" : ( password.length > 0) ? "is-invalid" : "" }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-3">Repeat password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="type your password again"
                                    name="password2"
                                    value={password2}
                                    onChange={(event) => setPassword2(event.target.value)}
                                    className={ (validPassword2) ? "is-valid" : ( password2.length > 0) ? "is-invalid" : "" }
                                />
                            </Form.Group>
                            <Form.Text>
                                Password must contain at least an uppercase, a lowercase, a number and a symbol, like {reqSymbols} and be between 8 and 15 characters long
                            </Form.Text>
                            <Button
                                type="submit"
                                variant="primary"
                                className="my-3 mx-auto d-block w-100"
                                disabled={
                                    (validPassword
                                        && validEmail
                                        && validPassword2
                                        && validFirstName
                                        && validLastName
                                    )
                                        ? false : true
                                }
                            >
                                Sign up
                            </Button>
                            <Form.Text>{errorMessage}</Form.Text>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}