class Traveler {
  constructor(name, trips) {
    // this.id = data.id;
    this.name = name;
    // this.travelerType = data.travelerType
    this.trips = trips;
    // this.destinations = data.destinations
  }
  presentTrips() {
    let currentDay = Date.now()
    return this.trips.filter(trip => {
      let pastDay = Date.parse(trip.date)
      return pastDay === currentDay
    })
  }
  pendingTrips() {
    return this.trips.filter(trip => {
      return trip.status.includes('pending')
    })
  }
  pastTrips() {
    let currentDay = Date.now()
    return this.trips.filter(trip => {
      let pastDay = Date.parse(trip.date)
      return pastDay < currentDay
    })
  }
  upcomingTrips() {
    let currentDay = Date.now()
    return this.trips.filter(trip => {
      let pastDay = Date.parse(trip.date)
      return pastDay > currentDay
    })
  }
  // pastAndUpcomingTrips() {
  //   let currentDay = Date.now()
  //   const day = this.trips.reduce((acc, trip) => {
  //     const pastDay = Date.parse(trip.date)
  //     if (currentDay < pastDay) {
  //       acc.upcoming.push(trip)
  //     } else {
  //       acc.past.push(trip)
  //     }
  //     return acc
  //   }, {'past': [], 'upcoming': []})
  //   return day;
  // }

  combineData() {
    // function combineData(data) {
    //   console.log("DATA", data)


  }
  calculateTotalCost() {
    return this.trips.filter(trip => {
      return
    })
  }
}

export default Traveler;
