import React, { useState, useEffect } from "react";
import { Container, Col, Card, Row, Form, Button } from "react-bootstrap";
import BirdCard from "../HomeV2/birdCard";
import MultiSelectMap from "../MapV2/multiSelectMap";
const BirdForm = ({ bird = { locations: [] }, saveBird, editBird }) => {
  const [showMap, setShowMap] = useState(false);
  const [id, setId] = useState(bird.id);
  const [name, setName] = useState(bird.name);
  const [image, setImage] = useState(bird.image);
  const [description, setDescription] = useState(bird.description);
  const [lifeHistory, setLifeHistory] = useState(bird.life_history);
  const [distributionAndHabitat, setDistributionAndHabitat] = useState(
    bird.distribution_and_habitat
  );
  const [status, setStatus] = useState(bird.status);
  const [managementAndResearchNeeds, setManagementAndResearchNeeds] = useState(
    bird.management_and_research_needs
  );
  const [selectedCounty, setSelectedCounty] = useState([...bird.locations]);

  const handleSetId = (e) => {
    editBird ? null : setId(e.target.value);
  };
  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetImage = (e) => {
    setImage(e.target.value);
  };
  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSetLifeHistory = (e) => {
    setLifeHistory(e.target.value);
  };
  const handleSetDistributionAndHabitat = (e) => {
    setDistributionAndHabitat(e.target.value);
  };
  const handleSetStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleSetManagementAndResearchNeeds = (e) => {
    setManagementAndResearchNeeds(e.target.value);
  };
  var map = <></>;
  if (showMap) {
    map = (
      <div className="mt-3">
        <MultiSelectMap
          locations={selectedCounty}
          setSelectedCounty={setSelectedCounty}
        />
      </div>
    );
  }
  return (
    <>
      <Row>
        <Col md={6}>
          <BirdCard
            bird={bird}
            title={name}
            body={description}
            image={bird.image}
          ></BirdCard>
          <Form className="text-left mt-3">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird ID
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={id}
                  onChange={handleSetId}
                  placeholder="example-id"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleSetName}
                  placeholder="Example Bird Name"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={handleSetImage}
                  placeholder="https://www.bird.link.com/image.png"
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <Form className="text-left">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  className="auto-height-text-box"
                  value={description}
                  onChange={handleSetDescription}
                  placeholder="A nice long story about the bird"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Life History
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  className="auto-height-text-box"
                  value={lifeHistory}
                  onChange={handleSetLifeHistory}
                  placeholder="A nice long story about the bird"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Distribution And Habitat
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  className="auto-height-text-box"
                  value={distributionAndHabitat}
                  onChange={handleSetDistributionAndHabitat}
                  placeholder="A nice long story about the bird"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Status
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  className="auto-height-text-box"
                  value={status}
                  onChange={handleSetStatus}
                  placeholder="A nice long story about the bird"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Management And Research Needs
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  className="auto-height-text-box"
                  value={managementAndResearchNeeds}
                  onChange={handleSetManagementAndResearchNeeds}
                  placeholder="A nice long story about the bird"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bird Locations
              </Form.Label>
              <Col sm={10}>
                <Button
                  onClick={() => {
                    setShowMap(!showMap);
                  }}
                >
                  Select counties on the map
                </Button>
                {map}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Save
              </Form.Label>
              <Col sm={10}>
                <Button
                  variant="success"
                  onClick={() => {
                    saveBird(
                      id,
                      name,
                      image,
                      description,
                      lifeHistory,
                      distributionAndHabitat,
                      status,
                      managementAndResearchNeeds,
                      selectedCounty
                    );
                  }}
                >
                  Save all changes on the page
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default BirdForm;
