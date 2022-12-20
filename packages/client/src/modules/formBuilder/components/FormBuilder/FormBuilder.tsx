import React, { FC } from 'react'
import classes from './FormBuilder.module.scss'
import { TFormLink, TFormScheme } from '../../types'
import Button from '@mui/material/Button'
import { FieldBuilder } from '../FieldBuilder'
import { CustomLink } from '../../../../components/CustomLink'

type Props = {
  title: string
  scheme: TFormScheme
  submitTitle: string
  link?: TFormLink
}

export const FormBuilder: FC<Props> = ({
  title,
  scheme,
  submitTitle,
  link,
}) => {
  return (
    <form className={classes.root}>
      <h2 className={classes.root__title}>{title}</h2>
      <div className={classes.root__fields}>
        {scheme.map(item => (
          <FieldBuilder {...item} />
        ))}
      </div>
      <div className={classes.root__footer}>
        <Button variant="contained">{submitTitle}</Button>
        {link && <CustomLink to={link.to} title={link.title} />}
      </div>
    </form>
  )
}
