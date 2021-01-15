import React, { useState, useEffect } from "react";
import { Container, Col, Card, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import birdStore from "../HomeV2/birdStore";
import BirdForm from "./birdForm";
import Modal from "./modal";
const AdminPanel = (props) => {
  const [birdListInfo, setBirdListInfo] = useState([]);
  const [birdId, setBirdId] = useState("");
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    getBirdListInfo(false);
  }, []);

  const getBirdListInfo = async (sign, results) => {
    //{county: [birds], county: [birds], county: [birds]}
    console.log("getting called", sign);
    if (sign === true) {
      setBirdListInfo(results);
    } else if (window.unifiedBirdData) {
      setBirdListInfo(window.unifiedBirdData);
    } else {
      let results = await helperFunc.getBirdV2();
      setBirdListInfo(results);
      window.unifiedBirdData = results;
    }
  };

  const updateBird = (
    id,
    name,
    image,
    description,
    lifeHistory,
    distributionAndHabitat,
    status,
    managementAndResearchNeeds,
    locations
  ) => {
    setShow(true);
    // getBirdListInfo(true);
    setModalMessage("I wonder what new data you added!");
    helperFunc
      .updateBird(
        id,
        name,
        image,
        description,
        lifeHistory,
        distributionAndHabitat,
        status,
        managementAndResearchNeeds,
        locations
      )
      .then((response) => {
        console.log("made it here");
        return helperFunc.getBirdV2();
      })
      .then((results) => {
        birdStore.setBirdListInfo(results);
        window.unifiedBirdData = results;
        // getBirdListInfo(true, results);
      });

    // let results = await helperFunc.getBirdV2();
    // await birdStore.setBirdListInfo(results);
    // window.unifiedBirdData = results;
  };
  const resetData = () => {
    setShow(true);
    setModalMessage("Resetted Data For Your Mistakes!");
    helperFunc
      .resetData()
      .then((response) => {
        return helperFunc.getBirdV2();
      })
      .then((results) => {
        birdStore.setBirdListInfo(results);
        window.unifiedBirdData = results;
        setBirdListInfo(results);
        // getBirdListInfo(true, results);
      });
  };

  return (
    <>
      <Navbar history={props.history} />
      <Modal show={show} setShow={setShow} modalMessage={modalMessage} />
      <Container fluid className="mt-4">
        <Row className="mb-3">
          <Col>
            <Button variant="primary" as={Link} to="/admin/panel/new">
              Add a new Bird
            </Button>
            <Button className="ml-3" variant="danger" onClick={resetData}>
              Reset Data
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {birdListInfo &&
              birdListInfo.map((bird, i) => {
                return (
                  <BirdForm
                    key={bird.id}
                    bird={bird}
                    editBird={true}
                    saveBird={updateBird}
                  />
                );
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;
