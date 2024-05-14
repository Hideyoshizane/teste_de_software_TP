import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Container, Column, RegisterButton } from "./styles";
import { nextEvent } from "data-front/nextEvent";
import { MenuList } from "data-front/data";
import { STORAGE_EVENT } from "utils/storageKeys";


const EventsRegister = () => {

  
  //cria states para o formulario abaixo
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  const onSave = () => {
    const valueStr = localStorage.getItem(STORAGE_EVENT);

    const values = [{name, description, date}]

    if(valueStr) {
      const events = JSON.parse(valueStr);
      values.push(...events);
      values.reverse();
    }

    localStorage.setItem(STORAGE_EVENT, JSON.stringify(values));

    window.location.replace('/scheduled-events');
  }

  return (
    <>
      <Header />
      <Container>
        <Column>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            label="Nome do evento"
            variant="outlined"
            data-test="name_event"
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            label="Data do evento"
            variant="outlined"
            data-test="date"
          />

        </Column>

        <Column>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            label="Descrição do Evento"
            variant="outlined"
            data-test="description_event"
          />
        </Column>
      </Container>
      <Box sx={{textAlign: 'center'}} >
        <RegisterButton variant="contained" onClick={() => onSave()}>
          Salvar Evento
        </RegisterButton>
      </Box>
      
    </>
  );
};

export default EventsRegister;
