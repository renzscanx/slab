import React from "react";
import { Row, Container } from "react-bootstrap";

const About = () => {
  return (
    <div>
      <Container fluid>
        <h3 className="aboutHeader">How to Use the App?</h3>
        <div className="aboutPar">
          <p className="aboutP1">
            &nbsp; &nbsp; First, click on the “Rock Sample Selection” button.
            Then, select the rock sample that you desire to proceed to the
            calculation located on the upper left corner. Put the values for
            porosity to calculate the void ratio, moisture content to calculate
            dry density and bulk density, radius and height to calculate the
            mass, initial temperature, final temperature and time to calculate
            the heat transfer rate. The specific gravity, density of water and
            specific heat capacity of the selected rocks were provided by the
            application. Then click “calculate” button to compute the thermal
            conductivity of the rock sample.
          </p>
        </div>
        <Row>
          <p className="aboutP2">
            &nbsp; &nbsp;Click the “Reset” button if you wish to change the rock
            sample to enable the “Select rock” function on the upper left corner
            then select the desired rock. This also clears the current input
            data.
          </p>
        </Row>
        <Row>
          <p className="aboutP3">
            <strong>
              <i>
                (Note: Porosity and moisture content should be in decimal
                number, and the best minimum time is 1200 seconds.)
              </i>
            </strong>
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default About;
