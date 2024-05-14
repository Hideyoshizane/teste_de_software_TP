import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Descricao, GridCards, Subtitle } from "./styles";
import { nextEvent } from "data/nextEvent";
import { MenuList } from "data/data";


const ScheduledEvents = () => {

  //Importando as imagens
  const NextEvent = require('../../images/evento.jpg');
  const OldEvent = require('../../images/evento4.jpg');
  const RegisterEvent = require('../../images/evento3.jpg');

  //Navegacao
  const onNavigateEventNext = () =>{
    window.location.replace('/events-next');
  }

  const onNavigateEventOld = () =>{
    window.location.replace('/events-old');
  }

  const onNavigateEventRegister = () =>{
    window.location.replace('/events-register');
  }

  
  return (
    <>
      <Header />
      <Box margin={4}>

        {/* Necessario refatorar esta parte do codigo pois esta estatica */}
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
            <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventNext()}>
              <CardActionArea>
                <CardMedia
                  sx={{ minHeight: "200px" }}
                  component={"img"}
                  src={NextEvent}

                />
                <CardContent>
                  <Descricao variant="h5" gutterBottom >
                    Próximos Eventos
                  </Descricao>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventOld()}>
              <CardActionArea>
                <CardMedia
                  sx={{ minHeight: "200px" }}
                  component={"img"}
                  src={OldEvent}

                />
                <CardContent>
                  <Descricao variant="h5" gutterBottom >
                    Próximos Anteriores
                  </Descricao>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventRegister()}>
              <CardActionArea>
                <CardMedia
                  sx={{ minHeight: "200px" }}
                  component={"img"}
                  src={RegisterEvent}

                />
                <CardContent>
                  <Descricao variant="h5" gutterBottom >
                    Cadastrar Eventos
                  </Descricao>
                </CardContent>
              </CardActionArea>
            </Card>
        </Box>

        {/* Próximos Eventos*/}
        <Box ml={7}>
          <Subtitle variant="h4" gutterBottom>
            Próximos eventos
          </Subtitle>
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
                  <CardContent>
                    <Descricao variant="h5" gutterBottom >
                      {menu.name}
                    </Descricao>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
        
        {/* Eventos já ocorridos */}
        <Box ml={7}>
          <Subtitle variant="h4" gutterBottom>
            Eventos Antigos
          </Subtitle>
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
                  <CardContent>
                    <Descricao variant="h5" gutterBottom >
                      {menu.name}
                    </Descricao>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScheduledEvents;
