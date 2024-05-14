import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid } from "@mui/material";
import Header from "shared-components/header/Header";
import { BoxList } from "./styles";
import { INoClassDays, NoClassDaysServices } from "services/no-class-days/NoClassDaysServices";

const EditNoClassDay = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const noClassDayParams = location.state as INoClassDays;

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

  const [noClassDay, setNoClassDay] = useState<INoClassDays>({
    ...noClassDayParams,
    date: getDateFormatted(noClassDayParams.date),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNoClassDay((prevDay) => ({
      ...prevDay,
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

    NoClassDaysServices.update({
      ...noClassDay,
      date: getDate(noClassDay.date).toDateString(),
      periodo_letivo_id: 1,
    })
      .then(() => {
        alert("Dia sem aula atualizado com sucesso!");
        navigate("/no-class-day");
      })
      .catch(() => {
        alert("Ocorreu um erro ao atualizar o dia sem aula!");
      });
  };

  return (
    <div>
      <Header />
      <BoxList marginTop={"16px"}>
        <Typography variant="h6" gutterBottom>
          Editar Dia sem aula
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="id"
                label="ID"
                value={noClassDay.id}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="date"
                label="Data do dia sem aula"
                value={noClassDay.date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="reason"
                label="Motivo"
                value={noClassDay.reason}
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
                to="/no-class-day"
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

export default EditNoClassDay;
