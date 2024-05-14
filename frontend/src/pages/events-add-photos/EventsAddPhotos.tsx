import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";

import Header from "shared-components/header/Header";
import { Container, Column, RegisterButton } from "./styles";
import { nextEvent } from "data-front/nextEvent";
import { MenuList } from "data-front/data";

const EventsAddPhotos = () => {

  const onNavigateEventsDescription = () =>{
    window.location.replace('/events-description');
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
            fullWidth
            type="url"
            label="Tipo do Evento"
            variant="outlined"
          />
        </Column>

        <Column>
          <Typography variant="h5">
            Adicionar novas fotos
          </Typography>
          <Button variant="contained"  sx={{color: "#ffffff", fontSize: "1.2rem" }} >
            <Typography variant="body1">
              Escolher arquivo
            </Typography>
            <TextField
              fullWidth
              type="file"
              variant="standard"
            />
          </Button>
        </Column>
      </Container>
      <Box sx={{textAlign: 'center'}} >

        <RegisterButton variant="contained" onClick={() => onNavigateEventsDescription()}>
          Salvar fotos na galeria
        </RegisterButton>
      </Box>
      
    </>
  );
};

export default EventsAddPhotos;
