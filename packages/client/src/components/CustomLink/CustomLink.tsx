import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { STYLES } from './CustomLink.style'

type Props = {
  to: string
  title: string
}

export const CustomLink: FC<Props> = ({ to, title }) => {
  return (
    <Link style={STYLES.root} to={to}>
      {title}
    </Link>
  )
}
