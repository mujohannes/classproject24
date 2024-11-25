import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

import { collection, addDoc } from "firebase/firestore"
import { FirestoreContext } from "../../contexts/FirestoreContext"
import { useContext, useState } from "react"

export function AddBook(props) {
    const [ show, setShow ] = useState( false )
    const [ message, setMessage ] = useState('')

    let alertType = 'success'

    const db = useContext( FirestoreContext )

    const createBook = async (event) => {
        event.preventDefault()
        const fd = new FormData(event.target)
        const book = {
            title: fd.get('title'),
            author: fd.get('author'),
            publisher: fd.get('publisher'),
            cover: fd.get('cover'),
            category: fd.get('category'),
            language: fd.get('language'),
            active: true
        }
        const ref = collection( db, "books")
        const docRef = await addDoc( ref, book )
        if( docRef.id ) {
            //console.log("successful")
            alertType = 'success'
            setMessage('Adding book was successful')
            event.target.reset()
            setShow( true )
        }
        else {
            // console.log("failed")
            alertType = 'danger'
            setMessage('Adding book failed')
            setShow( true )
        }
        setTimeout( () => { setShow(false) }, 3000)
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form id="add-book-form" onSubmit={(evt) => createBook(evt)}>
                        <h2 className="mt-4">Add a book</h2>
                        <Form.Group>
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                placeholder="Book Author"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                placeholder="Book PUblisher"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="Filename of cover image"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Category</Form.Label>
                            <Form.Select name="category">
                                <option>Select category</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-fiction</option>
                                <option value="thriller">Thriller</option>
                                <option value="programming">Programming</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Language</Form.Label>
                            <Form.Select name="language">
                                <option value="english">English</option>
                                <option value="french">French</option>
                                <option value="chinese">Chinese</option>
                                <option value="spanish">Spanish</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mt-4 w-100">Add book</Button>
                    </Form>
                    <Alert variant={alertType} show={ show } className="my-4">
                        { message }
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}