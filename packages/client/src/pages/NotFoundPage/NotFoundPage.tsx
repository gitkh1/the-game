import React, { FC } from 'react'
import classes from './NotFoundPage.module.scss'
import { CustomLink } from '../../components/CustomLink'

export const NotFoundPage: FC = () => {
  return (
    <div className={classes.root}>
      <h1 className={classes.root__title}>404</h1>
      <p className={classes.root__subtitle}>Не туда попали</p>
      <CustomLink to="/" title="На главную" />
    </div>
  )
}
