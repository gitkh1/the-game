import React, { FC } from 'react'
import { CustomLink } from '../../components/CustomLink'
import { STYLES } from './NotFoundPage.styles'
import { Box, Typography } from '@mui/material'

export const NotFoundPage: FC = () => {
  return (
    <Box sx={STYLES.root}>
      <Typography variant="h1" sx={STYLES.title}>
        404
      </Typography>
      <Typography sx={STYLES.subtitle}>Не туда попали</Typography>
      <CustomLink to="/" title="На главную" />
    </Box>
  )
}
