import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState, useEffect, useContext } from "react"
import { FirestoreContext } from '../contexts/FirestoreContext';
import { doc, setDoc } from '@firebase/firestore'

export function ManageBook( props ) {
    return(
        <Container fluid>
            <Row>
                <Col>
                    <h1>Managing Books</h1>
                </Col>
            </Row>
        </Container>
    )
}