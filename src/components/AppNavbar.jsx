import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function AppNavbar({ name, linkedin }) {
  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Container fluid>
        <Navbar.Brand className="mb-0 h1 ">{name || "Resume"}</Navbar.Brand>
        {linkedin && (
          <>
            <a
              className="text-decoration-none link-light "
              target="_blank"
              href={`https://www.linkedin.com/in/${linkedin}`}
            >
              <i className="bi bi-linkedin float-right "></i>
            </a>
          </>
        )}
      </Container>
    </Navbar>
  );
}
