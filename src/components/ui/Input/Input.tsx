import type { ComponentProps } from 'react'
import styles from './Input.module.css'

export type InputSize = 'normal' | 'large'

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: InputSize
  grow?: boolean
}

export function Input({ size = 'normal', grow = false, ...props }: InputProps) {
  const classes = [
    styles.input,
    size === 'large' ? styles.large : styles.normal,
    grow ? styles.grow : styles.fill,
  ].join(' ')

  return <input className={classes} {...props} />
}
