import React from "react";
import styled from "styled-components";

const BusStopTimeAtBusStop = ({ busStopList }) => {
  console.log(busStopList);
  const time = busStopList.arrivalTime.split("T")[1];
  return (
    <BusStopTimeAtBusStopStyled>
      <CelStyled>
        <p>{busStopList.stopDesc}</p>
      </CelStyled>
      <CelStyled>
        <p>{time}</p>
      </CelStyled>
    </BusStopTimeAtBusStopStyled>
  );
};

//Styled components
const BusStopTimeAtBusStopStyled = styled.div`
  border: 1px solid black;
  display: flex;
`;

const CelStyled = styled.div`
  border: 1px solid black;
  width: 50%;
`;

export default BusStopTimeAtBusStop;
