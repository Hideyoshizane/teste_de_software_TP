import React, { useEffect, useState } from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Descricao, GridCards, Subtitle } from "./styles";
import { nextEvent } from "data-front/nextEvent";
import { oldEvent } from "data-front/oldEvent";
import { MenuList } from "data-front/data";
import { STORAGE_EVENT } from "utils/storageKeys";

export interface EventParams {
  name: string;
  id: number;
  description: string;
  date: Date;
}

const ScheduledEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<EventParams[]>(nextEvent);
  const [eventsOld, setEventsOld] = useState<EventParams[]>(oldEvent);

  // Navegação
  const onNavigateEventNext = () => {
    window.location.replace('/events-next');
  }

  const onNavigateEventOld = () => {
    window.location.replace('/events-old');
  }

  const onNavigateEventRegister = () => {
    window.location.replace('/events-register');
  }

  const onNavigateEventDetail = (params: EventParams) => {
    navigate('/events-description', { state: params });
  }

  const RegisterEvent = require('../../images/evento3.jpg');

  const getRandomImage = (index: number) => {
    const images = [
      require('../../images/evento.jpg'),
      require('../../images/evento3.jpg'),
      require('../../images/evento4.jpg'),
      require('../../images/evento5.jpg'),
      require('../../images/agricultura.jpg'),
      require('../../images/artes.jpeg'),
      require('../../images/tecnologia1.jpg'),
      require('../../images/tecnologia.jpg'),
      require('../../images/saude.jpg'),
      require('../../images/Rectangle23.png'),
      require('../../images/Rectangle22.png'),
      require('../../images/Rectangle21.png'),
      require('../../images/Rectangle20.png'),
      require('../../images/Rectangle19.png'),
      require('../../images/Rectangle18.png'),
      require('../../images/Rectangle17.png'),
      require('../../images/Rectangle16.png'),
      require('../../images/reciclagem.jpg'),
      require('../../images/meio-ambiente.jpg'),
      require('../../images/meio-ambiente1.jpg'),
      require('../../images/meio-ambiente2.jpg'),
      require('../../images/esporte.jpg'),
      require('../../images/educacao.jpeg'),
      // Adicione mais imagens aqui, se necessário
    ];

    const randomIndex = index % images.length;
    return images[randomIndex];
  };

  useEffect(() => {
    const valueStr = localStorage.getItem(STORAGE_EVENT);

    if (valueStr) {
      const values = JSON.parse(valueStr);
      if (values?.length) {
        setEvents(prev => [...prev, ...values.map((value: any) => ({ ...value, date: new Date(value.date) }))]);
      }
    }
  }, [])

  return (
    <>
      <Header />
      <Box margin={4}>

        {/* Necessario refatorar esta parte do codigo pois esta estatica */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>

          <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventRegister()}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "200px" }}
                component={"img"}
                src={RegisterEvent}
                alt="Cadastrar Eventos"
              />
              <CardContent>
                <Descricao variant="h5" gutterBottom>
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
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {events.map((menu, index) => (
              <Card key={index} sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventDetail({ name: menu.name, id: menu.id, description: menu.description, date: menu.date })}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "200px", maxHeight: "200px", minWidth: "200px", maxWidth: "200px" }}
                    component={"img"}
                    src={getRandomImage(index)}
                    alt={menu.name}
                  />
                  <CardContent>
                    <Descricao variant="h5" gutterBottom>
                      {menu.name}
                    </Descricao>

                    <Descricao variant="body1" gutterBottom>
                      {menu.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
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
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {eventsOld.map((menu, index) => (
              <Card key={index} sx={{ maxWidth: "390px", display: "flex", m: 2 }} onClick={() => onNavigateEventDetail({ name: menu.name, id: menu.id, description: menu.description, date: menu.date })}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "200px", maxHeight: "200px", minWidth: "200px", maxWidth: "200px" }}
                    component={"img"}
                    src={getRandomImage(index)}
                    alt={menu.name}
                  />
                  <CardContent>
                    <Descricao variant="h5" gutterBottom>
                      {menu.name}
                    </Descricao>

                    <Descricao variant="body1" gutterBottom data-testid="event-date">
                      {menu.date.toLocaleDateString()}
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
