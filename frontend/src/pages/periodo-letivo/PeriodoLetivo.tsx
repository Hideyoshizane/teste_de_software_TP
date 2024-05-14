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
import {
  IPeriodoLetivo,
  PeriodoLetivoServices,
} from "services/periodo-letivo/PeriodoLetivoServices";
import Header from "shared-components/header/Header";
import { BoxList } from "./styles";
import { useNavigate } from "react-router-dom";

const PeriodoLetivo = () => {
  const navigate = useNavigate();

  const [periodosLetivo, setPeriodosLetivo] = useState<IPeriodoLetivo[]>([]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      PeriodoLetivoServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Período letivo apagado com sucesso!");
          setPeriodosLetivo(
            periodosLetivo.filter((periodoLetivo) => periodoLetivo.id !== id)
          );
        }
      });
    }
  };

  const handleEdit = (periodoLetivo: IPeriodoLetivo) => {
    navigate("/periodo-letivo/edit", { state: periodoLetivo });
  };

  useEffect(() => {
    PeriodoLetivoServices.getAll()
      .then((response) => {
        setPeriodosLetivo(response);
      })
      .catch((error) => {
        alert("Ocorreu um erro ao buscar os períodos letivos");
      });
  }, []);

  return (
    <>
      <Header />
      <BoxList>
        <Typography variant="h4" sx={{ m: 2 }}>
          Lista de Períodos Letivos
        </Typography>
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/periodo-letivo/create")}
          >
            Cadastrar período letivo
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Data de Início</TableCell>
                <TableCell>Data de Término</TableCell>
                <TableCell>Turno</TableCell>
                <TableCell>Ações</TableCell> {/* Coluna para as ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {periodosLetivo.map((periodoLetivo) => (
                <TableRow key={periodoLetivo.id}>
                  <TableCell>{periodoLetivo.id}</TableCell>
                  <TableCell>
                    {(() => {
                      const date = new Date(periodoLetivo.start_date);
                      date.setDate(date.getDate() + 1);
                      return date.toLocaleDateString("pt-Br", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      });
                    })()}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const date = new Date(periodoLetivo.end_date);
                      date.setDate(date.getDate() + 1);
                      return date.toLocaleDateString("pt-Br", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      });
                    })()}
                  </TableCell>
                  <TableCell>{periodoLetivo.class_shift}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(periodoLetivo.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(periodoLetivo)}>
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

export default PeriodoLetivo;
