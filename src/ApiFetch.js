class ApiFetch {
  constructor() {
    this.root = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data'

    // https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips
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

  postNewTripData(trip) {
    let url = `${this.root}/trips/trips`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    // .catch(err => console.log(err))
  }
}

// getDestinations() {
// 		let url = `${this.rootURL}/destinations/destinations`;
// 		return fetch(url)
// 						.then(response => response.json())
// 						.catch(err => console.log(err.message))

// postBookingRequest(givenTrip) {
// 		let url = `${this.rootURL}/trips/trips`;
// 		return fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(givenTrip)
// 		})
// 			.then(response => response.json())
// 			.then(data => console.log(data))
// 			.catch(err => console.log(err.message))
// 	}

export default ApiFetch;
