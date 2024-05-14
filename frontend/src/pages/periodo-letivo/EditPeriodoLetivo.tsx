import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid } from "@mui/material";
import {
  IPeriodoLetivo,
  PeriodoLetivoServices,
} from "services/periodo-letivo/PeriodoLetivoServices";
import Header from "shared-components/header/Header";
import { BoxList } from "./styles";

const EditPeriodoLetivo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const periodoLetivoParams = location.state as IPeriodoLetivo;

  const getDateFormatted = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("pt-Br",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  const [periodoLetivo, setPeriodoLetivo] = useState<IPeriodoLetivo>({
    ...periodoLetivoParams,
    start_date: getDateFormatted(periodoLetivoParams.start_date),
    end_date: getDateFormatted(periodoLetivoParams.end_date),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPeriodoLetivo((prevPeriodoLetivo) => ({
      ...prevPeriodoLetivo,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getDate = (date: string) => {
      const dateString = date;
      const dateParts = dateString.split("/");
      
      const dateObj = new Date();
      dateObj.setHours(0, 0, 0, 0); // Set time to midnight
      dateObj.setDate(Number(dateParts[0]));
      dateObj.setMonth(Number(dateParts[1]) - 1);
      dateObj.setFullYear(Number(dateParts[2]));

      return dateObj;
    };

    PeriodoLetivoServices.update({
      ...periodoLetivo,
      start_date: getDate(periodoLetivo.start_date).toDateString(),
      end_date: getDate(periodoLetivo.end_date).toDateString(),
    })
      .then((response) => {
        alert("Período letivo atualizado com sucesso!");
        navigate("/periodo-letivo");
      })
      .catch((error) => {
        alert("Ocorreu um erro ao atualizar o período letivo!");
      });
  };

  return (
    <div>
      <Header />
      <BoxList marginTop={"16px"}>
        <Typography variant="h6" gutterBottom>
          Editar Período Letivo
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="id"
                label="ID"
                value={periodoLetivo.id}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="start_date"
                label="Data de Início"
                value={periodoLetivo.start_date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="end_date"
                label="Data de Término"
                value={periodoLetivo.end_date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="class_shift"
                label="Turno"
                value={periodoLetivo.class_shift}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Salvar
              </Button>
              <Button
                component={Link}
                to="/periodo-letivo"
                variant="contained"
                color="secondary"
                style={{ marginLeft: 10 }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </BoxList>
    </div>
  );
};

export default EditPeriodoLetivo;
