import React, { useEffect, useState } from "react";
import fetchData from "../../service/Api";
import CardComp from "../cardComp/CardComp";
import { Card, Button, ButtonGroup } from "react-bootstrap"; // Import Button and ButtonGroup
import Navbar from "../navbar/Navbar";
import DisplayMenu from "../displaymenu/DisplayMenu";

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const data = await fetchData();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupChange = (group) => {
    setGroupBy(group);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const groupAndSortTickets = () => {
    let groupedTickets = [...tickets];

    if (groupBy === "status") {
      groupedTickets = groupedTickets.reduce((result, ticket) => {
        const status = ticket.status;
        if (!result[status]) {
          result[status] = [];
        }
        result[status].push(ticket);
        return result;
      }, {});
    } else if (groupBy === "user") {
      groupedTickets = groupedTickets.reduce((result, ticket) => {
        const userId = ticket.userId;
        const user = users.find((user) => user.id === userId);
        if (user) {
          if (!result[user.name]) {
            result[user.name] = [];
          }
          result[user.name].push(ticket);
        }
        return result;
      }, {});
    } else if (groupBy === "priority") {
      groupedTickets = tickets.reduce((result, ticket) => {
        const priority = ticket.priority;
        if (!result[priority]) {
          result[priority] = [];
        }
        result[priority].push(ticket);
        return result;
      }, {});
    }

    if (sortOption === "priority") {
      Object.keys(groupedTickets).forEach((key) => {
        groupedTickets[key].sort((a, b) => b.priority - a.priority);
      });
    } else if (sortOption === "title") {
      Object.keys(groupedTickets).forEach((key) => {
        groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    return groupedTickets;
  };

  const groupedAndSortedTickets = groupAndSortTickets();

  return (
    <div className="container">
      <Navbar />
      <ButtonGroup className="mb-3">
        <Button
          variant={groupBy === "status" ? "primary" : "outline-primary"}
          onClick={() => handleGroupChange("status")}
        >
          By Status
        </Button>
        <Button
          variant={groupBy === "user" ? "primary" : "outline-primary"}
          onClick={() => handleGroupChange("user")}
        >
          By User
        </Button>
        <Button
          variant={groupBy === "priority" ? "primary" : "outline-primary"}
          onClick={() => handleGroupChange("priority")}
        >
          By Priority
        </Button>
      </ButtonGroup>
      <ButtonGroup className="mb-3">
        <Button
          variant={sortOption === "priority" ? "primary" : "outline-primary"}
          onClick={() => handleSortChange("priority")}
        >
          Sort by Priority
        </Button>
        <Button
          variant={sortOption === "title" ? "primary" : "outline-primary"}
          onClick={() => handleSortChange("title")}
        >
          Sort by Title
        </Button>
      </ButtonGroup>

      {Object.keys(groupedAndSortedTickets).map((group, index) => (
        <div key={index} className="d-flex">
          <div>
            <h5 className="mt-2 mb-2">{group}</h5>
            {groupedAndSortedTickets[group].map((ticket, index) => (
              <CardComp key={index} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
