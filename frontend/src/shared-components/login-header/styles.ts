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
  padding: '16px 0px'
}))

export const Title = styled(Typography)(({theme}) => ({
  fontWeight: 700,
  fontSize: '48px',
  lineHeight: '65px',
  color: theme.palette.text.primary
}))

export const Subtitle = styled(Typography)(({theme}) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 700,
  color: theme.palette.secondary.main,
}))