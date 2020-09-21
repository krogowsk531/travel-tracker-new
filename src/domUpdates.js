const domUpdates = {


  // displayWelcome(traveler) {
  //   console.log("T", traveler)
  //    const welcome = document.querySelector('.welcome');
  //    return welcome.innerHTML += `Welcome ${traveler.user.name.split(" ")[0]}!`;
  //  },

  displayTravelerCosts(theTraveler) {
   const amountSpent = document.querySelector('.amount-spent')
   const costDetails = theTraveler.calculateTotalCost();
   const formattedCostDetails = costDetails.map(detail => this.getCostFormat('Total Spent YTD', detail)).join('');
   costInfoSection.innerHTML = formattedCostDetails;
 }

  // displayPresentTrips() {
  //   let presentTripCard = document.querySelector('.present-trips-card')
  //   presentTripCard.innerHTML +=
  //
  //     ` <p>${data.past[0].destinationID}</p>
  //       <img>IMG</img>
  //       <p>${data.past[0].date}</p>
  //       <p>Duration</p>`
  //   }

    // function displayPastTrips(data) {
    //   // console.log("TIRED")
    //   console.log("BEtTer", data)
    //   let displayPastTrips = document.querySelector('.past-trips-card')
    //   displayPastTrips.innerHTML +=
    //   ` <p>${data.past[0].destinationID}</p>
    //     <img>IMG</img>
    //     <p>${data.past[0].date}</p>
    //     <p>Duration</p>`
    //     return displayPastTrips
    // }
  }

 //  displayTrips(location, travelerData, status, format) {
 //   const pageSection = document.querySelector(location);
 //   const formattedTripDetails = this.getTripInfo(travelerData, status, format);
 //   pageSection.innerHTML = formattedTripDetails;
 // }
 //




export default domUpdates;
