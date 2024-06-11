import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flex: 1,
  background: theme.palette.primary.main,
  margin: '0px -8px',
  gap: '16px',
  position: 'absolute',
  bottom: 0,
}))

export const Description = styled(Typography)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.secondary.main,
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
  backgroundColor: '#B8E0D2',
  borderRadius: 10, 
  marginBottom: 2,
}))