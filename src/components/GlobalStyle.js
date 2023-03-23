import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        font-size: 16px;
        @media only screen and (max-width: 600px) {
            font-size: 10px;
        } 
    }

    body{
        height: 100vh;
        font-family: 'Source Sans Pro', sans-serif;
        background-color: #E5CCC3;
    }

    h1{
        font-size: 4rem;
    }

    p{
        font-size: 1.5rem;
    }

    h2{
        font-size: 3rem;
    }
`;

export default GlobalStyle;
