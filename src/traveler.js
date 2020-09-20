class Traveler {
  constructor(data) {
    console.log("T", data)
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType
    this.trips = data.trips
    this.destinations = data.destinations
  }
  presentTrips(currentDay) {
    return this.trips.filter(trip => {
      return trip.date === currentDay
    })
  }
  pendingTrips() {
    return this.trips.filter(trip => {
      return trip.status.includes('pending')
    })
  }
  pastAndUpcomingTrips(currentDay) {
    const day = this.trips.reduce((acc, trip) => {
      const pastDay = Date.parse(trip.date)
      if (currentDay < pastDay) {
        acc.upcoming.push(trip)
      } else {
        acc.past.push(trip)
      }
      return acc
    }, {'past': [], 'upcoming': []})
    return day;
  }
}

export default Traveler;

function getDate(data) {
  console.log("Obj", data)


}
