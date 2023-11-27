import { Avatar, Button, Tooltip } from "@mui/material";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import HomeIcon from "@mui/icons-material/Home";
import { FaUserAlt } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";

function CollapsibleExample() {
  const companyLogo = sessionStorage.getItem("logo");

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        boxShadow: "10px 10px 10px rgb(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <Navbar.Brand href="#">
        <Tooltip title="Company Logo">
          <span>
            <img
              style={{
                height: "3rem",
                width: "8rem",
                marginLeft: "4rem",
              }}
              src={companyLogo}
              alt="LOGO"
            ></img>
            {/* <Avatar
                alt={companyLogo}
                src={companyLogo}
                sx={{ width: 56, height: 56 }}
              /> */}
          </span>
        </Tooltip>
      </Navbar.Brand>
      <Navbar.Brand href="homepage">
        <span style={{ color: "#303f9f" }}>
          <HomeIcon fontSize="large" />
        </span>
      </Navbar.Brand>
      <Navbar.Brand>
        {/* <span style={{ color: "white", marginLeft: "20rem" }}> */}
        <h2 style={{ color: "#303f9f", marginLeft: "28%", fontSize: "45px" }}>
          <b>Leakage Preventive System(LEAPS)</b>
        </h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <NavDropdown
            title="Profile"
            id="collasible-nav-dropdown"
            style={{ marginLeft: "400px" }}
          >
            <NavDropdown.Item href="logindetails">User</NavDropdown.Item>
            <NavDropdown.Item href="company">Company</NavDropdown.Item>
            <NavDropdown.Item href="userGroup">User Group</NavDropdown.Item>
            <NavDropdown.Item href="address">Address</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
