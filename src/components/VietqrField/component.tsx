import * as React from 'react';
import useField from '../../payload/admin/components/forms/useField';
import SelectInput from '../../payload/admin/components/forms/field-types/Select/Input';
import { useAllFormFields } from '../../payload/admin/components/forms/Form/context';
import { useTranslation } from 'react-i18next';
import vietQR from '../../vietqr';
import Error from '../../payload/admin/components/forms/Error';
import './styles.scss';

export const VietqrComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue, errorMessage, showError } = useField<string>({ path });
  const [_, dispatchFields] = useAllFormFields();
  const { t } = useTranslation('fields');
  const [options, setOptions] = React.useState([]);

  // Fetch options on component mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      vietQR
        .getBanks()
        .then(banks => {
          const countryOptions = banks?.data?.map(bank => {
            return {
              value: `${bank.id}`,
              label: `${bank.code} - ${bank.name}`,
              bin: bank.bin,
              name: bank.name,
              shortName: bank.shortName,
            };
          });

          setOptions(countryOptions.sort((a, b) => a.label.localeCompare(b.label)));
        })
        .catch(err => {});
    };

    fetchOptions();
  }, []);

  return (
    <div className="field field-bank">
      <Error showError={showError} message={errorMessage} />
      <label className="field-label">
        <span>{t('bank')}</span>
        <span className="required">*</span>
      </label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={e => {
          setValue(e.value);
          dispatchFields({
            type: 'UPDATE',
            path: 'bank_name',
            value: e.name,
          });
          dispatchFields({
            type: 'UPDATE',
            path: 'bank_short_name',
            value: e.shortName,
          });
          dispatchFields({
            type: 'UPDATE',
            path: 'bank_bin',
            value: e.bin,
          });
        }}
      />
    </div>
  );
};
