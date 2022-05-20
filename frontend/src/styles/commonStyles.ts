/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const commonStyles = css`
  @font-face {
    font-family: 'MinSans-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Regular.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MinSans-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Bold.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Yeongdo-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/Yeongdo-Rg.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html {
    scroll-behavior: smooth;
    height: 100%;
  }
  body {
    margin: 0 auto;
    max-width: 425px;
    background-color: #fff;
    height: 100%;
    font-family: 'MinSans-Regular';
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fffdfb;
    /* ::-webkit-scrollbar {
      display: none;
    } */
  }
`;

export default commonStyles;
