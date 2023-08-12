import React, { useEffect, useState } from "react";
import fetchData from "../../service/Api";
import CardComp from "../cardComp/CardComp";
import { Card } from "react-bootstrap";

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      {tickets.map((ticket, index) => (
        <CardComp key={index} ticket={ticket} />
      ))}
    </div>
  );
};

export default Board;
