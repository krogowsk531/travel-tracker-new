// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates';

console.log('This is the JavaScript entry file - your code begins here.');

function getData() {
  const api = new ApiFetch();
  const travelerData = api.getTravelersData()
  const tripData = api.getTripsData()
  const destinationData = api.getDestinationsData();

  Promise.all([travelerData, tripData, destinationData])
    .then(data => data = {
      travelerData: data[0].travelers,
      tripData: data[0].trips,
      destinationData: data[0].destinations
    })
    .then(getUser)
    .then(getDate)
    // .then(displayTrips)
    .then(dataSets => console.log("ENDRESULT", dataSets))

    // .catch(err => console.error(err))
}

getData()
