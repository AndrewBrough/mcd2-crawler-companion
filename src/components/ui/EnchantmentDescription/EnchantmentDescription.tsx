import { Fragment } from 'react'
import styles from './EnchantmentDescription.module.css'

export type EnchantmentDescriptionProps = {
  description: string
  value?: string | null
}

function placeholder(description: string, value: string): 'X%' | 'X' {
  return value.endsWith('%') && description.includes('X%') ? 'X%' : 'X'
}

export function EnchantmentDescription({ description, value }: EnchantmentDescriptionProps) {
  const replacement = value?.trim() ?? ''
  const token = placeholder(description, replacement)
  const parts = description.split(token === 'X%' ? /(X%)/g : /(X)/g)

  return parts.map((part, index) => (
    <Fragment key={index}>
      {part !== token || !replacement ? part : <strong className={styles.value}>{replacement}</strong>}
    </Fragment>
  ))
}
