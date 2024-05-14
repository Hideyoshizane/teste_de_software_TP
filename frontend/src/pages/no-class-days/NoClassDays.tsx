import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "shared-components/header/Header";
import { BoxList } from "./styles";
import { useNavigate } from "react-router-dom";
import { INoClassDays, NoClassDaysServices } from "services/no-class-days/NoClassDaysServices";

const NoClassDays = () => {
  const navigate = useNavigate();

  const [noClassDays, setNoClassDays] = useState<INoClassDays[]>([]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      NoClassDaysServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Dia sem aula apagado com sucesso!");
          setNoClassDays(
            noClassDays.filter((day) => day.id !== id)
          );
        }
      });
    }
  };

  const handleEdit = (noClassDay: INoClassDays) => {
    navigate("/no-class-day/edit", { state: noClassDay });
  };

  useEffect(() => {
    NoClassDaysServices.getAll()
      .then((response) => {
        setNoClassDays(response);
      })
      .catch((error) => {
        alert("Ocorreu um erro ao buscar os dias sem aula");
      });
  }, []);

  return (
    <>
      <Header />
      <BoxList>
        <Typography variant="h4" sx={{ m: 2 }}>
          Lista de Dias sem aula
        </Typography>
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/no-class-day/create")}
          >
            Cadastrar Dia sem aula
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Dia</TableCell>
                {/* <TableCell>Período</TableCell> */}
                <TableCell>Motivo</TableCell>
                <TableCell>Ações</TableCell> {/* Coluna para as ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {noClassDays.map((day) => (
                <TableRow key={day.id}>
                  <TableCell>{day.id}</TableCell>
                  <TableCell>
                    {(() => {
                      const date = new Date(day.date);
                      date.setDate(date.getDate() + 1);
                      return date.toLocaleDateString("pt-Br", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      });
                    })()}
                  </TableCell>                  
                  <TableCell>{day.reason}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(day.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(day)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BoxList>
    </>
  );
};

export default NoClassDays;
