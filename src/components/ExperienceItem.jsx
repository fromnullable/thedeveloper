import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { sha1FromText } from "../utils/sha1Text";

export default function ExperienceItem({ job, idx }) {
  const skillsList = Array.isArray(job.skills) ? job.skills : [];

  const [highlightHashes, setHighlightHashes] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      const entries = await Promise.all(
        (job.highlights || []).map(async (h, i) => {
          const identity = `${job.company}|${job.title}|${job.dates}|${i}|${h}`;
          const hash = await sha1FromText(identity);
          return [i, hash];
        }),
      );

      if (!cancelled) {
        setHighlightHashes(Object.fromEntries(entries));
      }
    }

    generate();
    return () => {
      cancelled = true;
    };
  }, [job]);

  return (
    <>
      <Row className="align-items-start">
        <Col>
          <p>
            <strong>{job.title}</strong> - {job.company} — {job.location}
          </p>
          <p>{job.summary || "—"}</p>
        </Col>
      </Row>

      <Accordion className="pt-1  ">
        <Accordion.Item eventKey={`more-${idx}`}>
          <Accordion.Header>Commits</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {(job.highlights || []).map((h, i) => {
                const full = highlightHashes[i];
                const short = full?.slice(0, 7);

                return (
                  <ListGroupItem
                    key={`${idx}-h-${i}`}
                    className="d-flex justify-content-between align-items-start "
                  >
                    <div className="font-monospace me-auto">{h}</div>

                    <Badge
                      bg="secondary"
                      className="font-monospace "
                      title={full}
                    >
                      {short || "…"}
                    </Badge>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <AccordionItem eventKey={`stack-${idx}`}>
          <Accordion.Header>Stack</Accordion.Header>
          <Accordion.Body>
            {skillsList.length > 0 && (
              <div className="pt-2">
                {skillsList.map(({ area, items }) => (
                  <div
                    key={`${idx}-${area}`}
                    className="d-flex flex-wrap align-items-center gap-2 pt-2"
                  >
                    <span className="fw-semibold">{area}</span>
                    <span className="text-muted">—</span>

                    {(items || []).map((s) => (
                      <Badge bg="secondary" key={`${idx}-${area}-${s}`}>
                        {s}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Accordion.Body>
        </AccordionItem>
      </Accordion>
    </>
  );
}
