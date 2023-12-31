import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
      <Navbar color="primary" dark expand="md">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/" className="d-lg-none">
          </NavbarBrand>
        </div>
        <div className="hstack gap-2">
          <Button
              color="primary"
              size="sm"
              className="d-sm-block d-md-none"
              onClick={Handletoggle}
          >
            {isOpen ? (
                <i className="bi bi-x"></i>
            ) : (
                <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/news" className="nav-link">
                News
              </Link>
            </NavItem>
            {!isLoggedIn && (
                <>
                  <NavItem>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </NavItem>
                </>
            )}
            <NavItem>
              <Link to="/setting" className="nav-link">
                Settings
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  );
};

export default Header;
