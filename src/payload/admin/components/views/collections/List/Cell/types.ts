import { Field } from '../../../../../../fields/config/types';
import { SanitizedCollectionConfig } from '../../../../../../collections/config/types';

export type Props = {
  field: Field
  colIndex: number
  collection: SanitizedCollectionConfig
  cellData: unknown
  rowData: {
    [path: string]: unknown
  }
  link?: boolean
  onClick?: (Props) => void
  className?: string
}
