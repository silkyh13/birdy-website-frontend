import React, { useEffect, useState } from "react";
import { Media, Container, Col, Card, Row, Image } from "react-bootstrap";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Map from "../MapV2/map";
const BirdInfo = (props) => {
  const [birdList, setBirdList] = useState([]);
  const [birdInfo, setBirdInfo] = useState({});
  const [highlightedCounty, setHighlightedCounty] = useState("");
  const params = useParams();
  const key = params.bird;
  useEffect(() => {
    window.scrollTo(0, 0);
    getInfoOfSelectedBird();
  }, []);
  const getInfoOfSelectedBird = async () => {
    let tester = await helperFunc.getSelectedBird(key);
    setBirdInfo(tester);
  };
  return (
    <>
      <Navbar history={props.history} />
      <Container className="mt-4" fluid>
        <Row>
          <Col md={6}>
            <Media>
              <Media.Body className="mr-3 ml-3">
                <h1 className="text-center mb-4">
                  <strong>{birdInfo.name}</strong>
                </h1>
                <h3 className="text-center">Description </h3>
                <p>{birdInfo.description} </p>
                <h3 className="text-center">Life History </h3>
                <p>{birdInfo.life_history} </p>
                <h3 className="text-center">Distribution And Habitat</h3>
                <p>{birdInfo.distribution_and_habitat} </p>
                <h3 className="text-center">Management And Research Needs</h3>
                <p>{birdInfo.management_and_research_needs} </p>
              </Media.Body>
            </Media>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Image className="mb-3" src={birdInfo.image} />
                <Map
                  setBirdList={setBirdList}
                  selectedBird={birdInfo}
                  setHighlightedCounty={setHighlightedCounty}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BirdInfo;
