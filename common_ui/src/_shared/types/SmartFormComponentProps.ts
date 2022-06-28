import { ReactNode } from 'react'
import { ValidationRules } from 'react-hook-form'

export interface SmartFormComponentProps {
  name?: string
  label?: ReactNode | string
  validationRules?: ValidationRules
}
