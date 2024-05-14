import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Descricao, Subtitle } from "./styles";
import { nextEvent } from "data/nextEvent";
import { MenuList } from "data/data";


const EventsDescription = () => {

  const onNavigateAddPhotos = () =>{
    window.location.replace('/events-add-photos');
  }

  
  return (
    <>
      <Header />
      
      <Box margin={4}>
        <Box ml={7}>
          <Subtitle variant="h4" gutterBottom>
            Eventos de Tecnologia
          </Subtitle>
          <Typography variant="h5">
            Descrição do evento
          </Typography>
          <Typography variant="body1">
            Evento de Tecnologia ocorrido dia 01/04/2023, com a participação de 50 pessoas, trando de assuntos sobre tecnologia e inovação.
          </Typography>

          <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
            {nextEvent.map((menu, index) => (
              <Card key={index} sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "200px", maxHeight: "200px", minWidth: "200px", maxWidth: "200px"}}
                    component={"img"}
                    src={menu.image}
                    alt={menu.name}
                  />
                </CardActionArea>
              </Card>
            ))}
          </Box>
          <Box  
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={200}
              >
            <Button variant="contained" color="primary" sx={{ fontSize: "1.2rem" }} onClick={() => onNavigateAddPhotos()}>
              Adicionar Fotos
            </Button>
          </Box>

        </Box>

      </Box>
    </>
  );
};

export default EventsDescription;
