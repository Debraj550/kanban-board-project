import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card } from "react-bootstrap";

const DisplayMenu = ({ toggle }) => {
  return (
    <div
      className="position-fixed"
      style={{ zIndex: 2 }}
      onMouseLeave={!toggle}
    >
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <div>Grouping</div>
            <DropdownButton
              id="dropdown-basic-button bg-danger"
              title="Display"
            >
              <Dropdown.Item href="#/action-1">Status</Dropdown.Item>
              <Dropdown.Item href="#/action-2">User</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Priority</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="d-flex justify-content-between">
            <div>Priority</div>
            <DropdownButton id="dropdown-basic-button" title="Display">
              <Dropdown.Item href="#/action-1">Priority</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Title</Dropdown.Item>
            </DropdownButton>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DisplayMenu;
