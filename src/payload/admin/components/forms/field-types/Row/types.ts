import { RowField } from '../../../../../fields/config/types';
import { FieldTypes } from '..';
import { FieldPermissions } from '../../../../../auth/types';

export type Props = Omit<RowField, 'type'> & {
  path?: string
  fieldTypes: FieldTypes
  permissions: FieldPermissions
  indexPath: string
}
