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
      travelerData: data[0].travelers,
      tripData: data[1].trips,
      destinationData: data[2].destinations
    })
    .then(combineData)
    .then(getUserTrips)
    // .then(pendingTrips)
    // .then(presentTrips)
    .then(getDate)
    .then(displayPastTrips)
    .then(data => console.log("ENDRESULT", data))

    // .catch(err => console.error(err))
}

getData()



function combineData(data) {
  console.log("DATA", data)
  //image, duration, date, destinationName, userID
  //return type will be an array of objects
  //each object is an object literal with the keys on 57
  return data
}

function getUserTrips(data) {
  console.log("1", data.tripData)
  console.log('2', data.travelerData)
  console.log('3', data.destinationData)
  // console.log("HELLO", tripData[1].trips)
  // console.log("HELLO2", userData[0].destinations)
  //match the userID to the loginID
  const loggedInUser = 50;
  const matchUser = data.tripData.filter(user => {
    // console.log(user)
    return user.userID === loggedInUser
  })
  console.log("MATCH", matchUser)
  return matchUser
}

// function pendingTrips(data) {
//   console.log('pending', data)
//   const pendingTrips = data.filter(user => {
//     return user.status === 'pending'
//   })
//   console.log("PENDINGTRIPS", pendingTrips)
//   return pendingTrips
// }
const currentDay = Date.now()

// function presentTrips(data) {
//   console.log("PRESENT", data)
//   const today = data.filter(user => {
//     return user.date.includes(currentDay)
//   })
//   console.log('presentTrips', today)
//   return today
// }

function getDate(data) {
  console.log("Obj", data)

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

function displayPastTrips(data) {
  // console.log("TIRED")
  console.log("BEtTer", data)
  let displayPastTrips = document.querySelector('.past-trips-card')
  displayPastTrips.innerHTML +=
  ` <p>${data.past[0].destinationID}</p>
    <img>IMG</img>
    <p>${data.past[0].date}</p>
    <p>Duration</p>`
    return displayPastTrips
}
