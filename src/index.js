import './css/base.scss';

import ApiFetch from './ApiFetch';
import Traveler from './traveler';

let userID, destinationData;

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
  const removeLogin = document.querySelector('.entry-form')
  const addForm = document.querySelector('.trip-entry-form')
  const text = document.querySelector('.scroll')
  if (username.includes('traveler') && (username.split('traveler')[1] < 51 && username.split('traveler')[1] > 0) && password === 'travel2020') {
    console.log(username + ' is logged in!!!')
    removeLogin.classList.add('hidden')
    addForm.classList.remove('hidden')
    addForm.classList.add('flex')
    text.classList.remove('hidden')
    getData(userID)
  } else {
    alert("WRONG PASSWORD")
  }
}






function getData(loginValue) {
  const api = new ApiFetch();
  const tripData = api.getTripsData()
  const travelerData = api.getTravelersData()
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
    .then(displayPastHTML)
    .catch(error => console.log(error));

  Promise.all([travelerData, tripData, destinationData])
      .then(data => data = {
        travelerData: data[0].travelers,
        tripData: data[1].trips,
        destinationData: data[2].destinations
      })
      .then(fillDestinations)
      .catch(error => console.log(error));
}

function fillDestinations(data) {
  destinationData = data.destinationData
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

function createTraveler(data, loginValue) {
  let userid = loginValue
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
    trip.img = destinationObj.image
    trip.destinationName = destinationObj.destination
    trip.estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay
    trip.estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson
    return trip
  })
  return new Traveler(name, processedTrips)
}

function displayPastHTML(traveler) {
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
  displayPresentHTML(traveler)
}

function displayPresentHTML(traveler) {
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
  displayPendingHTML(traveler)
}

function displayPendingHTML(traveler) {
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
  displayUpcomingHTML(traveler)
}

function displayUpcomingHTML(traveler) {
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
  let thisYearsTrips = traveler.tripsThisYear()
  return thisYearsTrips.reduce((acc, trip) => {
    acc += trip.duration * trip.estimatedLodgingCostPerDay
    acc += trip.travelers * trip.estimatedFlightCostPerPerson
    return acc
  }, 0)
}

function costOfRequestedTrip(apiResponse) {
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
