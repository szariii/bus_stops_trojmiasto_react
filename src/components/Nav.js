import React from "react";
//styled
import styled from "styled-components";

//React router DOM
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <NavStyled>
      <LinkStyled to={"/"}>
        <h1>Main page</h1>
      </LinkStyled>
    </NavStyled>
  );
};

//Styled Components
const NavStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  background-color: #6047df;
  width: 100%;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #e5ccc3;
`;

export default Nav;
