import "./css/styles.css";
import "./images/travel-logo.png";
import { postData, fetchAll } from "./apiCalls";
import Traveler from "./traveler";
import Trips from "./trips";
import * as dayjs from "dayjs";

const pastTrips = document.querySelector("#pastTrips");
const upcomingTrips = document.querySelector("#upcomingTrips");
const pendingTrips = document.querySelector("#pendingTrips");
const travelerName = document.querySelector("#travelerName");
const totalForYear = document.querySelector("#yearCost");
const calendar = document.getElementById("myDate");
const userDestinationInput = document.getElementById("destination");
const userTravelerInput = document.getElementById("numberOfTravelers");
const userDurationInput = document.getElementById("vacationLength");
const calendarBtn = document.querySelector("#calendarBtn");
const errorMessage = document.getElementById("errorMessage");
const homePageMessage = document.getElementById("mainSectionMessage");
const finalBookMessage = document.getElementById("bookedMessage");
const displayVacationChoice = document.getElementById("vacationDisplay");
const displayTripCost = document.getElementById("totalTripCost");
const vacationDisplayArea = document.getElementById("vacationDisplay");
const inputArea = document.getElementById("inputForm");

let travelUser;
let trips;

calendarBtn.addEventListener("click", displayChosenTrips);
vacationDisplayArea.addEventListener("click", bookedDisplay);

window.addEventListener("load", fakeLogin);

function fakeLogin() {
  userLogin(2);
}

function userLogin() {
  fetchAll(2)
    .then((data) => {
      updateDataModel(data);
      displayUserInfo();
    })
    .catch((error) => {
      errorMessage.innerText = `
        **${error.message}**
        `;
    });
}

function updateDataModel(data) {
  travelUser = new Traveler(data[2]);
  trips = new Trips(
    data[1].destinations,
    data[0].trips.map((userTrips) => {
      dayjs(userTrips.date).format("YYYY/MM/DD");
      return userTrips;
    })
  );
}

function displayUserInfo() {
  displayUserName(travelUser);
  displayTravelersTrips(trips, travelUser);
  displayTotalCostYear(travelUser, dayjs().format("YYYY"));
  setCalendarDate();
}

function displayUserName(user) {
  travelerName.innerText = `Welcome, ${user.getFirstName()}`;
}

function displayTravelersTrips(repo, user) {
  repo
    .findPastTrips(user.id, dayjs().format("YYYY/MM/DD"))
    .map((el) => el.destination)
    .forEach((element, index) => {
      pastTrips.innerHTML += `<p>${index + 1}.) ${element}</p>`;
    });
  if (
    repo.findPendingTrips(user.id) ===
    "You Don't Have Any Pending Trips, Book Now!"
  ) {
    pendingTrips.innerHTML += `<p>You Don't Have Any Pending Trips, Book Now!</p>`;
  } else {
    repo
      .findPendingTrips(user.id)
      .map((el) => el.destination)
      .forEach((element, index) => {
        pendingTrips.innerHTML += `<p>${index + 1}.) ${element}</p>`;
      });
  }
  if (
    repo.findPendingTrips(user.id) !==
      "You Don't Have Any Pending Trips, Book Now!" &&
    repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")) ===
      "You Don't Have Any Upcoming Trips, Book Now!"
  ) {
    return (upcomingTrips.innerHTML += `<p>Waiting For Your Vacation To Be Approved!</p>`);
  }
  if (
    repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")) ===
    "You Don't Have Any Upcoming Trips, Book Now!"
  ) {
    upcomingTrips.innerHTML += `<p>You Don't Have Any Upcoming Trips, Book Now!</p>`;
  } else {
    repo
      .findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD"))
      .map((el) => el.destination)
      .forEach((element, index) => {
        upcomingTrips.innerHTML += `<p>${index + 1}.) ${element}</p>`;
      });
  }
}

function displayTotalCostYear(user, year) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  totalForYear.innerText = `${formatter.format(
    trips.totalCostByYear(user.id, year)
  )} for ${dayjs().year()}`;
}

function setCalendarDate() {
  calendar.setAttribute("min", dayjs().format("YYYY-MM-DD"));
}

