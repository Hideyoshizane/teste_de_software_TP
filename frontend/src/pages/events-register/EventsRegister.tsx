import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Container, Column, RegisterButton } from "./styles";
import { nextEvent } from "data/nextEvent";
import { MenuList } from "data/data";


const EventsRegister = () => {

  const onNavigateScheduledEvents = () =>{
    window.location.replace('/scheduled-events');
  }

  return (
    <>
      <Header />
      <Container>
        <Column>
          <TextField
            fullWidth
            type="text"
            label="Nome do evento"
            variant="outlined"
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            label="Data de Nascimento"
            variant="outlined"
          />

          <TextField
            fullWidth
            type="text"
            label="Tipo do Evento"
            variant="outlined"
          />
        </Column>

        <Column>
          <TextField
            fullWidth
            type="text"
            label="Descrição do Evento"
            variant="outlined"
          />
          <Typography variant="h5">
            Adicionar foto ilustrativa para o evento
          </Typography>
          <Button variant="contained" sx={{color: "#ffffff", fontSize: "1.2rem" }} >
            Adicionar fotos de capa
          </Button>
        </Column>
      </Container>
      <Box sx={{textAlign: 'center'}} >
        <RegisterButton variant="contained" onClick={() => onNavigateScheduledEvents()}>
          Salvar Evento
        </RegisterButton>
      </Box>
      
    </>
  );
};

export default EventsRegister;
