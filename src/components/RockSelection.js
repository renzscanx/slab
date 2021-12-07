import React from "react";
import { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const RockSelection = () => {
  const [selectStone, setSelectStone] = useState();
  const [voidRatio, setVoidRatio] = useState(0);
  const [dryDensity, setDryDensity] = useState(0);
  const [bulkDensity, setBulkDensity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [heatTransferRate, setHeatTransferRate] = useState(0);
  const [area, setArea] = useState(0);
  const [height, setHeight] = useState(0);
  const [temp, setTemp] = useState(0);
  const [thermalCon, setThermalCon] = useState(0);
  const porosityField = useRef(0);
  const moistureContentField = useRef(0);
  const radiusField = useRef(0);
  const heightField = useRef(0);
  const initialTempVal = 298.15;
  const finalTempField = useRef(0);
  const timeField = useRef(0);
  const waterDensity = 1000;
  const stones = [
    {
      id: 0,
      stoneName: "Select Rock",
      specificHeat: 0,
      specificGravity: 0,
    },
    {
      id: 1,
      stoneName: "Limestone",
      specificHeat: 880,
      specificGravity: 2.69,
    },
    {
      id: 2,
      stoneName: "Shale",
      specificHeat: 800,
      specificGravity: 2.35,
    },
    {
      id: 3,
      stoneName: "Basalt",
      specificHeat: 898,
      specificGravity: 2.77,
    },
  ];

  const onChangeComboBox = (e) => {
    e.preventDefault();
    const selectId = e.target.value;
    const setSelectedStone = stones.filter((stone) => stone.id == selectId)[0];
    setSelectStone(setSelectedStone);
  };

  useEffect(() => {
    setDryDensity(0);
  }, [voidRatio]);

  useEffect(() => {
    setSelectStone(stones[0]);
  }, []);

  useEffect(() => {
    getDryDensity(); // execute
  }, [voidRatio]); //change value

  const getVoidRatio = () => {
    const n = porosityField.current.value;
    let voidRatioFormula = n / (1 - n);
    const rounded = Math.round(voidRatioFormula * 1000000000) / 1000000000;
    setVoidRatio(rounded);
    //9 digits
  };

  const getDryDensity = () => {
    let x = (selectStone?.specificGravity * waterDensity) / (1 + voidRatio);
    const rounded = Math.round(x * 100000) / 100000;
    setDryDensity(rounded);
    //5 digits
  };

  const getBulkDensity = () => {
    const n = parseFloat(moistureContentField.current.value);
    let x = dryDensity * (1 + n);
    const rounded = Math.round(x * 1000000) / 1000000;
    setBulkDensity(rounded);
    //6digits
  };

  const getWeight = () => {
    const PI = 3.14159265359;
    const radius = parseFloat(radiusField.current.value);
    const height = parseFloat(heightField.current.value);
    const radiusSquared = Math.pow(radius, 2);
    const diameter = PI * radiusSquared;
    let x = diameter * height * bulkDensity;
    const rounded = Math.round(x * 100000000) / 100000000;
    setWeight(rounded);
    setArea(diameter);
    setHeight(height);
    //8 digits
  };

  const getTemp = () => {
    const finalTemp = parseFloat(finalTempField.current.value);
    const final = finalTemp - initialTempVal;
    setTemp(final);
  };

  const getHeatTransferRate = () => {
    const mass = weight * selectStone?.specificHeat;
    //const initialTemp = parseFloat(initialTempField.current.value)
    //const finalTemp = parseFloat(finalTempField.current.value)
    const time = parseInt(timeField.current.value);
    //if (time >= 1200) {
      const x = mass * temp;
      const heatRate = x / time;
      const rounded = Math.round(heatRate * 100000000) / 100000000;
      setHeatTransferRate(rounded);
    //} else {
    //}
    //const getTemp = finalTemp - initialTemp

    //setTemp(getTemp)
    //8 digits
  };

  const calculateThermal = () => {
    getVoidRatio();
    getDryDensity();
    getBulkDensity();
    getWeight();
    getTemp();
    getHeatTransferRate();
    // const time = parseInt(timeField.current.value);
    // if (time >= 1200){
      let x = heatTransferRate * height;
      let y = area * temp;
      const getThermal = x / y;
      const rounded = Math.round(getThermal * 1000000000) / 1000000000;
      setThermalCon(rounded);
    // }else{
    //   window.alert('Minimum time is 1200 secs to calculate Thermal Conductivity')
    // }
    //9digits
  };

  const reset = () => {
    setSelectStone(stones[0]);
    setVoidRatio(0);
    setDryDensity(0);
    setBulkDensity(0);
    setWeight(0);
    setHeatTransferRate(0);
    setArea(0);
    setHeight(0);
    setTemp(0);
    setThermalCon(0);
    porosityField.current.value = "";
    moistureContentField.current.value = "";
    radiusField.current.value = "";
    heightField.current.value = "";
    //initialTempField.current.value = "";
    finalTempField.current.value = "";
    timeField.current.value = "";
  };

  return (
    <div>
      <Row>
        <Col md="4">
          <div className="selectSize">
            <select
              className="selectClass"
              disabled={selectStone?.id !== 0}
              value={selectStone?.id}
              onChange={(e) => {
                onChangeComboBox(e);
              }}
            >
              {stones.map((stone) => (
                <option key={stone.id} value={stone.id}>
                  {stone.stoneName}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col md="8">
          <h3>
            {" "}
            {selectStone?.id !== 0 &&
              "Selected Rock: " + " " + selectStone?.stoneName + " "}{" "}
          </h3>
        </Col>
      </Row>

      {/* <RockForm {selectStone} */}
      <div className="firstRow">
        <Row>
          <Col md="3">
            <Form.Label>Porosity</Form.Label>
            <Form.Control
              type="number"
              name="porosity"
              ref={porosityField}
              onChange={getVoidRatio}
              disabled={selectStone?.id == 0}
            />
            <Form.Label>Void Ratio</Form.Label>
            <Form.Control type="number" value={voidRatio.toString()} readOnly />
          </Col>

          <Col md="3">
            <Form.Label>Specific Gravity</Form.Label>
            <Form.Control
              type="number"
              value={selectStone?.specificGravity.toString()}
              readOnly
            />
            <Form.Label>Density of Water(kg/m^3)</Form.Label>
            <Form.Control
              type="number"
              value={waterDensity.toString()}
              readOnly
            />
            <Form.Label>Dry Density kg/m3</Form.Label>
            <Form.Control
              type="number"
              value={dryDensity.toString()}
              readOnly
            />
          </Col>

          <Col md="3">
            <Form.Label>Moisture Content</Form.Label>
            <Form.Control
              type="number"
              name="moistureContent"
              ref={moistureContentField}
              onChange={getBulkDensity}
              disabled={voidRatio == 0}
            />
            <Form.Label>Bulk Density(kg/m3)</Form.Label>
            <Form.Control
              type="number"
              value={bulkDensity.toString()}
              readOnly
            />
          </Col>
          <Col md="3">
            <Form.Label>Radius(m)</Form.Label>
            <Form.Control
              type="number"
              name="radius"
              ref={radiusField}
              disabled={bulkDensity == 0}
            />
            <Form.Label>Height(m)</Form.Label>
            <Form.Control
              type="number"
              name="height"
              ref={heightField}
              onChange={getWeight}
              disabled={bulkDensity == 0}
            />
            <Form.Label>Weight(kg)</Form.Label>
            <Form.Control type="number" value={weight.toString()} readOnly />
          </Col>
        </Row>
      </div>

      <div className="secondRow">
        <Row>
          <Col md="3">
            <Form.Label>Initial Temperature(K)</Form.Label>
            <Form.Control
              //type="number"
              name="initialTemp"
              value={initialTempVal.toString()}
              readOnly
              //ref={initialTempField}
              //disabled={weight == 0}
            />
            <Form.Label>Final Temperature(K)</Form.Label>
            <Form.Control
              type="number"
              name="finalTemp"
              ref={finalTempField}
              disabled={weight == 0}
              onChange={getTemp}
            />
            <Form.Label>Time(min. 1200secs)</Form.Label>
            <Form.Control
              type="number"
              name="time"
              ref={timeField}
              onChange={getHeatTransferRate}
              disabled={temp == 0}
            />
          </Col>
          <Col md="3">
            <Form.Label>Heat Transfer Rate(J/s or W)</Form.Label>
            <Form.Control
              type="number"
              value={heatTransferRate.toString()}
              readOnly
            />
            <Form.Label>Specific Heat(J/kgK)</Form.Label>
            <Form.Control
              type="number"
              value={selectStone?.specificHeat.toString()}
              readOnly
            />
            <Form.Label>Area(m^2)</Form.Label>
            <Form.Control type="number" value={area.toString()} readOnly />
          </Col>
          <Col md="3">
            <Form.Label>Thermal Conductivity(W/m.K)</Form.Label>
            {/* <Form.Control type="number" value={thermalCon.toString()} readOnly /> */}
            <h3>{thermalCon}</h3>
            <div className="calcTherm">
              <Button
                variant="primary"
                onClick={calculateThermal}
                disabled={heatTransferRate == 0}
              >
                {" "}
                Calculate
              </Button>
              <Button variant="danger" onClick={reset}>
                {" "}
                Reset
              </Button>
            </div>
          </Col>
          <Col md="3"></Col>
        </Row>
      </div>
    </div>
  );
};

export default RockSelection;
