import { SanitizedCollectionConfig } from '../../../../collections/config/types';

export type Props = {
  collection: SanitizedCollectionConfig,
  columns: string[]
  setColumns: (columns: string[]) => void,
}
