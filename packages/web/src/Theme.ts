import { createGlobalStyle } from 'styled-components';

export const theme = {
  background: '#21bf73;',
  grey: '#faf9fa',
  white: '#ffffff',
  pink: '#ff3366',
  purple: {
    hex: '#473cfc',
    tint: [
      '#5950FC',
      '#6C63FD',
      '#7E77FD',
      '#918AFD',
      '#A39EFE',
      '#B5B1FE',
      '#C8C5FE',
      '#DAD8FE',
      '#EDECFF',
      '#FFFFFF'
    ]
  }



}

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    overflow-x: hidden;
  }

  body {
    background: ${theme.grey};
  }

  #root {
    height: 100vh;
}


  button {
    cursor: pointer;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    
    appearance: none;
        &::-moz-focus-inner {
            border: 0;
            padding: 0;
        }
  }

  textarea, select, input {
    border-radius:0;
    appearance: none;
    background-color:#fff;
    color:#000;
    outline:0;
    margin:0;
    padding:0;
    text-align: left;
    font-size:1em;
    height: 1em;
    vertical-align: middle;
    border: none;
}

`;
