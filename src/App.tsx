import resume from "./data/resume.json";
import AppNavbar from "./components/AppNavbar";
import SummaryConsole from "./components/SummaryConsole";
import Strengths from "./components/Strengths";
import ExperienceSection from "./components/ExperienceSection";
import { Col, Container, Row } from "react-bootstrap";
import CodeSnippet from "./components/CodeSnippet";
import DecorativeCanvas from "./components/DecorativeCanvas";
import ExperienceDecorativeCanvas from "./components/ExperienceDecorativeCanvas";
import ToolBox from "./components/ToolBox";
import ExportIcons from "./components/ExportIcons";
import Typewriter from "./components/Typewriter"

function App() {
  return (
    <>
      <header>
        <AppNavbar name={resume.basics?.name} linkedin={resume.basics?.linkedIn}  />
      </header>
      <main>
        <section id={"hero"} className="position-relative">
          <DecorativeCanvas></DecorativeCanvas>

          <Container className="min-vh-100 ">
            <Row className=" min-vh-100   d-flex align-items-center align-self-center">
              <Col
                lg={6}
                xl={6}
                className="h-50 order-2  order-lg-1 order-xl-1"
              >
                <div className="display-3">
                  <CodeSnippet
                    lang="bash"
                    code={resume.basics?.email}
                  ></CodeSnippet>
                </div>

                <SummaryConsole
                  className="aling-middle"
                  summary={resume.summary}
                />
                <div>
                  <CodeSnippet
                    lang="bash"
                    code={"npm create vite@latest ."}
                  ></CodeSnippet>
                  <CodeSnippet lang="bash" code={"npm install"}></CodeSnippet>
                  <CodeSnippet
                    lang="bash"
                    code={"npm install react-bootstrap bootstrap"}
                  ></CodeSnippet>
                  <CodeSnippet
                    lang="bash"
                    code={"npm install -D shiki"}
                  ></CodeSnippet>
                </div>
              </Col>
              <Col lg={6} xl={6} className="order-1 order-lg-2 order-xl-2 py-4">
                <div className="mx-lg-5 mx-1 mx-xl-5">
                  <div className="text-info-emphasis font-monospace mb-2">
                    <Typewriter text=">_ Hello World!" />
                  </div>
                  <h3>
                    this is <strong>Israel!</strong>
                  </h3>

                  <p className="display-5 fw-light">
                    I’m a{" "}
                    <span className="fw-semibold">
                      Senior Software Engineer
                    </span>{" "}
                    who builds{" "}
                    <span className="fw-semibold text-info-emphasis">
                      scalable, reliable systems
                    </span>{" "}
                    and enjoys untangling{" "}
                    <span className="fw-semibold">complex problems</span>.
                  </p>

                  <ExportIcons data={resume}></ExportIcons>



                </div>
              </Col>
            </Row>
          </Container>
        </section>



        <section
          id={"experience"}
          className="pb-lg-5 pb-xl-5 position-relative"
        >
          <ExperienceDecorativeCanvas></ExperienceDecorativeCanvas>

          <Container fluid={false}>
            <Row className="pt-3">
              <Col xs={12}>
                <ExperienceSection experience={resume.experience || []} />
              </Col>
            </Row>
          </Container>
        </section>

        <section id={"strenghts"} className="py-1">
          <Container className="py-4 py-lg-5 py-xl-5">
            <Row>
              <Col>
                <Strengths strengths={resume.strengths || []} />
              </Col>
            </Row>
          </Container>
        </section>        

        <section id={"toolbox"}>
          <Container className="my-5">
            <Row className="justify-content-center">
              <Col lg={4}>
                <div className=" mx-auto  alert-secondary text-center">
                  <CodeSnippet
                    lang="bash"
                    code={"install israel_toolbox"}
                  ></CodeSnippet>
                </div>
              </Col>
            </Row>
            <Row className="g-4">
              <ToolBox groups={resume.technicalSkills}></ToolBox>
            </Row>
          </Container>
        </section>
        <section id={"contact"}></section>
      </main>
    </>
  );
}

export default App;
