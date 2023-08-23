import CurrencyInput from './CurrencyInput';
import Cell from './Cell';
import { Field, Validate } from '../../payload/fields/config/types';
import { PRODUCT_TRANSLATION } from '../../translate';

export const validateInputCurrenCy: Validate = (value: string = '', options): string | true | Promise<string | true> => {
  return value ? true : options.t('error:pleaseEnterThisField');
}

const currencyField: Field = {
  name: 'product_total_price',
  type: 'number',
  label: PRODUCT_TRANSLATION.product_price,
  required: true,
  admin: {
    components: {
      Field: CurrencyInput,
      Cell,
    }
  }
};

export default currencyField;