import React, { useState } from "react";
import LoginHeader from "../../shared-components/login-header/LoginHeader";
import { Body, LoginButton } from "./styles";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [error, setError] = useState('');

  const updateErrorInputs = () => {
    if (!email) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (!password) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  const onClickEnter = () => {
    updateErrorInputs();

    if (email && password) {
      fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(response => {
          if (response.ok) {
            navigate('home');
          } else {
            response.json().then(data => {
              setError(data.error || 'An error occurred');
            });
          }
        })
        .catch(error => {
          setError('An error occurred');
          console.log(error);
        });
    }
  };

  return (
    <>
      <LoginHeader />
      <Body>
        <TextField
          type="email"
          error={errorEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail"
          variant="outlined"
          helperText={errorEmail && "Campo obrigatório"}
          role="alert"
        />

        <TextField
          error={errorPassword}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
          variant="outlined"
          helperText={errorPassword ? "Campo obrigatório" : ""}
          inputProps={{ "aria-label": "password-helper-text" }}
        />

        {error && <p>{error}</p>}

        <LoginButton variant="contained" onClick={() => onClickEnter()}>
          Entrar
        </LoginButton>
      </Body>
    </>
  );
};

export default Login;