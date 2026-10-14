import { useId } from 'react'
import styles from './Checkbox.module.css'

export type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const id = useId()

  return (
    <label className={styles.field} htmlFor={id}>
      <input
        id={id}
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  )
}
