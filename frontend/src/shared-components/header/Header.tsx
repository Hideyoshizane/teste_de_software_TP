import React from "react";
import {
  Container,
  LogoBox,
  NavBox,
  NavButton,
  Subtitle,
  Title,
} from "./styles";
import { Box } from "@mui/material";
import LogoIcon from "../../assets/svgs/LogoIcon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoBox>
        <LogoIcon height={60} />
        <Box>
          <Title>Sistema de</Title>
          <Subtitle>gestão escolar</Subtitle>
        </Box>
      </LogoBox>
      <NavBox>
        <NavButton variant="text" onClick={() => navigate("home")}>
          Home
        </NavButton>
        <NavButton variant="text" onClick={() => navigate("presenca")}>
          Presença
        </NavButton>
        <NavButton variant="text" onClick={() => navigate("relatorios")}>
          Relatórios
        </NavButton>
        <NavButton variant="text" onClick={() => navigate("eventos")}>
          Eventos
        </NavButton>
      </NavBox>
    </Container>
  );
};

export default Header;
