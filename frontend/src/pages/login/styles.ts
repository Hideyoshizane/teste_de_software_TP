import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.primary.main,
  margin: '-8px'
}))

export const Body = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px 16px',
}))

export const LoginButton = styled(Button)(({theme}) => ({
  marginTop: '24px',
  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: '20%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '15%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '25%',
  }
}));

