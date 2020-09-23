// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates';
import Traveler from './traveler';

console.log('This is the JavaScript entry file - your code begins here.');

window.addEventListener('load', onLoad);


function onLoad() {
  const loginBtn = document.querySelector('.login-button')
  loginBtn.addEventListener('click', enterLogin)
}

function enterLogin() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const loginValue = parseInt(username.match(/\d+/gi).pop())
  // console.log("VALUE", loginValue)
  const removeLogin = document.querySelector('.entry-form')
  if (username.includes('traveler') && (username.split('traveler')[1] < 51 && username.split('traveler')[1] > 0) && password === 'travel2020') {
    console.log(username + ' is logged in!!!')
    removeLogin.classList.add('hidden')
    getData(loginValue)
  } else {
    alert("WRONG PASSWORD")
  }
}


function getData(loginValue) {
  const api = new ApiFetch();
  const tripData = api.getTripsData()
  const travelerData = api.getTravelersData()
  console.log("TD", travelerData)
  const destinationData = api.getDestinationsData();
  function _createTraveler(data) {
    return createTraveler(data, loginValue)
  }

  let traveler = Promise.all([travelerData, tripData, destinationData])
    .then(data => data = {
      travelerData: data[0].travelers,
      tripData: data[1].trips,
      destinationData: data[2].destinations
    })
    .then(_createTraveler)
    // .then(displayTravelerPage)
    .then(displayHTML)
    // .then(displayGreeting)
}

// function postData()

// function postData(directory, body) {
//   const root = 'https://fe-apps.herokuapp.com/api/v1/fitlit/1908/'
//   fetch(root + directory, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   })
//     .then(response => console.log(response.status))
//     .catch(err => console.error(err))
// }

function createTraveler(data, loginValue) {
  console.log(typeof data)
  console.log("DATA", data)
  let userid = loginValue
  // console.log(data.travelerData)
  console.log(userid)
  let name = data.travelerData.find(traveler => {

    return traveler.id === userid
  }).name
  let trips = data.tripData.filter(trip => {
    return trip.userID === userid
  })
  let processedTrips = trips.map(trip => {
    let destinationObj = data.destinationData.find(destination => {
      return destination.id === trip.destinationID
    })
    // console.log(trip, destinationObj)
    trip.img = destinationObj.image
    trip.destinationName = destinationObj.destination
    return trip
  })
  // console.log("DEST", data.destinationData)
  console.log("PROCESSED", processedTrips)
  console.log("NAME", name)
  return new Traveler(name, processedTrips)
}

function displayHTML(traveler) {
  console.log("HE", traveler)
  let pastTrips = traveler.pastTrips();
  let displayPastTrips = document.querySelector('.past-trips-card')
  pastTrips.forEach(trip => {
    displayPastTrips.innerHTML +=
    `
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>`
  })
  let presentTrips = traveler.presentTrips();
  let displayPresentTrips = document.querySelector('.present-trips-card')
  presentTrips.forEach(trip => {
    displayPresentTrips.innerHTML +=
    ` <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>`
  })
  let pendingTrips = traveler.pendingTrips();
  let displayPendingTrips = document.querySelector('.pending-trips-card')
  pendingTrips.forEach(trip => {
    displayPendingTrips.innerHTML +=
    ` <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>`
  })
  let upcomingTrips = traveler.upcomingTrips();
  let displayUpcomingTrips = document.querySelector('.upcoming-trips-card')
  upcomingTrips.forEach(trip => {
    displayUpcomingTrips.innerHTML +=
    `
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>`
  })
  let greeting = document.querySelector('.welcome')
  let moneySpent = document.querySelector('.amount-spent')
  greeting.classList.remove('hidden')
  moneySpent.classList.remove('hidden')
  greeting.innerHTML = `Welcome, ${traveler.name}!`
}
