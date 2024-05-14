import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  background: theme.palette.primary.main,
  margin: '-8px',
  padding: '16px 32px',
}))

export const Title = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '49px',
  color: theme.palette.text.primary
}))

export const Subtitle = styled(Typography)(({theme}) => ({
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 700,
  color: theme.palette.secondary.main,
}))

export const LogoBox = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}))

export const NavBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '16px',
}))

export const NavButton = styled(Button)(({theme}) => ({
  color: theme.palette.secondary.main,
  fontWeight: 700
}));