import { Header, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";
import axios from "axios";

import randomImage from "./lib/randomImage";
import formSubmit from "./lib/formSubmit";
import getAPIData from "./lib/getAPIData"; // Used for API call
import compareTheData from "./lib/compareTheData";
// import filterData from "./lib/filterData";
// import writeResults from "./lib/writeResults";
import checklogin from "./lib/checkLogin";
// import accountLock from "./lib/accountLock";

const router = new Navigo(window.location.origin);
router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let page = capitalize(params.page);
      render(state[page]);
    }
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header()}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  randomImage();
  addHamburgerEventListener();
  formSendButtonListener(st);
  addSearchBarBtnListener(st);

  listenForRegister(st);
  listenForLoginForm(st);
  loginLogoutListener(st);

  profileTestBtnListener(st);
}

// Constant for Forms submit and to clear form data
const form = document.querySelector("form");

// Profile test Button Listener
function profileTestBtnListener(st) {
  if (st.page === "Login") {
    document
      .querySelector("#profileTestBtn > button")
      .addEventListener("click", () => {
        event.preventDefault();
        render(state.Profile);
        router.navigate("/Profile");
      });
  }
}

// Hamburger listeners
function addHamburgerEventListener() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden");
  });
}

// Forms Send Button intervention
function formSendButtonListener(st) {
  if (st.page === "Contact" || st.page === "Addinfo") {
    // handle the form submission event
    document.querySelector("#send").addEventListener("click", event => {
      event.preventDefault();
      formSubmit(st);
    });
  }
}

// Click listener for FMAresults Page
function addSearchBarBtnListener(st) {
  if (st.page === "Fmaresults") {
    document.querySelector("#searchBar").addEventListener("submit", event => {
      event.preventDefault();
      searchBarSearch();
    });
  }
}

//***  Get the FMA Data from the JSON file ***
(function importDBJSON() {
  state.Fmaresults.fmaDBdata = [];
  fetch(
    "https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json"
  )
    .then(response => response.json())
    .then(response => {
      state.Fmaresults.fmaDBdata = response;
    })
    .catch(err => {
      console.log(
        "The DBdata load request failed! Error with the DBdata import LINE 150. please try your search again."
      );
      console.log("error", err);
    });
})();

//*** Search from FMAresults Page ***
function searchBarSearch() {
  // zip code
  let userZipCode = document.getElementById("zipSearch").value;
  if (userZipCode == "") {
    alert("A Zip Code Is required"); // zip code validation
    return;
  } else {
    state.Fmaresults.zipCode = userZipCode;
  }
  // radius
  let userRadius = document.querySelector("#radiusSearch").value;
  if (userRadius == "Radius") {
    alert("A radius is required"); // radius code validation
    return;
  } else {
    state.Fmaresults.radius = userRadius;
  }
  // state
  // let userState = document.querySelector("#stateSearch");
  // if (userState.value != "Sate") {
  //   state.Fmaresults.filter = true;
  //   state.Fmaresults.stateCode = userState.value;
  // };
  // type
  let userType = document.querySelector("#typeSearch");
  if (userType.value != "Type") {
    state.Fmaresults.type = userType.value;
    state.Fmaresults.filter = true;
  }
  // style
  let userStyle = document.querySelector("#styleSearch");
  if (userStyle.value != "Style") {
    state.Fmaresults.style = userStyle.value;
    state.Fmaresults.filter = true;
  }
  // alert("Getting API data now.");  // for testing
  getAPIData();
  // compareTheData(state.Fmaresults.fmaDBdata, state.Fmaresults.tempZipData); // for testing
}

