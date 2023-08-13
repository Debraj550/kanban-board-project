import React, { useEffect, useState } from "react";
import fetchData from "../../service/Api";
import CardComp from "../cardComp/CardComp";
import Navbar from "../navbar/Navbar";

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
      // Convert priority to text
      groupedTickets = groupedTickets.reduce((result, ticket) => {
        const priority = ticket.priority;
        let priorityText = "";

        if (priority === 0) {
          priorityText = "No Priority";
        } else if (priority === 1) {
          priorityText = "Low";
        } else if (priority === 2) {
          priorityText = "Medium";
        } else if (priority === 3) {
          priorityText = "High";
        } else if (priority === 4) {
          priorityText = "Urgent";
        }

        if (!result[priorityText]) {
          result[priorityText] = [];
        }
        result[priorityText].push(ticket);
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
    <div>
      <Navbar
        className="bg-white"
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="">
        <div className="scroll-horizontal vh-100" style={{ overflowX: "auto" }}>
          <div className="d-flex flex-nowrap ">
            {Object.keys(groupedAndSortedTickets).map((group, index) => (
              <div className="col-md mx-4" key={index}>
                <div className="scroll-column" style={{ overflowX: "auto" }}>
                  <h5 className="mt-2 mb-2">
                    {group}{" "}
                    <span className="ms-2 text-muted h6">
                      {groupedAndSortedTickets[group].length}
                    </span>
                  </h5>

                  {groupedAndSortedTickets[group].map((ticket, ticketIndex) => (
                    <CardComp key={ticketIndex} ticket={ticket} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
