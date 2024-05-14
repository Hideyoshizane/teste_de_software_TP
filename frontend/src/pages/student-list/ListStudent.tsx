import React from "react";
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


import Header from "shared-components/header/Header";
import { Descricao, GridCards, Subtitle } from "./styles";
import { nextEvent } from "data/nextEvent";
import { MenuList } from "data/data";


const ListStudent = () => {

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

      <Box display='flex' justifyContent='center'>
        <Paper
           component="form"
           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, margin: '20px' }}
         >
           <TextField
             label="Busca por aluno"
             type="search"
             sx={{ flexGrow: 1 }}
           />
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
             <SearchIcon />
           </IconButton>
         </Paper>
        </Box>
      <Box display='flex' flexDirection='column' textAlign='center'>
        <Typography variant="h4" sx={{ m: 2 }}>Lista de Alunos</Typography>

        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>Excluir/Editar</TableCell>
                <TableCell >Nome dos Alunos</TableCell>
                <TableCell>Turma</TableCell>
                <TableCell>Informações</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
                <TableRow data-testid="student-row">
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Aline de Morão</TableCell>
                  <TableCell>Turma de inglês I1</TableCell>
                  <TableCell>Inglês básico</TableCell>
                </TableRow>
            </TableBody>

            <TableBody>
                <TableRow data-testid="student-row">
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Antonio Silva</TableCell>
                  <TableCell>Turma de matemática M1</TableCell>
                  <TableCell>Matemática básica</TableCell>
                </TableRow>
            </TableBody>

            <TableBody>
                <TableRow data-testid="student-row">
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Carlos Alberto</TableCell>
                  <TableCell>Turma de computação C1</TableCell>
                  <TableCell>Computação básica básica</TableCell>
                </TableRow>
            </TableBody>

            <TableBody>
                <TableRow data-testid="student-row">
                  <TableCell>
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Fernanda Silva</TableCell>
                  <TableCell>Turma de programação</TableCell>
                  <TableCell>Programação básica</TableCell>
                </TableRow>
            </TableBody>
            

            <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination 

                    />
                  </TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

      </Box>
      
    </>
  );
};

export default ListStudent;
