class ApiFetch {
  constructor() {
    this.root = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data'
  }

  getTravelersData() {
    let url = `${this.root}/travelers/travelers`
    return fetch(url).then(response => response.json())
  }

  getTripsData() {
    let url = `${this.root}/trips/trips`
    return fetch(url).then(response => response.json())
  }

  getDestinationsData() {
    let url = `${this.root}/destinations/destinations`
    return fetch(url).then(response => response.json())
  }

  postTripRequest(tripDetails) {
  console.log("MORNING", tripDetails)
  let url = `${this.root}/trips/trips`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripDetails),
  })
    .then(response => response.json())
    .catch(err => console.log(err.message));
  }
}

export default ApiFetch;
