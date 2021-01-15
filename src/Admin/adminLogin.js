import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { Container, Col, Card, Row, Button } from "react-bootstrap";

const AdminLogin = (props) => {
  return (
    <>
      <Navbar history={props.history} />
      <Container className="mt-4" fluid>
        <Row>
          <Col>
            <Card className="text-center admin-container">
              <Card.Body>
                <Card.Title>
                  The Developers of Bird Map Project are proud to present...
                </Card.Title>
                <Card.Text>The Admin's Page</Card.Text>
                <Button variant="primary" as={Link} to="/admin/panel">
                  I solmenly swear that I am up to no good.
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
