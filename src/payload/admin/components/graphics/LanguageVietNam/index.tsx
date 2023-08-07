import React from 'react';
import { useAuth } from '../../utilities/Auth';
import { useConfig } from '../../utilities/Config';
import GLanguageVietNam from './GLanguageVietNam';
import vietnamImage from '../../../assets/images/vietnam.jpg';
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
  <img className="graphic-account" width="30" height="30" src={vietnamImage} />
);

const LanguageVietNam = () => {
  const {
    admin: { avatar: Avatar },
  } = useConfig();
  const { user } = useAuth();
  const { t, i18n } = useTranslation('authentication');

  // Function to change the language to Chinese
  const changeToChinese = () => {
    i18n.changeLanguage('vi'); // 'vi' is the language code for vietnamese
  };

  return (
    <div onClick={changeToChinese}>
      {Avatar === 'default' && <Default />}
      {Avatar === 'gravatar' && <GLanguageVietNam />}
    </div>
  );
};

export default LanguageVietNam;
