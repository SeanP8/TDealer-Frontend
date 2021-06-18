import Header from "./Header"
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Russo One', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
    font-weight: normal;
    font-style: normal;
  }  
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(---lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 20px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Russo One', sans-serif;
    padding: 0;
    margin:0;
    font-size: 1.5rem;
    line-height: 2;
    }

  a {
    text-decoration: none;
    color: var(---black);
  }

  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'Russo One', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
  }

`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;
export default function Page({children}) {
    return (
        <div>
            <GlobalStyle/>
        <Header />
        <InnerStyles>{children}</InnerStyles>
            
        </div>
    )
}