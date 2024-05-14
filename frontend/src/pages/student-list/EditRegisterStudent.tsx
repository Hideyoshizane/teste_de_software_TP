import React, { useEffect, useState } from "react";

import Header from "../../shared-components/header/Header";
import { Container, Column, RegisterButton, BodyRegisterButtonContainer } from "./styles";
import {
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ClassShift } from "utils/enums";
import { AlunosServices } from "services/alunos/AlunosServices";

const EditRegisterStudent = () => {
  const navigate = useNavigate();
  
  // A parte de cima o Thiago fez
  const { name } = useParams<'name'>();
  const [id, setId] = useState<Number>();
  const [fullName, setFullName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [address, setAddress] = useState("");
  const [responsibleTeacher, setResponsibleTeacher] = useState("");
  const [phoneResponsibleTeacher, setPhoneResponsibleTeacher] = useState("");
  const [shift, setShift] = useState<ClassShift>();

  useEffect(() => {
    if (name !== undefined) {

      AlunosServices.getByName(name)
        .then((result) => {
          if(result instanceof Error) {
            alert(result.message);
            navigate('/home');
          } else {
            setId(result.id);
            setFullName(result.name);
            setDataNascimento(result.born_date);
            setAddress(result.address);
            setResponsibleTeacher(result.tutor_name);
            setPhoneResponsibleTeacher(result.tutor_phone);
            setShift(() => result.class_shift as ClassShift | undefined);
          }
        });
    }
  }, [name]);

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
    AlunosServices.updateById(Number(id), updatedData)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate('/student-list');
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Nome completo"
            variant="outlined"
            data-test="name_aluno"
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            label="Data de Nascimento"
            variant="outlined"
            data-test="date"
          />

          <TextField
            fullWidth
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
            value={responsibleTeacher}
            onChange={(e) => setResponsibleTeacher(e.target.value)}
            label="Nome do tutor responsável"
            variant="outlined"
            data-test="name_tutor"
          />

          <TextField
            fullWidth
            type="text"
            value={phoneResponsibleTeacher}
            onChange={(e) => setPhoneResponsibleTeacher(e.target.value)}
            label="Telefone do tutor responsável"
            variant="outlined"
            data-test="phone_tutor"
          />

          <TextField
            fullWidth
            label="Turno de aula"
            value={shift || ''}
            onChange={(e) => setShift(e.target.value as ClassShift | undefined)}
            data-testid="shift-select"
            select
          >
            {Object.keys(ClassShift).map((key) => (
              <MenuItem
                key={key}
                value={key}
                selected={shift === key}
              >
                {key}
              </MenuItem>
            ))}
          </TextField>
        </Column>
      </Container>

      <BodyRegisterButtonContainer>
        <RegisterButton variant="contained" onClick={handleSave}>
          Salvar Informações
        </RegisterButton>
      </BodyRegisterButtonContainer>
    </>
  );
};

export default EditRegisterStudent;