//*** Register form submit listener **
function listenForRegister(st) {
  if (st.page === "Register") {
    document.querySelector("#signup-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove submit and clear buttons from array
      inputList.pop();
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let firstname = inputs[0];
      let lastname = inputs[1];
      let username = inputs[2];
      let useremail = inputs[3];
      let password1 = inputs[4];
      let password2 = inputs[5];

      console.log(inputs);

      if (password1 === password2) {
        let password = password2;
        let email = useremail;
        //create user in database
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            //add user to state and database
            addUserToStateAndDB(firstname, lastname, username, email, password);

            render(state.Profile);
            router.navigate("/Profile");
            console.log(state.Profile);
            populateProfilePage();
          })
          .catch(err => {
            // What to do when the request fails
            alert(
              "There seems to be a problem with this Registration. Kindly please reload the page and try that again."
            );
            console.log("The DB create user request failed!");
            console.log("Error", err);
          });
      } else {
        alert("Passwords have to match. Please re-enter the passwords.");
      }
    });
  }
}

//*** Listen for User Login ***
function listenForLoginForm(st) {
  if (st.page === "Login") {
    document.querySelector("#login-form").addEventListener("submit", event => {
      event.preventDefault();

      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove the button links so they aren't included
      inputList.pop();
      inputList.pop();

      console.log(inputList);

      const inputs = inputList.map(input => input.value);
      let username = inputs[0];
      let email = inputs[1];
      let password = inputs[2];
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("user logged in");
        })
        .then(() => {
          getUserFromDb(email)
            .then(() => {
              render(state.Profile), router.navigate("/Profile");
            })
            .then(() => {
              populateProfilePage();
            });
        })
        .catch(err => {
          // What to do when the request fails
          alert(err);
          console.log("Login request failed!");
          console.log("Error", err);
          checklogin();
        });
    });
  }
}

function loginLogoutListener(st) {
  if (st.page === "Profile") {
    document.querySelector("#logButton").addEventListener("click", event => {
      event.preventDefault();
      //Test if user is logged-in
      if (st.loggedIn) {
        //log-out fxn//
        auth.signOut().then(() => {
          console.log("user logged out");
          logOutUserInDb(st.email);
          resetUserInState();
          //update user in db
          db.collection("users").get;
        });
        console.log(state.Profile);
        render(state.Home);
        router.navigate("/Home");
      } else {
        console.log(state.Profile);
        render(state.Home);
        router.navigate("/Home");
      }
    });
  }
}

//*** Add user to state and database ***
function addUserToStateAndDB(firstname, lastname, username, email, password) {
  // add user to state
  state.Profile.firstname = firstname;
  state.Profile.lastname = lastname;
  state.Profile.username = username;
  state.Profile.useremail = email;
  state.Profile.password = password;
  state.Profile.signedIn = true;
  state.Profile.loggedIn = true;

  // add user to database
  db.collection("users").add({
    firstname: firstname,
    lastname: lastname,
    username: username,
    useremail: email,
    password: password,
    signedIn: true,
    loggedIn: true
  });
}

//*** Populate the profile page with user info ***
function populateProfilePage(st) {
  if (st.page === "Profile") {
    document.querySelector(
      "#user-name"
    ).innerText = `${state.Profile.firstname} ${state.Profile.lastname}`;
    document.querySelector(
      "#user-name"
    ).innerText = `${state.Profile.username}`;
    document.querySelector(
      "#user-email"
    ).innerText = `${state.Profile.useremail}`;
  }
}

//*** Get user form the Database ***
function getUserFromDb(email) {
  return db
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        console.log(doc.data);
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in db");

          let user = doc.data();
          // update state with user info
          state.Profile.firstname = user.firstname;
          state.Profile.lastname = user.lastname;
          state.Profile.username = user.username;
          state.Profile.useremail = user.useremail;
          state.Profile.signedIn = true;
          state.Profile.loggedIn = true;
        }
      })
    )
    .catch(err => {
      // What to do when the request fails
      alert(err);
      console.log("Get user from DB request failed!");
      console.log("Error", err);
    });
}

//*** log-out the user in the Database ***
function logOutUserInDb(email) {
  if (state.Profile.loggedIn) {
    db.collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("user signed out in db");
  }
}

//*** Reset user in state ***
function resetUserInState() {
  state.Profile.firstname = "";
  state.Profile.lastname = "";
  state.Profile.username = "";
  state.Profile.useremail = "";
  state.Profile.password = "";
  state.Profile.signedIn = false;
  state.Profile.loggedIn = false;
}
