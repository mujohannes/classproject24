import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { FirestoreContext } from '../contexts/FirestoreContext'
import { doc, getDoc } from 'firebase/firestore'

export function BookDetail(props) {
    const [book, setBook] = useState()

    const params = useParams()
    const db = useContext(FirestoreContext)

    // function to get book data
    const getBookDetail = async () => {
        const ref = doc(db, "books", params.bookId)
        const detail = await getDoc(ref)
        let bookObject = detail.data()
        bookObject.id = detail.id
        setBook(bookObject)
    }

    useEffect( () => {
        getBookDetail()
    }, [book])


    if (book) {
        document.title = book.title
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>{book.title}</h1>
                    </Col>
                    <Col md={6}>
                        <img className="w-100" src={"/book_covers/" + book.cover} />
                    </Col>
                    <Col md={6}>
                        <p>{ book.title } by { book.author }</p>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <p>Loading...</p>
        )
    }
}