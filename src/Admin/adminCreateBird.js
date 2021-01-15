import React, { useState, useEffect } from "react";
import { Container, Col, Card, Row, Form, Button } from "react-bootstrap";
import BirdForm from "./birdForm";
import Navbar from "../Navbar";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import birdStore from "../HomeV2/birdStore";
import Modal from "./modal";

const CreateBird = (props) => {
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const postBird = async (
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
    await helperFunc.postBird(
      id,
      name,
      image,
      description,
      lifeHistory,
      distributionAndHabitat,
      status,
      managementAndResearchNeeds,
      locations
    );
    let results = await helperFunc.getBirdV2();
    birdStore.setBirdListInfo(results);
    window.unifiedBirdData = results;
    setShow(true);
    setModalMessage("Added a new bird(?) Hope it doesn't crash!");
  };
  return (
    <>
      <Navbar history={props.history} />
      <Modal show={show} setShow={setShow} modalMessage={modalMessage} />
      <BirdForm saveBird={postBird} editBird={false} />
    </>
  );
};

export default CreateBird;
