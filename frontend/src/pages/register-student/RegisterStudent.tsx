import React, { useEffect, useState } from "react";

import Header from "../../shared-components/header/Header";
import { Container, Column, RegisterButton, BodyRegisterButtonContainer } from "./styles";
import {
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ClassShift } from "utils/enums";
import { AlunosServices } from "services/alunos/AlunosServices";

const RegisterStudent = () => {
  const navigate = useNavigate();

  const [errorFullName, setErrorFullName] = useState(false);

  const [errorDataNascimento, setErrorDataNascimento] = useState(false);

  const [errorAddress, setErrorAddress] = useState(false);

  const [errorResponsibleTeacher, setErrorResponsibleTeacher] = useState(false);

  const [errorPhoneResponsibleTeacher, setErrorPhoneResponsibleTeacher] =
    useState(false);

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

  const { id } = useParams<'id'>();
  const [fullName, setFullName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [address, setAddress] = useState("");
  const [responsibleTeacher, setResponsibleTeacher] = useState("");
  const [phoneResponsibleTeacher, setPhoneResponsibleTeacher] = useState("");
  const [shift, setShift] = useState<ClassShift>();


  const handleSave = () => {
    // Construa um objeto com as informações dos campos
    const updatedData = {
      id: Number(id),
      name: fullName,
      born_date: dataNascimento,
      address: address,
      tutor_name: responsibleTeacher,
      tutor_phone: phoneResponsibleTeacher,
      class_shift: shift ? shift.toString() : ''
    };
  
    // Chame o serviço para atualizar os dados
    AlunosServices.create(updatedData)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate('/home');
        }
      });
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
            data-test="name_aluno"
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
            data-test="date"
          />

          <TextField
            fullWidth
            error={errorAddress}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Endereço"
            variant="outlined"
            data-test="address"
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
            data-test="name_tutor"
          />

          <TextField
            fullWidth
            type="text"
            error={errorPhoneResponsibleTeacher}
            value={phoneResponsibleTeacher}
            onChange={(e) => setPhoneResponsibleTeacher(e.target.value)}
            label="Telefone do tutor responsável"
            variant="outlined"
            data-test="phone_tutor"
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

      <BodyRegisterButtonContainer>
        <RegisterButton id="botton" variant="contained" onClick={handleSave}>
          Salvar Informações
        </RegisterButton>
      </BodyRegisterButtonContainer>
    </>
  );
};

export default RegisterStudent;
