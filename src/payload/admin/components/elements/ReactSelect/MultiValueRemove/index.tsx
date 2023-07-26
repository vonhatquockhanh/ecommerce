import React from 'react';
import { useTranslation } from 'react-i18next';
import { MultiValueRemoveProps } from 'react-select/src/components/MultiValue';
import X from '../../../icons/X';
import Tooltip from '../../Tooltip';
import { Option as OptionType } from '../types';
import './index.scss';

const baseClass = 'multi-value-remove';

export const MultiValueRemove: React.FC<MultiValueRemoveProps<OptionType>> = (props) => {
  const {
    innerProps,
  } = props;
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { t } = useTranslation('general');

  return (
    <button
      {...innerProps}
      type="button"
      className={baseClass}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        setShowTooltip(false);
        innerProps.onClick(e);
      }}
      aria-label={t('remove')}
    >
      <Tooltip
        className={`${baseClass}__tooltip`}
        show={showTooltip}
      >
        {t('remove')}
      </Tooltip>
      <X className={`${baseClass}__icon`} />
    </button>
  );
};
