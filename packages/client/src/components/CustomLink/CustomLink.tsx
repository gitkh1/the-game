import React, { FC } from 'react'
import classes from './CustomLink.module.scss'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  title: string
}

export const CustomLink: FC<Props> = ({ to, title }) => {
  return (
    <Link className={classes.root} to={to}>
      {title}
    </Link>
  )
}
