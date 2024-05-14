import React from "react";
import { Container, Subtitle, Title } from "./styles";
import { Box, Button } from "@mui/material";
import LogoIcon from "../../assets/svgs/LogoIcon";

const LoginHeader = () => {
  return (
    <Container>
      <LogoIcon data-testid="logo-icon" />
      <Box>
        <Title>Sistema de</Title>
        <Subtitle>gestão escolar</Subtitle>
      </Box>
    </Container>
  );
};

export default LoginHeader;
