import React, { Dispatch } from 'react';
import { Field as FieldConfig, Condition, Validate } from '../../../../fields/config/types';

export type Field = {
  value: unknown
  initialValue: unknown
  errorMessage?: string
  valid: boolean
  validate?: Validate
  disableFormData?: boolean
  condition?: Condition
  passesCondition?: boolean
}

export type Fields = {
  [path: string]: Field
}

export type Data = {
  [key: string]: any
}

export type Preferences = {
  [key: string]: unknown
}

export type Props = {
  disabled?: boolean
  onSubmit?: (fields: Fields, data: Data) => void
  method?: 'get' | 'patch' | 'delete' | 'post'
  handleResponse?: (res: Response) => void
  onSuccess?: (json: unknown) => void
  className?: string
  redirect?: string
  disableSuccessStatus?: boolean
  initialState?: Fields
  initialData?: Data
  waitForAutocomplete?: boolean
  log?: boolean
  validationOperation?: 'create' | 'update'
  children?: React.ReactNode
  action?: string
}

export type SubmitOptions = {
  action?: string
  method?: string
  overrides?: Record<string, unknown>
  skipValidation?: boolean
}

export type DispatchFields = React.Dispatch<any>
export type Submit = (options?: SubmitOptions, e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type ValidateForm = () => Promise<boolean>;
export type CreateFormData = (overrides?: any) => FormData;
export type GetFields = () => Fields;
export type GetField = (path: string) => Field;
export type GetData = () => Data;
export type GetSiblingData = (path: string) => Data;
export type GetDataByPath = <T = unknown>(path: string) => T;
export type SetModified = (modified: boolean) => void;
export type SetSubmitted = (submitted: boolean) => void;
export type SetProcessing = (processing: boolean) => void;

export type Reset = (fieldSchema: FieldConfig[], data: unknown) => Promise<void>

export type REPLACE_STATE = {
  type: 'REPLACE_STATE'
  state: Fields
}

export type REMOVE = {
  type: 'REMOVE'
  path: string
}

export type REMOVE_ROW = {
  type: 'REMOVE_ROW'
  rowIndex: number
  path: string
}

export type ADD_ROW = {
  type: 'ADD_ROW'
  rowIndex: number
  path: string
  subFieldState?: Fields
  blockType?: string
}

export type DUPLICATE_ROW = {
  type: 'DUPLICATE_ROW'
  rowIndex: number
  path: string
}

export type MOVE_ROW = {
  type: 'MOVE_ROW'
  moveFromIndex: number
  moveToIndex: number
  path: string
}

export type MODIFY_CONDITION = {
  type: 'MODIFY_CONDITION'
  path: string
  result: boolean
}

export type UPDATE = {
  type: 'UPDATE'
  path: string
} & Partial<Field>

export type FieldAction =
  | REPLACE_STATE
  | REMOVE
  | REMOVE_ROW
  | ADD_ROW
  | DUPLICATE_ROW
  | MOVE_ROW
  | MODIFY_CONDITION
  | UPDATE

export type FormFieldsContext = [Fields, Dispatch<FieldAction>]

export type Context = {
  /**
   * @deprecated Form context fields may be outdated and should not be relied on. Instead, prefer `useFormFields`.
   */
  fields: Fields
  submit: Submit
  dispatchFields: Dispatch<FieldAction>
  validateForm: ValidateForm
  createFormData: CreateFormData
  disabled: boolean
  getFields: GetFields
  getField: GetField
  getData: GetData
  getSiblingData: GetSiblingData
  getDataByPath: GetDataByPath
  setModified: SetModified
  setProcessing: SetProcessing
  setSubmitted: SetSubmitted
  formRef: React.MutableRefObject<HTMLFormElement>
  reset: Reset
}
