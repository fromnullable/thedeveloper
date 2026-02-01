import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/esm/Badge";


export default function Strengths({ strengths }) {
  return (
    <div className="row row-cols-lg-3 row-cols-xl-3 row-cols-1 g-4">
      {strengths.map((s) => {
        return (
          <div>
            <Card className="bg-dark shadow  h-100">
              <CardBody>
                <h1>
                  <Badge
                    className="display-4"
                    bg=""
                    style={{ backgroundColor: "#2e3440 !important" }}
                  >
                    {s.icon}
                  </Badge>
                </h1>
                <div>
                  <strong>{s.summary}</strong>
                  <p className="mt-2">{s.description}</p>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
