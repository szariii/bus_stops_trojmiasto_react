import React from "react";
import styled from "styled-components";

const Timetable = ({ departureTime, setShowingBusTrip }) => {
  
  //Prepare data to output
  const arrayWithSpiltedDepartureTime = departureTime.map((data) => ({
    ...data,
    time: data.time.split(":"),
  }));

  const arrayOfValueParseToInt = arrayWithSpiltedDepartureTime.map((data) => ({
    ...data,
    time: data.time.map((time) => parseInt(time)),
  }));

  //Handlers
  const clickBusTripHandler = (order, busServiceName) => {
    setShowingBusTrip({
      order: order,
      busServiceName: busServiceName,
    });
  };

  //Show data dynamically
  const arrayWithHtmlElementsOfTimetable = [];

  for (let i = 0; i < 24; i++) {
    let element = (
      <TimetableRow key={i}>
        <TimetablesHours>
          <p
            style={
              i % 2 === 0
                ? { backgroundColor: `#b5b5de` }
                : { backgroundColor: `#d39c9c` }
            }
          >
            {i}
          </p>
        </TimetablesHours>
        <TimetableMinutes
          style={
            i % 2 === 0
              ? { backgroundColor: `#b5b5de` }
              : { backgroundColor: `#d39c9c` }
          }
        >
          {arrayOfValueParseToInt
            .filter((times) => times.time[0] === i)
            .sort((a, b) => a.time[1] - b.time[1])
            .map((data) => (
              <ParagraphStyled
                key={data.time[1]}
                onClick={() =>
                  clickBusTripHandler(data.order, data.busServiceName)
                }
              >
                {data.time[1]}
                ,&nbsp;
              </ParagraphStyled>
            ))}
        </TimetableMinutes>
      </TimetableRow>
    );

    arrayWithHtmlElementsOfTimetable.push(element);
  }

  return (
    <TimetableStyled>
      {departureTime === "" ? "console.log(departureTime)" : ""}
      <div>{arrayWithHtmlElementsOfTimetable}</div>
    </TimetableStyled>
  );
};

const ParagraphStyled = styled.p`
  display: inline-block;
  cursor: pointer;
`;

const TimetableStyled = styled.div`
  width: 50%;
`;

const TimetableRow = styled.div`
  display: flex;
`;

const TimetablesHours = styled.div`
  border: 2px solid black;
  width: 20%;
`;

const TimetableMinutes = styled.div`
  border: 2px solid black;
  width: 80%;
`;

export default Timetable;
