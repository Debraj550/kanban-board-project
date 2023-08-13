import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Board from "../board/Board";

const Navbar = ({ onGroupChange, onSortChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div>
      <div className="bg-white w-100 mh-100 py-1">
        <div className="ms-4">
          <Button
            className="bg-white text-black border border-2 "
            onClick={toggleDropdown}
          >
            Display
          </Button>
        </div>
      </div>

      {showDropdown && (
        <div className="ms-4 p=2" ref={dropdownRef}>
          <Card
            className="shadow position-fixed"
            style={{
              width: "25rem",
              backgroundColor: "#eee",
              zIndex: 2,
              top: "50px",
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted me-2">Grouping</div>
                <Form.Select
                  size="sm w-50"
                  aria-label="select"
                  onChange={(e) => onGroupChange(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </Form.Select>
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-muted me-2"> Ordering</div>
                <Form.Select
                  size="sm w-50"
                  aria-label="select"
                  onChange={(e) => onSortChange(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </Form.Select>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Navbar;
