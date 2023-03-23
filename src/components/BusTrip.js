import React from "react";
import styled from "styled-components";

//Components
import BusStopTimeAtBusStop from "./BusStopTimeAtBusStop";

//lodash
import _ from "lodash";

//Helping functions
import { dateConvert } from "../helpingFunctions";

const BusTrip = ({
  showingBusTrip,
  setShowingBusTrip,
  timetable,
  choosenBusShortName,
  busStopsLists,
}) => {
  console.log(showingBusTrip);
  console.log(timetable);
  console.log(busStopsLists);

  const convertedDate = dateConvert();
  console.log(convertedDate);

  const busStopsList = _.get(
    busStopsLists,
    `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
  ).stops;

  console.log(busStopsList);

  const arrayOfBusStopsList = timetable
    .filter(
      (busStop) =>
        busStop.order === showingBusTrip.order &&
        busStop.busServiceName === showingBusTrip.busServiceName
    )
    .sort((a, b) => a.stopSequence - b.stopSequence)
    .map((busStop) => ({
      ...busStop,
      stopDesc: busStopsList
        .filter(
          (busStopListElement) => busStopListElement.stopId === busStop.stopId
        )
        .map((busStopListElement) => busStopListElement.stopDesc)[0],
    }));

  console.log(arrayOfBusStopsList);
  const cancelDivClicked = () => {
    setShowingBusTrip("");
  };

  return (
    <BusTripStyled>
      <BusStopInfo>
        <HeaderDiv>
          <div></div>
          <TripShortName>
            <h2>{choosenBusShortName}</h2>
          </TripShortName>
          <div>
            <CancelDiv onClick={cancelDivClicked}>X</CancelDiv>
          </div>
        </HeaderDiv>
        <BusStopsOnTrip>
          {arrayOfBusStopsList.map((busStopList) => (
            <BusStopTimeAtBusStop key={busStopList.stopId} busStopList={busStopList} color={busStopList.stopId%2===0?"#FFFFFF":"#FFFFFF"} />
          ))}
        </BusStopsOnTrip>
      </BusStopInfo>
    </BusTripStyled>
  );
};

//Styled components
const BusTripStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BusStopInfo = styled.div`
  background-color: white;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  border: 2px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const TripShortName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelDiv = styled.div`
  width: 3rem;
  height: 3rem;
  //background-color: red;
  border-radius: 1.5rem;
  border: 2px solid black;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BusStopsOnTrip = styled.div`
  width: 80%;
  height: 100%;
  overflow: auto;
`;

export default BusTrip;
