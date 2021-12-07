import { useState, useEffect, useRef, Fragment } from "react";
import Logo from "./images/Logo.png";
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Stack,
  Image,
} from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import About from "./components/About";
import AboutThermal from "./components/AboutThermal";
import RockSelection from "./components/RockSelection";
import Home from "./components/Home";
const App = () => {

  useEffect(() => {
    document.title = "SLAB-TC"
    }, [])

  const [navi, setNavi] = useState();
  const navigate = [
    { navName: "SLAB T.C" },
    { navName: "How to Use" },
    { navName: "About Thermal Conductivity" },
    { navName: "Rock Sample Selection" },
  ];

  return (
    <Container fluid>
      <div className="logoDiv">
        <img className="logo" src={Logo} />
      </div>
      <div className="appTitle">
        <h2>SLAB T.C</h2>
      </div>
      <div className="topContent">
        {navigate.map((nav) => (
          <Button
            variant="outline-primary"
            key={nav.navName}
            value={nav.navName}
            onClick={() => setNavi(nav.navName)}
          >
            {nav.navName}
          </Button>
        ))}
      </div>
      <div className="content">
        <Row sm={"auto"}></Row>
        <Row xxl={"auto"}>
          {navi === "SLAB T.C" && <Home />}
          {navi === "How to Use" && <About />}
          {navi === "About Thermal Conductivity" && <AboutThermal />}
          {navi == "Rock Sample Selection" && <RockSelection />}
        </Row>
      </div>
    </Container>
  );
};

export default App;
