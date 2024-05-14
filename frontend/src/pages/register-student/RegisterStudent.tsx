import React, { useState } from "react";

import Header from "../../shared-components/header/Header";
import { Container, Column, RegisterButton } from "./styles";
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClassShift } from "utils/enums";

const RegisterStudent = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState(false);

  const [dataNascimento, setDataNascimento] = useState("");
  const [errorDataNascimento, setErrorDataNascimento] = useState(false);

  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);

  const [responsibleTeacher, setResponsibleTeacher] = useState("");
  const [errorResponsibleTeacher, setErrorResponsibleTeacher] = useState(false);

  const [phoneResponsibleTeacher, setPhoneResponsibleTeacher] = useState("");
  const [errorPhoneResponsibleTeacher, setErrorPhoneResponsibleTeacher] =
    useState(false);

  const [shift, setShift] = useState<ClassShift>();
  const [errorShift, setErrorShift] = useState(true);

  const updateErrorInputs = () => {
    // if (!email) {
    //   setErrorEmail(true);
    // } else {
    //   setErrorEmail(false);
    // }
    // if (!password) {
    //   setErrorPassword(true);
    // } else {
    //   setErrorPassword(false);
    // }
  };

  const onClickEnter = () => {
    updateErrorInputs();

    // if (email && password) {
    //   navigate("home");
    // }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <TextField
            fullWidth
            type="text"
            error={errorFullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Nome completo"
            variant="outlined"
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={errorDataNascimento}
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            label="Data de Nascimento"
            variant="outlined"
          />

          <TextField
            fullWidth
            error={errorAddress}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Endereço"
            variant="outlined"
          />
        </Column>

        <Column>
          <TextField
            fullWidth
            type="text"
            error={errorResponsibleTeacher}
            value={responsibleTeacher}
            onChange={(e) => setResponsibleTeacher(e.target.value)}
            label="Nome do tutor responsável"
            variant="outlined"
          />

          <TextField
            fullWidth
            type="text"
            error={errorPhoneResponsibleTeacher}
            value={phoneResponsibleTeacher}
            onChange={(e) => setPhoneResponsibleTeacher(e.target.value)}
            label="Telefone do tutor responsável"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Turno de aula"
            value={shift || ""}
            onChange={(e) => setShift(e.target.value as ClassShift)}
            data-testid="shift-select"
            select
          >
            {Object.keys(ClassShift).map((key) => (
              <MenuItem
                value={ClassShift[key as keyof typeof ClassShift]}
                key={key}
              >
                {key}
              </MenuItem>
            ))}
          </TextField>
        </Column>
      </Container>

      <RegisterButton variant="contained" onClick={() => onClickEnter()}>
        Salvar Informações
      </RegisterButton>
    </>
  );
};

export default RegisterStudent;
