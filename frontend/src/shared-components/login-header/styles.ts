import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';


export const Container = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  background: theme.palette.primary.main,
  margin: '-8px',
  gap: '16px',
  padding: '16px 0px',

  '& img': {
    width: '150px',
    height: '89px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '59px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '120px',
      height: '71px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '150px',
      height: '89px',
    },
  },
}))

export const Title = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  fontSize: '3rem',
  lineHeight: '65px',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '2.5rem',
  }
}))

export const Subtitle = styled(Typography)(({theme}) => ({
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.secondary.main,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.3rem',
  }
}))