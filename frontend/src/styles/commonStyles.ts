/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const commonStyles = css`
  html {
    scroll-behavior: smooth;
    height: 100%;
  }
  body {
    margin: 0 auto;
    max-width: 425px;
    background-color: #fffdfb;
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fbf7f2;
  }
`;

export default commonStyles;
