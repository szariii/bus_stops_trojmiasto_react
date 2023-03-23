import React from "react";

//Styled
import styled from "styled-components";

//React Router DOM
import { Link } from "react-router-dom";

const BusStopShortcut = ({ name }) => {
  return (
    <BusStopShortcutStyled>
      <LinkStyled to={`/busstopslist/${encodeURIComponent(name)}`}>
        <h2>{name}</h2>
      </LinkStyled>
    </BusStopShortcutStyled>
  );
};

//Styled Components
const BusStopShortcutStyled = styled.div`
  width: 50rem;
  min-height: 4rem;
  border: 2px solid black;
  background-color: lightblue;
  && :hover {
    background-color: lightyellow;
  }
  @media only screen and (max-width: 600px) {
    width: 25rem;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

export default BusStopShortcut;
