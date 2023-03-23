export const baseUrl = `https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/`;

export const busStopsList = `4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json`;

export const busLinesListUrl =
  "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json";

export const timetable = (date, routeId) => {
  return `http://ckan2.multimediagdansk.pl/stopTimes?date=${date}&routeId=${routeId}`;
};

export const busStopsLinkedWithTripUrl =
  "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/3115d29d-b763-4af5-93f6-763b835967d6/download/stopsintrip.json";

export const routesUrl =
  "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json";

export const timetableUrl = (year, month, day, routeId) => {
  return `https://ckan2.multimediagdansk.pl/stopTimes?date=${year}-${month}-${day}&routeId=${routeId}`;
};

export const tripsUrl =
  "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/b15bb11c-7e06-4685-964e-3db7775f912f/download/trips.json";
