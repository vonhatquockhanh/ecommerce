import React from 'react';
import { useConfig } from '../../utilities/Config';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';

const css = `
  .graphic-icon path {
    fill: var(--theme-elevation-1000);
  }
`;

const PayloadIcon: React.FC = () => (
  // <svg
  //   width="25"
  //   height="25"
  //   viewBox="0 0 25 25"
  //   xmlns="http://www.w3.org/2000/svg"
  //   className="graphic-icon"
  // >
  //   <style>
  //     {css}
  //   </style>
  //   <path
  //     d="M11.5293 0L23 6.90096V19.9978L14.3608 25V11.9032L2.88452 5.00777L11.5293 0Z"
  //   />
  //   <path
  //     d="M10.6559 24.2727V14.0518L2 19.0651L10.6559 24.2727Z"
  //   />
  // </svg>

  <svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{css}</style>
    <path
      d="M24.3843 14.5182L16.2559 0.439606L8.12838 14.5182L0 28.5959H8.68154L16.2559 15.477L23.8304 28.5959H32.5119L24.3843 14.5182Z"
      fill="url(#paint0_linear_3379_9555)"
    />
    <path
      d="M14.4056 3.64529L0 28.5956H8.68154L16.2559 15.4767L23.8304 28.5956H28.7359L14.4056 3.64529Z"
      fill="url(#paint1_linear_3379_9555)"
    />
    <path
      d="M15.702 14.5178L11.9148 7.95755L8.12838 14.5178L0 28.5956H7.5744H8.68154L16.2559 15.4766L15.702 14.5178Z"
      fill="url(#paint2_linear_3379_9555)"
    />
    <path
      d="M15.7016 14.5177L14.0854 11.7173L12.4684 14.5177L4.34082 28.5954H7.57405H8.68119L16.2556 15.4765L15.7016 14.5177Z"
      fill="url(#paint3_linear_3379_9555)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3379_9555"
        x1="2.84682"
        y1="3.43233"
        x2="13.0516"
        y2="22.5824"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7F2BFF" />
        <stop offset="1" stop-color="#FD71FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3379_9555"
        x1="4.56244"
        y1="12.6635"
        x2="16.2159"
        y2="27.9206"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#7F2BFF" />
        <stop offset="1" stop-color="#D230FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_3379_9555"
        x1="7.82213"
        y1="22.5083"
        x2="15.6459"
        y2="9.13844"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#AE32FF" />
        <stop offset="0.13" stop-color="#A530F6" />
        <stop offset="0.34" stop-color="#8E2BDF" />
        <stop offset="0.6" stop-color="#6824B8" />
        <stop offset="0.9" stop-color="#351A84" />
        <stop offset="1" stop-color="#231772" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_3379_9555"
        x1="6.30577"
        y1="28.8335"
        x2="15.6415"
        y2="12.8782"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#AE32FF" />
        <stop offset="0.36" stop-color="#7E28CE" />
        <stop offset="1" stop-color="#231772" />
      </linearGradient>
    </defs>
  </svg>
);

const Icon: React.FC = () => {
  const {
    admin: {
      components: {
        graphics: { Icon: CustomIcon } = {
          Icon: undefined,
        },
      } = {},
    } = {},
  } = useConfig();

  return <RenderCustomComponent CustomComponent={CustomIcon} DefaultComponent={PayloadIcon} />;
};

export default Icon;
