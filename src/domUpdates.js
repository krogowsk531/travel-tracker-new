const domUpdates = {

  displayWelcome(traveler) {
    console.log("T", traveler)
     const welcome = document.querySelector('.welcome');
     return welcome.innerHTML += `Welcome ${traveler.user.name.split(" ")[0]}!`;
   },
}

//   logIn() {
//     let traveler = [
//       {
//         username: 'traveler50',//id is the users id //string split and pull out 50 when you need the id
//         password: 'travel2020'
//       }
//     ]
//     let username = document.getElementById('username').value
//     let password = document.getElementById('password').value
//     for (i = 0; i < traveler.length; i++) {
//       if (username == traveler[i].username && password == traveler[i].password) {
//         console.log(username + ' is logged in!!!')
//         // document.location = "/dashboard.html" make something hide instead
//         return
//       }
//     }
//     console.log('incorrect username or password')
//     alert("WRONG PASSWORD");
//     // getInfoTraveler();
//     // getInfoAgency();
//     // document.location = "/agency-dashboard"
//   }
// }

export default domUpdates;
