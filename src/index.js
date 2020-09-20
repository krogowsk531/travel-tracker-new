// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates';
import traveler from './traveler';

console.log('This is the JavaScript entry file - your code begins here.');

function getData() {
  const api = new ApiFetch();
  const tripData = api.getTripsData()
  const travelerData = api.getTravelersData()
  console.log("TD", travelerData)
  const destinationData = api.getDestinationsData();

  Promise.all([travelerData, tripData, destinationData])
    .then(data => data = {
      tripData: data[1].trips,
      travelerData: data[0].travelers,
      destinationData: data[2].destinations
    })
    .then(getUser)
    .then(getDate)
    // .then(displayTrips)
    .then(data => console.log("ENDRESULT", data))

    // .catch(err => console.error(err))
}

// function getData() {
//   Promise.all([
//     fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
//     fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
//     fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
//   ])
//     .then(responses => Promise.all(responses.map(response => response.json())))
//     .then(getUser)
//     .then(getDate)
//     // .then(display)
//     // .then(displayPastTrips)
//     .then(data => console.log("ENDRESULT", data))
//
//     // .catch(err => console.error(err))
// }

getData()

function getUser(data) {
  console.log("DIE", data.tripData)
  // console.log("HELLO", tripData[1].trips)
  // console.log("HELLO2", userData[0].destinations)
  //match the userID to the loginID
  const loggedInUser = 50;
  const matchUser = data.tripData.filter(user => {
    // console.log(user)
    return user.userID === loggedInUser
  })
  // console.log("MATCH", matchUser)
  return matchUser
}


function getDate(data) {
  console.log("Obj", data)

  const currentDay = Date.now()
  const day = data.reduce((acc, trip) => {
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

// function getId() {
//   const username = document.getElementById('username').value;
//   if (username.includes('traveler')) {
//     const travelerID = Number(username.split('traveler')[1]);
//     return Number(travelerID);
//   }
// }

// function display(traveler) {
//   domUpdates.displayWelcome(traveler)
// }

function displayPastTrips(userData) {
  // console.log("TIRED")
  console.log("BEtTer", userData)
  let displayPastTrips = document.querySelector('.past-trips-card')
  displayPastTrips.innerHTML +=
  ` <p>${userData[2].destinations}</p>
    <img>IMG</img>
    <p>${userData[0].past.date}</p>
    <p>Duration</p>`
    return displayPastTrips
}
