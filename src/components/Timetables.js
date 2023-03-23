import React from "react";
import styled from "styled-components";

//uuid
import { v4 as uuidv4 } from "uuid";

//Components
import Timetable from "./Timetable";
import TableOfStops from "./TableOfStops";

const Timetables = ({ timetables, setTimetables, setClickedRouteId,setShowingBusTrip }) => {
  return (
    <>
      {timetables.map((timetable) => (
        <FullTimetabled key={uuidv4()}>
          <h2>{timetable.tripHeadsign}</h2>
          <TimetableStyled>
            <TableOfStops
              setClickedRouteId={setClickedRouteId}
              setTimetables={setTimetables}
              stopsList={timetable.stopsList}
            />
            <Timetable departureTime={timetable.departureTime} setShowingBusTrip={setShowingBusTrip} />
          </TimetableStyled>
        </FullTimetabled>
      ))}
    </>
  );
};

const TimetableStyled = styled.div`
  display: flex;
  width: 100%;
`;

const FullTimetabled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4rem;
  border: 2px solid black;
  padding: 1rem;
  width: 50%;
  @media only screen and (max-width: 992px) {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const TitleOfTripHeadsign = styled.h2``;

export default Timetables;
