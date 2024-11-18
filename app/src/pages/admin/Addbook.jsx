import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link, useNavigate } from 'react-router-dom'

import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { FirestoreContext } from "../../contexts/FirestoreContext"

import { collection, addDoc } from "@firebase/firestore"


export function Addbook(props) {
    const auth = useContext(AuthContext)
    const db = useContext( FirestoreContext )
    const navigate = useNavigate()

    const createBook = async (event) => {
        event.preventDefault()
        const data = new FormData( event.target )
        const book = {
            title: data.get('title'),
            author: data.get('author'),
            category: data.get('category'),
            language: data.get('language'),
            cover: data.get('cover-image'),
            availble: data.get('available'),
            active: true
        }
        console.log( book )
        const docRef = await addDoc( collection(db, "books"), book )
        event.target.reset()
    }

    useEffect(() => {
        if (auth) {
            console.log('authed')
        }
        else {
            console.log('not authed')
            navigate('/signin')
        }
    })
    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 3 }} className="mt-4">
                    <Form id="add-form" onSubmit={ (event) => createBook(event)} >
                        <Form.Group>
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" name="title" placeholder="book title" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Author</Form.Label>
                            <Form.Control type="text" name="author" placeholder="book author" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category">
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-fiction</option>
                                <option value="thriller">Thriller</option>
                                <option value="mystery">Mystery</option>
                                <option value="romantic">Romantic</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Language</Form.Label>
                            <Form.Select name="language">
                                <option value="english">English</option>
                                <option value="french">French</option>
                                <option value="hindhi">Hindhi</option>
                                <option value="chinese">Chinese</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="text" name="cover-image" placeholder="filename of cover image" />
                        </Form.Group>
                        <Form.Check // prettier-ignore
                            type="checkbox"
                            id="available"
                            name="available"
                            label="Available for members to borrow"
                            value={true}
                            checked
                        />
                        <Button type="submit" variant="primary" className="w-100 my-2">Add book</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}