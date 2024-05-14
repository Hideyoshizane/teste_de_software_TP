import React from "react";
import { Container, Subtitle, Title } from "./styles";
import LogoIcon from "../../assets/svgs/LogoIcon";

const Footer = () => (
  <Container>
    <img src={require("../../images/Logo_BHZ.png")} alt="Logo BHZ" style={{ width: "50px", height: "60px" }} />
    <Title>
      {"Sistema de "}
      <Subtitle>gestão escolar</Subtitle>
    </Title>
  </Container>
);

export default Footer;
