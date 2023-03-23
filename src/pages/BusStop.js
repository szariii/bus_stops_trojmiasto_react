import React, { useEffect, useState } from "react";
import styled from "styled-components";

//React Router DOM
import { useLocation } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Slicers
import { fetchBusStopsList } from "../features/busstopsList/busStopsListSlice";
import { fetchbusStopsLinkedWithTrip } from "../features/busStopsWithTripsList/busStopsWithTripsListSlice";
import { fetchRoutes } from "../features/routes/routesSlice";

//api
import { timetableUrl, tripsUrl } from "../api";

//Components
import TripShortInfo from "../components/TripShortInfo";
import LoadingData from "../components/LoadingData";
import Timetables from "../components/Timetables";
import BusTrip from "../components/BusTrip";

//lodash
import _ from "lodash";

//Helping functions
import { dateConvert } from "../helpingFunctions";

const BusStop = () => {
  //State
  const [routesOnCurrentBusStop, setRoutesOnCurrentBusStop] =
    useState("loading");

  const [timetableData, setTimetableData] = useState("");
  const [clickedRouteId, setClickedRouteId] = useState("");
  const [timetables, setTimetables] = useState("");
  const [showingBusTrip, setShowingBusTrip] = useState("");
  const [choosenBusShortName, setChoosenBusStopName] = useState("");

  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    if (clickedRouteId === "") {
      dispatch(fetchBusStopsList());
      dispatch(fetchbusStopsLinkedWithTrip());
      dispatch(fetchRoutes());
    }
  }, [dispatch]);

  useEffect(() => {
    setRoutesOnCurrentBusStop("loading");
    return () => {
      setRoutesOnCurrentBusStop("loading");
    };
  }, []);

  //Take states
  const busStopsLists = useSelector((state) => state.busStopsList.value);
  const busStopsLinkedWithTrips = useSelector(
    (state) => state.busStopsWithTripsList.value
  );
  const routes = useSelector((state) => state.routes.value);

  //Take name of bus stop
  const location = useLocation();
  const busStopName = decodeURIComponent(location.pathname.split("/")[2]);

  //Take current converted date
  const convertedDate = dateConvert();

  //Take current bus stops list  name
  const busStopsList = _.get(
    busStopsLists,
    `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
  );

  const arrayIdOfBusTrips = [];
  if (_.isEmpty(busStopsList) === false) {
    //Take informations about bus stop

    busStopsList.stops
      .filter((busStop) => busStop.stopDesc === busStopName)
      .map((busStopInformation) =>
        arrayIdOfBusTrips.push(busStopInformation.stopId)
      );

    const busStopsLinkedWithTripsAtSingleDay = _.get(
      busStopsLinkedWithTrips,
      `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
    );

    if (_.isEmpty(busStopsLinkedWithTripsAtSingleDay) === false) {
      //Check for routes Id
      const routesIds = busStopsLinkedWithTripsAtSingleDay.stopsInTrip
        .filter((busStopLinkedWithTripsAtSingleDay) =>
          arrayIdOfBusTrips.includes(busStopLinkedWithTripsAtSingleDay.stopId)
        )
        .map((busStopLinkedWithTripsAtSingleDay) => {
          return busStopLinkedWithTripsAtSingleDay.routeId;
        });

      if (_.isEmpty(routes) === false) {
        //CHeck for routes Informations
        const routesWithCurrentDate = _.get(
          routes,
          `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
        );

        const routesOnCurrentBusStops = routesWithCurrentDate.routes
          .filter((route) => routesIds.includes(route.routeId) === true)
          .sort((a, b) => a.routeShortName.localeCompare(b.routeShortName));

        //Check if state has the latest data
        if (
          JSON.stringify(routesOnCurrentBusStops) !==
          JSON.stringify(routesOnCurrentBusStop)
        ) {
          setRoutesOnCurrentBusStop(routesOnCurrentBusStops);
        }
      }
    }
  }

  //Fetch trips and timetables
  useEffect(() => {
    if (clickedRouteId !== "") {
      let timetable = "";
      fetch(
        timetableUrl(
          convertedDate.year,
          convertedDate.month,
          convertedDate.day,
          clickedRouteId
        )
      )
        .then((results) => results.json())
        .then((results) => {
          timetable = results.stopTimes;

          fetch(tripsUrl)
            .then((results) => results.json())
            .then((results) => {
              setTimetableData({
                timetable: timetable,
                trips: results,
              });
            });
        });
    }
  }, [clickedRouteId]);

  //Take information about timetable for choosen bus
  useEffect(() => {
    if (timetableData !== "") {
      //take information when bus deperture bus stop
      const timesWhenBusesStops = timetableData.timetable.filter((timetable) =>
        arrayIdOfBusTrips.includes(timetable.stopId)
      );
      //Take information on current day
      const tripsWithLastUpdate = _.get(
        timetableData.trips,
        `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
      );

      //Take trips ID
      const tripsIds = [];
      const tripsIdsWithRepeat = timesWhenBusesStops.map(
        (timesWhenBusStops) => timesWhenBusStops.tripId
      );

      //Remove duplications
      for (let i = 0; i < tripsIdsWithRepeat.length; i++) {
        if (tripsIds.includes(tripsIdsWithRepeat[i]) === false) {
          tripsIds.push(tripsIdsWithRepeat[i]);
        }
      }

      //Trips
      const trips = tripsWithLastUpdate.trips
        .filter((trip) => tripsIds.includes(trip.tripId) === true)
        .filter((trip) => clickedRouteId === trip.routeId);

      const allTrips = _.get(
        busStopsLists,
        `${convertedDate.year}-${convertedDate.month}-${convertedDate.day}`
      );

      //Create array of objects with informations about bus stops on trip
      const arrayWithTimetable = [];

      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        let obj = {};
        obj.tripHeadsign = trip.tripHeadsign;
        obj.departureTime = timesWhenBusesStops
          .filter((time) => time.tripId === trip.tripId)
          .map((data) => ({
            time: data.departureTime.split("T")[1],
            order: data.order,
            busServiceName: data.busServiceName,
          }));
        //.map((time) => time.departureTime.split("T")[1]);

        const busStopsinTrips = timetableData.timetable.filter(
          (busStop) => busStop.tripId === trip.tripId
        );
        const busServiceName = busStopsinTrips[0].busServiceName;
        const order = busStopsinTrips[0].order;
        obj.stopsList = busStopsinTrips
          .filter(
            (te) => te.busServiceName === busServiceName && te.order === order
          )
          .map((te) => ({
            stopSequence: te.stopSequence,
            stopId: te.stopId,
            stopName: allTrips.stops
              .filter((t) => t.stopId === te.stopId)
              .map((t) => t.stopDesc)[0],
          }));

        arrayWithTimetable.push(obj);
      }
      setTimetables(arrayWithTimetable);
    }
  }, [timetableData]);

  return (
    <BusStopStyled>
      <h1>{busStopName}</h1>
      {/* bus stop list or loading */}
      {routesOnCurrentBusStop === "loading" ? (
        <LoadingData />
      ) : (
        <BusStopsList>
          {routesOnCurrentBusStop.map((routeOnCurrentBusStop) => (
            <TripShortInfo
              key={routeOnCurrentBusStop.routeId}
              routeShortName={routeOnCurrentBusStop.routeShortName}
              routeId={routeOnCurrentBusStop.routeId}
              setClickedRouteId={setClickedRouteId}
              clickedRouteId={clickedRouteId}
              setChoosenBusStopName={setChoosenBusStopName}
            />
          ))}
        </BusStopsList>
      )}

      {/* Timetables */}
      <TimetablesStyled>
        {timetables === "" ? (
          ""
        ) : (
          <Timetables
            setClickedRouteId={setClickedRouteId}
            timetables={timetables}
            setShowingBusTrip={setShowingBusTrip}
          />
        )}
      </TimetablesStyled>
      {/* Bus trip */}
      {showingBusTrip === "" ? (
        ""
      ) : (
        <BusTrip
          showingBusTrip={showingBusTrip}
          setShowingBusTrip={setShowingBusTrip}
          timetable={timetableData.timetable}
          choosenBusShortName={choosenBusShortName}
          busStopsLists={busStopsLists}
        />
      )}
    </BusStopStyled>
  );
};

//Styled Components

const TimetablesStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BusStopStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BusStopsList = styled.div`
  display: grid;
  max-width: 60%;
  grid-template-columns: repeat(auto-fill, minmax(4rem, auto));
  place-items: center;
`;

export default BusStop;
