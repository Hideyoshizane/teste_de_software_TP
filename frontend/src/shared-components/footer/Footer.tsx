import React from "react";
import { Container, Subtitle, Title } from "./styles";
import LogoIcon from "../../assets/svgs/LogoIcon";

const Footer = () => (
  <Container>
    <LogoIcon width={44} height={58} />
    <Title>
      {"Sistema de "}
      <Subtitle>gestão escolar</Subtitle>
    </Title>
  </Container>
);

export default Footer;
