import React, { useCallback, useState } from 'react';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import withCondition from '../../withCondition';
import { password } from '../../../../../fields/validations';
import { Props } from './types';

import './index.scss';
import Eye from '../../../icons/Eye';
import EyeInvisible from '../../../icons/Eye/EyeInvisible';

const Password: React.FC<Props> = props => {
  const {
    path: pathFromProps,
    name,
    required,
    validate = password,
    style,
    className,
    width,
    autoComplete,
    label,
  } = props;

  const path = pathFromProps || name;

  const memoizedValidate = useCallback(
    (value, options) => {
      const validationResult = validate(value, { ...options, required });
      return validationResult;
    },
    [validate, required],
  );

  const { value, showError, formProcessing, setValue, errorMessage } = useField({
    path,
    validate: memoizedValidate,
  });

  const [visiblePassword, setVisiblePassword] = useState(false);

  const toggleVisible = () => {
    setVisiblePassword(!visiblePassword);
  };

  const classes = ['field-type', 'password', className, showError && 'error'].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <Error showError={showError} message={errorMessage} />
      <Label htmlFor={`field-${path.replace(/\./gi, '__')}`} label={label} required={required} />
      <div className="input-wrapper">
        <input
          id={`field-${path.replace(/\./gi, '__')}`}
          value={(value as string) || ''}
          onChange={setValue}
          disabled={formProcessing}
          type={visiblePassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          name={path}
        />
        <span className="input-suffix" onClick={toggleVisible}>
          {visiblePassword ? <Eye /> : <EyeInvisible />}
        </span>
      </div>
    </div>
  );
};

export default withCondition(Password);
