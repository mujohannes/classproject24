import Container from 'react-bootstrap/Container'
export function Home(props) {
    document.title = "Home page"
    return (
        <Container fluid>
            <h1>Home</h1>
        </Container>
    )
}