import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid } from "@mui/material";

import Header from "shared-components/header/Header";
import { BoxList } from "./styles";
import { INoClassDays, NoClassDaysServices } from "services/no-class-days/NoClassDaysServices";

const RegisterNoClassDay = () => {
  const navigate = useNavigate();

  const [noClassDay, setNoClassDay] = useState<Partial<INoClassDays>>(
    {}
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNoClassDay((prev) => ({
      ...prev,
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

    NoClassDaysServices.create({
      ...noClassDay,
      date: getDate(noClassDay.date as string).toDateString(),
      periodo_letivo_id: 1,
    } as INoClassDays)
      .then((response) => {
        alert("Dia sem aula criado com sucesso!");
        navigate("/no-class-day");
      })
      .catch((error) => {
        alert("Ocorreu um erro ao atualizar o dia sem aula!");
      });
  };

  return (
    <div>
      <Header />
      <BoxList marginTop={"16px"}>
        <Typography variant="h6" gutterBottom>
          Cadastrar Dia sem aula
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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

export default RegisterNoClassDay;
