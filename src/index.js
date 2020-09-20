// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// import ApiFetch from './ApiFetch';
// import domUpdates from './domUpdates';
import traveler from './traveler';

console.log('This is the JavaScript entry file - your code begins here.');

// function getData() {
//   const api = new ApiFetch();
//   const travelerData = api.getTravelersData()
//   console.log("TD", travelerData)
//   const tripData = api.getTripsData()
//   const destinationData = api.getDestinationsData();
//
//   Promise.all([travelerData, tripData, destinationData])
//     .then(data => data = {
//       travelerData: data[0].travelers,
//       tripData: data[0].trips,
//       destinationData: data[0].destinations
//     })
//     .then(getUser)
//     .then(getDate)
//     // .then(displayTrips)
//     .then(dataSets => console.log("ENDRESULT", dataSets))
//
//     // .catch(err => console.error(err))
// }

function getData() {
  Promise.all([
    // fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')

    // fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData'),
    // fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(getUser)
    .then(getDate)
    .then(displayPastTrips)
    .then(data => console.log("ENDRESULT", data))

    // .catch(err => console.error(err))
}

getData()

function getUser(userData) {
  console.log("DIE", userData)
  // console.log("HELLO", userData[0].trips)
  //match the userID to the loginID
  const loggedInUser = 50;
  const matchUser = userData[0].trips.filter(user => {
    // console.log(user)
    return user.userID === loggedInUser
  })
  // console.log("MATCH", matchUser)
  return matchUser
}

const currentDay = Date.now()

function getDate(userData) {
  // console.log("Obj", userData)

  const day = userData.reduce((acc, trip) => {
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

function displayPastTrips(userData) {
  console.log("BEtTer", userData)
  let displayPastTrips = document.querySelector('.past-trips-card')
  displayPastTrips.innerHTML +=
  ` <p>Madrid</p>
    <img>IMG</img>
    <p>${userData.past.date}</p>
    <p>Duration</p>`
    return displayPastTrips
}
