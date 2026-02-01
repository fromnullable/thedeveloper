import {
  CodeSlash,
  Cpu,
  Diagram3,
  Display,
  FileEarmarkText,
  GearWideConnected,
  HddNetwork,
  Kanban,
  Layers,
  People,
  Receipt,
  Router,
  Tools,
} from "react-bootstrap-icons";

export default function ExperienceDecorativeCanvas() {
  return (
    <>
      <div className="mx-auto text-center d-flex gap-3 justify-content-center d-lg-none my-4">
        <Diagram3
          style={{
            height: "30px",
            width: "30px",
            opacity: 0.3,
          }}
        ></Diagram3>
        <Layers
          style={{
            height: "30px",
            width: "30px",
            opacity: 0.3,
          }}
        ></Layers>
        <Kanban
          style={{
            height: "30px",
            width: "30px",
            opacity: 0.3,
          }}
        ></Kanban>

        <CodeSlash
          style={{
            height: "30px",
            width: "30px",
            opacity: 0.3,
          }}
        ></CodeSlash>

        <HddNetwork
          style={{
            height: "30px",
            width: "30px",
            opacity: 0.3,
          }}
        ></HddNetwork>
      </div>
      <div className="decorative-canvas position-absolute top-0 start-0 w-100 h-100 overflow-hidden pe-none">
        <Diagram3
          className="deco position-absolute"
          style={{
            height: "60px",
            width: "60px",
            top: "8%",
            left: "8%",
            opacity: 0.3,
          }}
        ></Diagram3>

        <Cpu
          className="deco position-absolute"
          style={{
            height: "45px",
            width: "45px",
            top: "20%",
            left: "5%",
            opacity: 0.25,
          }}
        ></Cpu>

        <Layers
          className="deco position-absolute"
          style={{
            height: "45px",
            width: "45px",
            top: "30%",
            right: "8%",
            opacity: 0.25,
          }}
        ></Layers>

        <GearWideConnected
          className="deco position-absolute"
          style={{
            height: "60px",
            width: "60px",
            top: "5%",
            right: "8%",
            opacity: 0.1,
          }}
        ></GearWideConnected>

        <Kanban
          className="deco position-absolute"
          style={{
            height: "70px",
            width: "70px",
            top: "40%",
            left: "13%",
            opacity: 0.2,
          }}
        ></Kanban>

        <CodeSlash
          className="deco position-absolute"
          style={{
            height: "70px",
            width: "70px",
            top: "42%",
            right: "10%",
            opacity: 0.25,
          }}
        ></CodeSlash>

        <People
          className="deco position-absolute"
          style={{
            height: "45px",
            width: "45px",
            top: "49%",
            left: "7%",
            opacity: 0.15,
          }}
        ></People>

        <HddNetwork
          className="deco position-absolute"
          style={{
            height: "70px",
            width: "70px",
            top: "57%",
            right: "6%",
            opacity: 0.25,
          }}
        ></HddNetwork>

        <Router
          className="deco position-absolute"
          style={{
            height: "70px",
            width: "70px",
            top: "61%",
            left: "6%",
            opacity: 0.2,
          }}
        ></Router>

        <Tools
          className="deco position-absolute"
          style={{
            height: "30px",
            width: "30px",
            top: "68%",
            right: "10%",
            opacity: 0.2,
          }}
        ></Tools>

        <Display
          className="deco position-absolute"
          style={{
            height: "30px",
            width: "30px",
            top: "72%",
            left: "10%",
            opacity: 0.2,
          }}
        ></Display>

        <Receipt
          className="deco position-absolute"
          style={{
            height: "50px",
            width: "50px",
            top: "80%",
            left: "10%",
            opacity: 0.25,
          }}
        ></Receipt>

        <FileEarmarkText
          className="deco position-absolute"
          style={{
            height: "50px",
            width: "50px",
            top: "85%",
            right: "10%",
            opacity: 0.25,
          }}
        ></FileEarmarkText>
      </div>
    </>
  );
}
