import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import Header from "shared-components/header/Header";
import { Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

import CadastroAlunoIcon from "assets/svgs/CadastroAlunoIcon";
import ListaDePresenca from "assets/svgs/ListaDePresencaIcon";
import { Description, GridCards, BoxImage } from "./styles";
import RelatorioIcon from "assets/svgs/RelatorioIcon";
import EventosIcon from "assets/svgs/EventosIcon";

const Home = () => {
  const onNavigateCadastro = () =>{
    window.location.replace('/register-student');
  }

  const onNavigatePresenca = () =>{
    window.location.replace('/lista-de-presenca');
  }

  const onNavigateRelatorio = () =>{
    window.location.replace('/relatorio-de-presenca');
  }

  const onNavigateListStudent = () =>{
    window.location.replace('/student-list');
  }

  const onNavigateAgendaDeEventos = () =>{
    window.location.replace('/scheduled-events');
  }


  return (
    <>
      <Header />
      <Box display='flex' justifyContent='space-around' alignContent='center' margin={4}>
        <Grid container spacing={2}>
          <Grid item container spacing={2} display='flex' justifyContent='center'>
            
            {/*Criando os Cards Cadastro de aluno*/}
            <GridCards item onClick={() => onNavigateCadastro()}>
              <Card sx={{margin: '1px solid red'}}>
                <CardContent>
                  <BoxImage>
                    <CadastroAlunoIcon width={300} height={300}/>
                  </BoxImage>
                  <Description>
                    Cadastro de alunos
                  </Description>
                </CardContent>
              </Card>
            </GridCards>

            {/*Criando os Cards */}
            <GridCards item onClick={() => onNavigatePresenca()}>
              <Card>
                <CardContent >
                  <BoxImage>
                    <ListaDePresenca width={300} height={300}/>
                  </BoxImage>
                  <Description>
                    Lista de Presença
                  </Description>
                </CardContent>
              </Card>
            </GridCards>

            {/*Criando os Cards */}
            <GridCards item onClick={() => onNavigateRelatorio()}>
              <Card>
                <CardContent >
                  <BoxImage >
                    <RelatorioIcon width={300} height={300} />
                  </BoxImage>
                  <Description>
                    Relatório de Presença
                  </Description>
                </CardContent>
              </Card>
            </GridCards>

            {/*Criando os Cards */}
            <GridCards item onClick={() => onNavigateListStudent()}>
              <Card >
                <CardContent >
                  <BoxImage >
                    <CadastroAlunoIcon width={300} height={300}/>
                  </BoxImage>
                  <Description>
                    Lista de alunos
                  </Description>
                </CardContent>
              </Card>
            </GridCards>

            {/*Criando os Cards */}
            <GridCards item onClick={() => onNavigateAgendaDeEventos()}>
              <Card>
                <CardContent >
                  <BoxImage >
                    <EventosIcon width={300} height={300}/>
                  </BoxImage>
                  <Description>
                    Agenda de Eventos
                  </Description>
                </CardContent>
              </Card>
            </GridCards>

          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
