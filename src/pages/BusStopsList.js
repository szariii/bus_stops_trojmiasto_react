import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBusStopsList } from "../features/busstopsList/busStopsListSlice";

//styled
import styled from "styled-components";

//lodash
import _ from "lodash";

//Components
import BusStopShortcut from "../components/BusStopShortcut";

//Helping Functions
import { dateConvert } from "../helpingFunctions";

const BusStopsList = () => {
  //State
  const [arrayOfMatchingBusStops, setArrayOfMatchingBusStops] = useState([]);
  //Take a value of state
  const busStopsLists = useSelector((state) => state.busStopsList.value);

  //Take today date
  const convertedDate = dateConvert();

  //Take current bus stops list name with repeat
  const busStopsList = _.get(
    busStopsLists,
    `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
  );

  //Take array of bus stops list name without repeat
  const busStopArray = [];
  if (_.isEmpty(busStopsList) === false) {
    busStopsList.stops.map((busStop) =>
      busStopArray.includes(busStop.stopDesc) || busStop.stopDesc === null
        ? ""
        : busStopArray.push(busStop.stopDesc)
    );
  }

  //Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusStopsList());
  }, [dispatch]);

  //Handlers

  //Find bus stops which fit to text in input
  const findBusStopHandler = (e) => {
    const value = e.target.value;
    const arrayOfValue = value.split("");
    setArrayOfMatchingBusStops([]);
    let flag = false;
    let counter = 0;
    busStopArray.map((busStop) => {
      for (let i = 0; i < arrayOfValue.length; i++) {
        flag = false;
        if (busStop.charAt(i).toLowerCase() === arrayOfValue[i].toLowerCase()) {
          flag = true;
        } else {
          break;
        }
      }
      if (flag === true) {
        if (counter < 6) {
          setArrayOfMatchingBusStops((arr) => [...arr, busStop]);
          counter++;
        }
      }
    });
  };

  return (
    <BusStopListStyled>
      <h1>Bus stops list</h1>
      <InputStyled
        type="text"
        placeholder="Type bus stop name"
        onChange={findBusStopHandler}
      />
      {arrayOfMatchingBusStops.map((busStop) => (
        <BusStopShortcut name={busStop} key={busStop} />
      ))}
    </BusStopListStyled>
  );
};

const BusStopListStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputStyled = styled.input`
  width: 50rem;
  height: 5rem;
  font-size: 4rem;
  @media only screen and (max-width: 600px) {
    width: 25rem;
    height: 3rem;
    font-size: 2rem;
  }
`;

export default BusStopsList;
