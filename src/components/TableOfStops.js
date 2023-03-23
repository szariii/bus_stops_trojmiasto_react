import React from "react";
import styled from "styled-components";

//React Router DOM
import { Link } from "react-router-dom";

const TableOfStops = ({ stopsList, setTimetables, setClickedRouteId }) => {
  const sortedStopList = stopsList.sort(
    (a, b) => a.stopSequence - b.stopSequence
  );

  //Handlers
  const linkClickHandler = () => {
    setTimetables("");
    setClickedRouteId("");
  };

  //Create list of bus stops
  const arrayOfHtmlElementsToShow = [];

  for (let i = 0; i < sortedStopList.length; i++) {
    let element = (
      <SingleBusStopStyled key={i}>
        <LinkStyled
          onClick={linkClickHandler}
          to={`/busstopslist/${encodeURIComponent(sortedStopList[i].stopName)}`}
        >
          <p>{`${i}) ${sortedStopList[i].stopName}`}</p>
        </LinkStyled>
      </SingleBusStopStyled>
    );
    arrayOfHtmlElementsToShow.push(element);
  }

  return (
    <StopListStyled>
      <p>stops list</p>
      <div>{arrayOfHtmlElementsToShow}</div>
    </StopListStyled>
  );
};

const SingleBusStopStyled = styled.div`
  margin: 0.25rem;
`;

const StopListStyled = styled.div`
  width: 50%;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

export default TableOfStops;
