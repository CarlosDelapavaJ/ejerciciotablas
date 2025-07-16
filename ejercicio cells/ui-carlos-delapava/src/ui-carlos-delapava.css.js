import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 20px;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
}

p {
  font-size: 16px;
  color: #333;
  text-align: center;
}

.img {
  text-align: center;
}

img {
  display: block;
  margin: 10px 0;
  width: 100%;
}

ul {
  list-style-type: square;
  padding-left: 20px;
}

a {
  color: #0066cc;
  text-decoration: none;
}

form {
  margin-top: 20px;
  background-color: #ffffff;
  padding: 25px;
  border: 1px solid #ccc;
}

input {
  background-color: #0066cc;
  border-radius: 12px;
  border-color: #333;
}

.button {
  display: flex;
  align-items: center;
}

.lista {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
}
`;
