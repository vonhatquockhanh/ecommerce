import React from 'react';
import ElementButton from '../Button';
import H4Icon from '../../../../../icons/headings/H4';

const H4 = ({ attributes, children }) => (
  <h4 {...attributes}>{children}</h4>
);

const h4 = {
  Button: () => (
    <ElementButton format="h4">
      <H4Icon />
    </ElementButton>
  ),
  Element: H4,
};

export default h4;
