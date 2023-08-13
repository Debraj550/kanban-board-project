import React from "react";
import Card from "react-bootstrap/Card";
import "./CardComp.css";

const CardComp = ({ ticket }) => {
  console.log(ticket);
  return (
    <div>
      <Card className="my-2 border rounded" style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{ticket.id}</Card.Subtitle>
          <Card.Subtitle className="mb-2  ">{ticket.title}</Card.Subtitle>
          <Card.Text
            className=" border border-1 px-2"
            style={{ maxWidth: "fit-content" }}
          >
            {ticket.tag[0] && (
              <div>
                <span className="dot me-2"></span>
                <span className="text-muted">{ticket.tag[0]}</span>
              </div>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComp;
