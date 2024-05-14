import { Box, Typography } from '@mui/material'
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
  position: 'fixed',
  bottom: 0,
}))

export const Title = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  fontSize: '20px',
  color: theme.palette.text.primary
}))

export const Subtitle = styled(Typography)(({theme}) => ({
  display: 'inline',
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.secondary.main,
}))