function checkInputValidity() {
  if (
    !calendar.value ||
    !userDestinationInput.value ||
    !userTravelerInput.value ||
    !userDurationInput.value
  ) {
    return inputErrorMessage("Please Fill Out All Available Fields");
  }
  if (+userTravelerInput.value <= 0 || +userDurationInput.value <= 0) {
    return inputErrorMessage("Please Enter A Positive Number");
  }
  if (+userTravelerInput.value > 40) {
    return inputErrorMessage(
      "For bookings with over 40 travelers, Please call our 24 hour call center at 1-800-392-6612"
    );
  }
  if (+userDurationInput.value > 30) {
    return inputErrorMessage(
      "For bookings that extend over 30 days, Please call our 24 hour call center at 1-800-392-6612"
    );
  }
  if (
    userDataForDate(
      trips.findAllTravelerTrips(travelUser.id),
      travelUser.id,
      dayjs(calendar.value).format("YYYY/MM/DD")
    )
  ) {
    return inputErrorMessage(
      "Vacation already booked for that date. Please reach out to your Travel Agent."
    );
  } else {
    inputErrorMessage("");
    return true;
  }
}

function userDataForDate(data, id, date) {
  return data.find((el) => el.userID === id && el.date === date);
}

function inputErrorMessage(message) {
  errorMessage.innerHTML = `
  <p class="submitErrorMessage"><strong>${message}</strong></p>
`;
  return false;
}

function postInputData(event, userTrip) {
  event.preventDefault();
  postData(
    {
      id: userTrip.id,
      userID: userTrip.userID,
      destinationID: userTrip.destinationID,
      travelers: userTrip.travelers,
      date: userTrip.date,
      duration: userTrip.duration,
      status: "pending",
      suggestedActivities: [],
    },
    "trips",
    updateDataModel,
    displayUserInfo,
    travelUser,
    clearInputs
  ).catch((error) => {
    errorMessage.innerText = `
        **${error.message}**
        `;
  });
}

function displayChosenTrips(event) {
  event.preventDefault();
  if (!checkInputValidity()) {
    return;
  }
  inputArea.classList.add("hidden");
  homePageMessage.classList.add("hidden");
  displayVacationChoice.classList.remove("hidden");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const getLastId = trips.tripsData.sort((a, b) => b.id - a.id)[0].id;
  const chosenDestination = trips.destinationData.find(
    (place) => place.destination === userDestinationInput.value
  );
  const storedTrips = {
    id: getLastId + 1,
    userID: travelUser.id,
    destinationID: chosenDestination.id,
    travelers: +userTravelerInput.value,
    date: dayjs(calendar.value).format("YYYY/MM/DD"),
    duration: +userDurationInput.value,
    status: "pending",
    suggestedActivities: [],
  };
  travelUser.trips.push(storedTrips);

  displayTripCost.innerText = `Estimated total cost for this trip is ${formatter.format(
    trips.totalCostPerBookedTrip(
      chosenDestination,
      +userTravelerInput.value,
      +userDurationInput.value
    )
  )}`;

  displayVacationChoice.innerHTML += `
    <figure class="chosen-img-wrapper">
    <img class="chosen-img" src=${chosenDestination.image} alt=${chosenDestination.alt}>
    <div class="caption-container">
    <div class="vacation-info-container">
    <figcaption class="vacation-caption">
        <span style="color:red">Place:</span>&nbsp ${chosenDestination.destination}&nbsp&nbsp
        <span style="color:red">Lodging Per Day:</span>&nbsp $${chosenDestination.estimatedLodgingCostPerDay}.00 &nbsp&nbsp
        <span style="color:red">Flight RT Per Person:</span>&nbsp $${chosenDestination.estimatedFlightCostPerPerson}.00 &nbsp&nbsp
    </figcaption>
    </div>
    <button class="book-now-btn" id="bookNowBtn" type="button">
    Book Now!
    </button>
    <button class="go-back-btn" id="goBackBtn" type="button">
    Go Back
    </button>
    </div
    </figure>`;
}

function bookedDisplay(event) {
  event.preventDefault();
  if (event.target.className === "book-now-btn") {
    displayTripCost.innerText = "";
    displayVacationChoice.classList.add("hidden");
    postInputData(event, travelUser.trips[0]);
    displayVacationChoice.innerHTML = "";
    inputArea.classList.remove("hidden");
    finalBookMessage.classList.remove("hidden");
    setTimeout(function timeout() {
      finalBookMessage.classList.add("hidden");
      homePageMessage.classList.remove("hidden");
    }, 10000);
  }
  if (event.target.className === "go-back-btn") {
    homePageMessage.classList.remove("hidden");
    displayVacationChoice.classList.add("hidden");
    displayVacationChoice.innerHTML = "";
    displayTripCost.innerText = "";
    clearInputs();
    inputArea.classList.remove("hidden");
  }
}

function clearInputs() {
  calendar.value = "";
  userDestinationInput.value = "";
  userTravelerInput.value = "";
  userDurationInput.value = "";
}
