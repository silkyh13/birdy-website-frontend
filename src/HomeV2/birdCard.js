import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const CardBody = ({ bird, selected, title, body, image }) => {
  const [toggleText, setToggleText] = useState(false);
  const description = body || bird.description || "";

  return (
    <Card>
      <div className="card-horizontal">
        <Card.Img
          className="bird-image"
          src={image || bird.image}
          onClick={selected}
        />
        <Card.Body id="card-body">
          <Card.Title onClick={selected} style={{ cursor: "pointer" }}>
            <Link to={"/" + bird.id}> {title || bird.name}</Link>
          </Card.Title>
          <Card.Text>
            {toggleText ? description : description.substring(0, 100)}...
          </Card.Text>
          <span
            id="toggle_text"
            onClick={() => {
              setToggleText(!toggleText);
            }}
          >
            {toggleText ? "Read Less" : "Read More"}
          </span>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardBody;
