import React from "react";
import { Box } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

import LogoIcon from "../../assets/svgs/LogoIcon";
import { useDrawerContext } from "shared-components/contexts/DrawerContext";

import {
  Container,
  LogoBox,
  NavBox,
  NavButton,
  Subtitle,
  Title,
} from "./styles";


interface IListItemLink{
  to: string;
  label: string;
  onClick: (() => void) | undefined;
}

//Componente será responsável por renderizar o menu lateral
const ListItemLink: React.FC<IListItemLink> = ({to, label, onClick}) => {
  const navigate = useNavigate();

  const resolvePath = useResolvedPath(to);

  //Configurando para saber se a opção e menu está selecionada ou não
  const match = useMatch({path: resolvePath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <NavButton variant="text" onClick={handleClick}>
      {label}
    </NavButton>
  );
};

const Header = () => {
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <Container>
      <LogoBox>
      <img src={require("../../images/Logo_BHZ1.png")} alt="Logo BHZ" style={{ width: "100px", height: "65px" }} />
        <Box>
          <Title>Sistema de</Title>
          <Subtitle>gestão escolar</Subtitle>
        </Box>
      </LogoBox>
      <NavBox>
        <ListItemLink 
          to="/home" 
          label={"Home"} 
          onClick={toggleDrawerOpen}
        />
        <ListItemLink 
          to="/attendance-list" 
          label={"Presenca"} 
          onClick={toggleDrawerOpen}
        />
        <ListItemLink 
          to="/attendance-report" 
          label={"Relatorio"} 
          onClick={toggleDrawerOpen}
        />
        <ListItemLink 
          to="/scheduled-events" 
          label={"Eventos"} 
          onClick={toggleDrawerOpen}
        />
        <ListItemLink 
          to="/no-class-day" 
          label={"Dias sem aula"} 
          onClick={toggleDrawerOpen}
        />
      </NavBox>
    </Container>
  );
};

export default Header;
