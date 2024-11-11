import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function BookDetail( props ) {
    const {id} = useParams()
    return (
        <Container>
            <Row>
                <Col md={6}>
                    { id }
                </Col>
            </Row>
        </Container>
    )
}