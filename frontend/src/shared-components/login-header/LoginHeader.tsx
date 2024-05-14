import React from "react";
import { Container, Subtitle, Title } from "./styles";
import { Box, Button } from "@mui/material";


const LoginHeader = () => {
  return (
    <Container>
      <img src={require("../../images/Logo_BHZ1.png")} alt="Logo BHZ" />
      <Box>
        <Title>Sistema de</Title>
        <Subtitle>gestão escolar</Subtitle>
      </Box>
    </Container>
  );
};

export default LoginHeader;
