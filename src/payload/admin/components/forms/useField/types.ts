import { Condition, Validate } from '../../../../fields/config/types';

export type Options = {
  path: string
  validate?: Validate
  disableFormData?: boolean
  condition?: Condition
}

export type FieldType<T> = {
  value: T
  errorMessage?: string
  showError: boolean
  formSubmitted: boolean
  formProcessing: boolean
  setValue: (val: unknown, modifyForm?: boolean) => void
  initialValue?: T
}
