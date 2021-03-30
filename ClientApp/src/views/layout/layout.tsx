import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopBar from "./components/top-bar/top-bar";
import SideBar from "./components/side-bar/side-bar";
import "./layout.scss";

export interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const [sideBarExpanded, setSideBarExpanded] = useState(false);

  const handleSideBarToggle = () => {
    setSideBarExpanded(!sideBarExpanded);
  };

  return (
    <Container fluid className="cnc-layout-container">
      <Row noGutters>
        <Col className="cnc-side-bar-container">
          <SideBar
            isExpanded={sideBarExpanded}
            handleToggle={handleSideBarToggle}
          />
        </Col>
        <Col className="cnc-main-container">
          <Row xs={1} noGutters className="cnc-top-bar-container">
            <TopBar />
          </Row>
          <Row xs={1} noGutters className="cnc-content-container">
            {props.children}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Layout;
