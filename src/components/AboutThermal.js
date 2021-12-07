import React from "react";
import { Row, Container } from "react-bootstrap";

const AboutThermal = () => {
  return (
    <div>
      <Container fluid>
        <h3 className="thermalHeader">Thermal Conductivity</h3>

        <Row>
          <div className="thermalPar">
            <p className="thermalP1">
              &nbsp; &nbsp; Thermal conductivity refers to a material's capacity
              to conduct/transfer heat. It is commonly represented by the sign
              'k,' however it may also be represented by ‘λ’ and ‘κ’. It is one
              of three heat transmission mechanisms, the other two being
              convection and radiation. Thermal transfer processes may be
              expressed mathematically using proper rate equations. This heat
              transfer mode's rate equation is based on Fourier's law of heat
              conduction. Thermal conductivity is measured in International
              Systems of Units (SI units) of W/m•K (Watts per meter per degree
              Kelvin) and can be calculated as follows:
            </p>
          </div>
        </Row>
        <br />
        <Row>
          <h6>
            <i>k = Ql / A∆T</i>
          </h6>
        </Row>
        <Row>
          <h6>
            <i>Q= Heat transfer rate (W)</i>
          </h6>
        </Row>
        <Row>
          <h6>
            <i>l = length or height (m)</i>
          </h6>
        </Row>
        <Row>
          <h6>
            <i>
              ∆T= Temperature difference (K) (Final Temperature – Initial
              Temperature)
            </i>
          </h6>
        </Row>
        <br />
        <Row>
          <p className="thermalP2">
            &nbsp; &nbsp;Thermal conductivity is an important thermo-physical
            rock property, needed for heat flow determination, deep thermal
            regime determination, and reconstruction of thermal history of
            sedimentary basin since it is the main parameter controlling the
            temperature within a sedimentary basin.
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default AboutThermal;
