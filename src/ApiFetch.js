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
}


export default ApiFetch;
