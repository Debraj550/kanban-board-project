import React from "react";
import Card from "react-bootstrap/Card";

const CardComp = () => {
  return (
    <div>
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-black">CAM 1</Card.Subtitle>
          <Card.Subtitle className="mb-2 fw-bold ">
            Conduct security vulnerability assessment
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComp;
