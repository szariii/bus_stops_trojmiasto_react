import React from "react";
import styled from "styled-components";

const TripShortInfo = ({
  routeShortName,
  routeId,
  setClickedRouteId,
  clickedRouteId,
  setChoosenBusStopName
}) => {
  //Handlers
  const changeShowingRouteId = () => {
    setClickedRouteId(routeId);
    setChoosenBusStopName(routeShortName)
  };


  return (
    <TripShortInfoStyled
      onClick={changeShowingRouteId}
      style={
        clickedRouteId === routeId
          ? { backgroundColor: "#0000FF", color: "#FFFFFF" }
          : {}
      }
    >
      <p>{routeShortName}</p>
    </TripShortInfoStyled>
  );
};

const TripShortInfoStyled = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  border: 2px solid black;
  cursor: pointer;
  &&:hover {
    background-color: yellow;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TripShortInfo;
