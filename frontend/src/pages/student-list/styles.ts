import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

export const Descricao = styled(Typography)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 700,
  component:"div",
  color: theme.palette.secondary.main,
}))

export const Subtitle = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  component:"div",
  color: "#383837",
}))

export const GridCards = styled(Grid)(({theme}) => ({
  xs: "12",
  sm:"6",
  md:"4", 
  lg:"3",
  component: "Button",
}))

export const BoxImage = styled(Box)(({theme}) => ({
  padding:1,
  display:'flex', 
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: '#93DC9F',
  borderRadius: 10, 
  marginBottom: 2,
}))