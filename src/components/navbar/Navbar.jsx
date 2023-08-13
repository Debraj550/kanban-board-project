import React, { useState } from "react";
import DisplayMenu from "../displaymenu/DisplayMenu";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="container">
      <Button
        className="bg-white text-black border border-0"
        onClick={() => setToggle(!toggle)}
      >
        Display
      </Button>
      {toggle && <DisplayMenu toggle={toggle}/>}
    </div>
  );
};

export default Navbar;
