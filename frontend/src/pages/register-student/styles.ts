import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  padding: "16px 90px",
  gap: "90px",
}));

export const Column = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "24px",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 16px",
}));

export const RegisterButton = styled(Button)(({ theme }) => ({
  marginTop: "24px",
}));
