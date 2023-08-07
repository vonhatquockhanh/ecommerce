import React from 'react';
import { useAuth } from '../../utilities/Auth';
import { useConfig } from '../../utilities/Config';
import GLanguageChina from './GLanguageChina';
import chinaImage from '../../../assets/images/china.png';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../../../translations/type';

const css = `
  .graphic-account .circle1 {
    fill: var(--theme-elevation-100);
  }

  .graphic-account .circle2, .graphic-account path {
    fill: var(--theme-elevation-300);
  }
`;

const Default: React.FC = () => (
  <img className="graphic-account" width="30" height="30" src={chinaImage} />
);

const LanguageChina = () => {
  const {
    admin: { avatar: Avatar },
  } = useConfig();
  const { user } = useAuth();
  const { t, i18n } = useTranslation('authentication');

  // Function to change the language to Chinese
  const changeToChinese = () => {
    i18n.changeLanguage('zh'); // 'zh' is the language code for Chinese
  };

  return (
    <div onClick={changeToChinese}>
      {Avatar === 'default' && <Default />}
      {Avatar === 'gravatar' && <GLanguageChina />}
    </div>
  );
};

export default LanguageChina;
