import { useContext, useState, useEffect } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Link} from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"

export function Home(props) {
    const [bookdata,setBookData] = useState([])
    let booksLoaded = false

    const db = useContext(FirestoreContext)

    const getBooks = async () => {
        const booksCollection = collection( db, "books")
        const result = await getDocs( booksCollection )
        let booksArray = []
        result.forEach( (doc) => {
            let book = doc.data()
            book.id = doc.id
            booksArray.push( book )
        })
        setBookData( booksArray )
    }

    useEffect( () => {
        if( booksLoaded == false ) {
            getBooks()
            booksLoaded = true
        }
    }, [booksLoaded])

    // map each book to a component
    const Books = bookdata.map( (book) => {
        return (
            <Col md={3}>
                <Card>
                    <Card.Img 
                        variant="top" 
                        src={"/book_covers/" + book.cover} 
                        style={{maxWidth:"100%"}}
                    />
                    <Card.Body>
                        <Card.Title>{ book.title }</Card.Title>
                        <Card.Text>
                            A book by {book.author}
                        </Card.Text>
                        <Button as={Link} 
                            variant="primary" 
                            className="w-100" 
                            to={"/detail/" + book.id}
                        >
                            Detail
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Library System</h1>
                </Col>
            </Row>
            <Row>
                {/* books here */}
                { Books }
            </Row>

        </Container>

    )
}