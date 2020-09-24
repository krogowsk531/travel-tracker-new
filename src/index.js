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

let userID;

window.addEventListener('load', onLoad);


function onLoad() {
  const loginBtn = document.querySelector('.login-button')
  loginBtn.addEventListener('click', enterLogin)
  const bookNewTripBtn = document.querySelector('.new-trip-button')
  bookNewTripBtn.addEventListener('click', postTrip)
}

function enterLogin() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  userID = parseInt(username.match(/\d+/gi).pop())
  // console.log("VALUE", loginValue)
  const removeLogin = document.querySelector('.entry-form')
  const addForm = document.querySelector('.trip-entry-form')
  // addForm.classList.add('hidden')
  if (username.includes('traveler') && (username.split('traveler')[1] < 51 && username.split('traveler')[1] > 0) && password === 'travel2020') {
    console.log(username + ' is logged in!!!')
    removeLogin.classList.add('hidden')
    addForm.classList.remove('hidden')
    addForm.classList.add('flex')
    getData(userID)
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
  Promise.all([travelerData, tripData, destinationData])
    .then(data => data = {
      travelerData: data[0].travelers,
      tripData: data[1].trips,
      destinationData: data[2].destinations
    })
    .then(_createTraveler)
    .then(displayHTML)

  Promise.all([travelerData, tripData, destinationData])
      .then(data => data = {
        travelerData: data[0].travelers,
        tripData: data[1].trips,
        destinationData: data[2].destinations
      })
      .then(fillDestinations)
}

let destinationData;
function fillDestinations(data) {
  destinationData = data.destinationData
  //loop throught the destinations and append an HTML element for each destination
  data.destinationData.forEach(destination => {
    let destinationElement = document.getElementById('destination')
    destinationElement.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>
    `
  })
}






function postTrip() {
  const api = new ApiFetch();
  const form = document.querySelector('.trip-input-box');


  const tripDetails = formatForPost();
  api.postTripRequest(tripDetails)
  .then(costOfRequestedTrip)
  // .then(displayCostofTrip)
  .catch(error => console.log(error));
}

function formatForPost() {
  const username = document.getElementById('username').value;
  const destinationID = Number(document.getElementById('destination').value);
  const numTravelers = Number(document.getElementById('num-travelers').value);
  const travelDate = document.getElementById('date').value
  const duration = Number(document.getElementById('duration').value);
  return {
    "id": Date.now(),
    "userID": userID,
    "destinationID": destinationID,
    "travelers": numTravelers,
    "date": travelDate,
    "duration": duration,
    "status": "pending",
    "suggestedActivities": []
  }
}


//when form appears deal with numbersOnlyduration
//when form appears deal with numbersOnlytravelers

//button click will happen and the data will post

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
    trip.estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay
    trip.estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson
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
  let displayPastTrips = document.querySelector('.past-trips')
  pastTrips.forEach(trip => {
    displayPastTrips.innerHTML +=
    `<div class="trip-card">
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>
    </div>`
  })
  let presentTrips = traveler.presentTrips();
  let displayPresentTrips = document.querySelector('.present-trips')
  presentTrips.forEach(trip => {
    displayPresentTrips.innerHTML +=

    `<div class="trip-card">
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>
    </div>`
  })
  let pendingTrips = traveler.pendingTrips();
  let displayPendingTrips = document.querySelector('.pending-trips')
  pendingTrips.forEach(trip => {
    displayPendingTrips.innerHTML +=

    ` <div class="trip-card">
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>
    </div`
  })
  let upcomingTrips = traveler.upcomingTrips();
  let displayUpcomingTrips = document.querySelector('.upcoming-trips')
  upcomingTrips.forEach(trip => {
    displayUpcomingTrips.innerHTML +=
    `<div class="trip-card">
    <p>${trip.destinationName}</p>
    <div class="image-container">
    <img src="${trip.img}" class="image">
    </div>
    <p>Date: ${trip.date}</p>
    <p class="duration">${trip.duration} days</p>
    </div>
    `
  })
  let greeting = document.querySelector('.welcome')
  let moneySpent = document.querySelector('.amount-spent')
  greeting.classList.remove('hidden')
  moneySpent.classList.remove('hidden')
  greeting.innerHTML = `Welcome, ${traveler.name}!`
  moneySpent.innerHTML = `Amount spent on travel this year: $${costOfTripsThisYear(traveler)}`
}

function costOfTripsThisYear(traveler) {
  console.log(traveler)
  let thisYearsTrips = traveler.tripsThisYear()
  console.log("AHHHHH", thisYearsTrips)
  return thisYearsTrips.reduce((acc, trip) => {
    acc += trip.duration * trip.estimatedLodgingCostPerDay
    acc += trip.travelers * trip.estimatedFlightCostPerPerson
    return acc
  }, 0)
}

function costOfRequestedTrip(apiResponse) {
  console.log("API", apiResponse)
  //take the destinations id pull into destinations id and find the destination obj
  let destinationObj = destinationData.find(destination => {
    return destination.id === apiResponse.newResource.destinationID
  })
  let duration = apiResponse.newResource.duration
  let estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay
  let travelers = apiResponse.newResource.travelers
  let estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson
  let costOfTripNoFee = duration * estimatedLodgingCostPerDay + travelers * estimatedFlightCostPerPerson
  let agentFee = costOfTripNoFee * .10
  let totalCost = (costOfTripNoFee + agentFee).toFixed(2)
  let estimatedTripCost = document.querySelector('.cost-of-trip')
  estimatedTripCost.classList.remove('hidden')
  estimatedTripCost.innerHTML = `***Estimated Trip Cost: $${totalCost}***`
  return totalCost
}

function displayCostofTrip(apiResponse) {

}
// function numbersOnlyDuration(event) {
//   let numbersDuration = document.getElementById('duration')
//   numbersDuration.addEventListener('keypress', numbersOnlyDuration);
//   var key1 = event.keyCode;
//   if ((key1 < 48 || key1 > 57)) {
//     event.preventDefault();
//   }
// };

// function numbersOnlyTravelers(event) {
//   let numbersTravelers = document.getElementById('num-travelers')
//   numbersTravelers.addEventListener('keypress', numbersOnlyTravelers);
//   var key1 = event.keyCode;
//   if ((key1 < 48 || key1 > 57)) {
//     event.preventDefault();
//   }
// };
