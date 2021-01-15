import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import Map from "../MapV2/map";
import BirdCard from "./birdCard";
import TimerView from "./timerClass";
import myTimer from "./observableStore";
import birdStore from "./birdStore";

const BirdsGrid = (props) => {
  useEffect(() => {
    getBirdListInfo();
  }, []);
  const getBirdListInfo = async () => {
    //{county: [birds], county: [birds], county: [birds]}
    if (window.unifiedBirdData) {
      birdStore.setBirdListInfo(window.unifiedBirdData);
    } else {
      let results = await helperFunc.getBirdV2();
      birdStore.setBirdListInfo(results);
      window.unifiedBirdData = results;
    }
  };

  return (
    <>
      <Navbar history={props.history} />

      <Container fluid className="mt-4">
        <Row>
          <Col md="8">
            <Map />
          </Col>
          <Col md="4">
            <SideBar birdStore={birdStore} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const SideBar = observer(({ birdStore }) => {
  let birdsArray = [];
  birdStore.birdList &&
    birdStore.birdListInfo.forEach((bird, i) => {
      if (birdStore.birdList.includes(bird.id)) {
        birdsArray.push(<BirdCard key={bird.id} bird={bird} />);
      }
    });
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            <b>Birds in {birdStore.highlightedCounty} County</b>
          </Card.Text>
        </Card.Body>
      </Card>
      {birdsArray}
    </>
  );
});
export default BirdsGrid;
