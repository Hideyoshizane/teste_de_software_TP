import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

import Header from "shared-components/header/Header";
import { Descricao, Subtitle } from "./styles";
import { nextEvent } from "data/nextEvent";
import { MenuList } from "data/data";


const EventsNext = () => {
  
   //Importando as imagens
   const EventoDeTecnologia = require('../../images/Rectangle16.png');
   const EventoDeSaude = require('../../images/Rectangle17.png');
   const EventoDeEsporte = require('../../images/Rectangle18.png');
   const EventoDeMeioAmbiente = require('../../images/Rectangle19.png');
   const EventoDeTecnologia1 = require('../../images/Rectangle20.png');
   const EventoDeSaude1 = require('../../images/Rectangle21.png');
   const EventoDeEsporte1 = require('../../images/Rectangle22.png');
   const EventoDeArtes = require('../../images/Rectangle23.png');
   
   //Navegação
   const onNavigateEventsRegister = () =>{
     window.location.replace('/events-register');
   }
   
   return (
     <>
       <Header />
       <Box margin={4}>
 
         <Subtitle variant="h4" gutterBottom>
           Próximos Eventos
         </Subtitle>
 
         {/* Necessario refatorar esta parte do codigo pois esta estatica */}
         <Box  sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }} >
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeTecnologia}
 
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Tecnologia
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeSaude}
 
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Saúde
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeEsporte}
 
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Esporte
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeMeioAmbiente}
 
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom>
                   Eventos de Meio Ambiente
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeTecnologia1}
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                     Eventos de Tecnologia
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeSaude1}
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Saúde
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeEsporte1}
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Esporte
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
 
             <Card sx={{ maxWidth: "500px", display: "flex", m: 2 }}>
               <CardActionArea>
                 <CardMedia
                   sx={{ minHeight: "400px" }}
                   component={"img"}
                   src={EventoDeArtes}
                 />
                 <CardContent>
                   <Descricao variant="h5" gutterBottom >
                   Eventos de Artes
                   </Descricao>
                 </CardContent>
               </CardActionArea>
             </Card>
         </Box>
         <Box  
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <Button variant="contained" color="primary" sx={{ fontSize: "1.2rem" }} onClick={() => onNavigateEventsRegister()}>
              Cadastrar Novos Eventos
            </Button>
          </Box>
       </Box>
     </>
   );
 };

export default EventsNext;
