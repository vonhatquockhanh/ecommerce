import { Field } from '../../payload/fields/config/types';
import { VietqrComponent } from './component';

export const VietqrField: Field = {
  name: 'vietqrBank',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: VietqrComponent,
    },
  }
}