import React, { useEffect, useState, useCallback, Fragment, ChangeEvent } from 'react';

// we can use existing Payload types easily

// we'll import and reuse our existing validator function on the frontend, too
import { validateInputCurrenCy } from './config';

// Import the SCSS stylesheet
import './styles.scss';
import Label from '../../payload/admin/components/forms/Label';
import Error from '../../payload/admin/components/forms/Error';
import useField from '../../payload/admin/components/forms/useField';
import FieldDescription from '../../payload/admin/components/forms/FieldDescription';

// keep a list of default colors to choose from
const baseClass = 'custom-input-currency';

const CurrencyField: React.FC<any> = props => {
  const { path, label, required, admin: { description = '' } = {} } = props;

  const {
    value = '',
    showError,
    setValue,
    errorMessage,
  } = useField({
    path,
    validate: validateInputCurrenCy,
  });

  const [inputValue, setInputValue] = useState(value ? ((value as string).toString()).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '');

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const inputValueWithoutSeperator = inputValue.replace(/[,]/g, '');
    if (
      /^-?\d*(\.\d*)?$/.test(inputValueWithoutSeperator) ||
      inputValueWithoutSeperator === '' ||
      inputValueWithoutSeperator === '-'
    ) {
      if (inputValueWithoutSeperator) {
        setValue(parseFloat(inputValueWithoutSeperator));
        setInputValue(inputValueWithoutSeperator.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      } else {
        setValue(0);
        setInputValue('');
      }
    }
  };

  return (
    <div className={'field-type text'}>
      <Error showError={showError} message={errorMessage} />
      <Label htmlFor={path} label={label} required={required} />
      <input className={`${baseClass}__input`} type="text" onChange={onInputChanged} value={inputValue} maxLength={11} />
      <FieldDescription value={value} description={description} />
    </div>
  );
};
export default CurrencyField;
