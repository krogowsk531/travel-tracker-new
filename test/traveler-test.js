const chai = require('chai');
const expect = chai.expect;

import Traveler from '../src/traveler.js';

describe('Traveler', function() {
  let traveler, trip1, trip2, trip3, trip4, today;
  beforeEach(function() {
    traveler = new Traveler('Tiffy Grout', ['trip1', 'trip2', 'trip3', 'trip4']);
    today = Date.now()
    trip1 = {
            date: today,
            destinationID: 5,
            destinationName: "Madrid, Spain",
            duration: 16,
            id: 91,
            img: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            status: "pending",
            suggestedActivities: [],
            travelers: 1,
            userID: 5
          }
    trip2 = {
            date: "2020/10/19",
            destinationID: 35,
            destinationName: "Anchorage, Alaska",
            duration: 20,
            id: 103,
            img: "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            status: "approved",
            suggestedActivities: [],
            travelers: 2,
            userID: 5
          }
    trip3 = {
            date: "2020/04/28",
            destinationID: 48,
            destinationName: "Dar es Salaam, Tanzania",
            duration: 10,
            id: 163,
            img: "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            status: "approved",
            suggestedActivities: [],
            travelers: 1,
            userID: 5
          }
    trip4 = {
            date: "2020/09/25",
            destinationID: 16,
            destinationName: "Bangkok, Thailand",
            duration: 8,
            id: 196,
            img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
            status: "approved",
            suggestedActivities: [],
            travelers: 1,
            userID: 5
            }
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should have a name', function() {
    expect(traveler.name).to.be.equal('Tiffy Grout');
  })

  it('should store a list of trips', function() {
    expect(traveler.trips).to.deep.equal(['trip1', 'trip2', 'trip3', 'trip4']);
  });

  it('should return trips that are present', function() {
    // expect(traveler.presentTrips()).to.deep.equal(['trip1'])
  })

  it('should return trips that are pending', function() {
    // expect(traveler.pendingTrips()).to.deep.equal(['trip1'])
  })

  it('should return past trips', function() {

  })

  it('should return trips that are upcoming', function() {

  })

  it('should calculate the total amount spent on trips this year')

});
