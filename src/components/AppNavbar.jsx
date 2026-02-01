import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export default function AppNavbar({ name }) {
  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Container fluid>
        <Navbar.Brand className="mb-0 h1">{name || 'Resume'}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}