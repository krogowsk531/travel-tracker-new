class Traveler {
  constructor(name, trips) {
    this.name = name;
    this.trips = trips;
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

  tripsThisYear() {
    return this.trips.filter(trip => {
      return trip.date.includes('2020')
    })
  }
}

export default Traveler;
