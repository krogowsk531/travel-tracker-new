const domUpdates = {
  ,

  // displayWelcome(traveler) {
  //   console.log("T", traveler)
  //    const welcome = document.querySelector('.welcome');
  //    return welcome.innerHTML += `Welcome ${traveler.user.name.split(" ")[0]}!`;
  //  },
}

// const domUpdates = {
//   submitLogin() {
//     const login = document.querySelector('.login-container');
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const traveler = document.querySelector('.traveler');
//     const agency = document.querySelector('.agent');
//     if (username === 'agency' && password === 'travel2020') {
//       agency.classList.remove('hidden');
//       login.classList.add('hidden');
//       return 'agent';
//     } else if (username.includes('traveler') &&
//               (username.split('traveler')[1] < 51 && username.split("traveler")[1] > 0) &&
//                password === 'travel2020') {
//       traveler.classList.remove('hidden');
//       login.classList.add('hidden');
//       return username;
//     } else {
//       alert('Incorrect username or password');
//     }
//   },

//   logIn() {
//     let traveler = [
//       {
//         username: 'traveler50',//id is the users id //string split and pull out 50 when you need the id
//         password: 'travel2020'
//       }
//     ]
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
