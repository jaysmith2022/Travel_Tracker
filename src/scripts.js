import './css/styles.css';
import './images/travel-logo.png'
import { fetchData, postData } from './apiCalls';
import Traveler from './traveler';
import Trips from './trips';
import * as dayjs from "dayjs";
import { createSwiper } from "./swiper"






const pastTrips = document.querySelector('#pastTrips')
const upcomingTrips = document.querySelector('#upcomingTrips')
const pendingTrips = document.querySelector('#pendingTrips')
const travelerName = document.querySelector('#travelerName')
const totalForYear = document.querySelector('#yearCost')
const calendar = document.getElementById("myDate");
const userDestinationInput = document.getElementById("destination")
const userTravelerInput = document.getElementById("numberOfTravelers")
const userDurationInput = document.getElementById("vacationLength")
const calendarBtn = document.querySelector("#calendarBtn");
const errorMessage = document.getElementById('errorMessage')
const swiperBox = document.querySelector('.swiper-container')
const swiperImage = document.getElementById("swiperWrapper")
const homePageMessage = document.getElementById("mainSectionMessage")



let travelUser;
let trips;


calendarBtn.addEventListener('click', postInputData)


window.addEventListener('load', fakeLogin)





function fakeLogin() {
    userLogin(2)
}

function userLogin(userID) {
    Promise.all([fetchData("trips"), fetchData("destinations"), fetchData(`travelers/${userID}`)])
    .then((data) => {
        updateDataModel(data)
        displayUserInfo()
    })
}

function updateDataModel(data) {
    travelUser = new Traveler(data[2])
    trips = new Trips(data[1].destinations, data[0].trips.map(userTrips => {
        dayjs(userTrips.date).format('YYYY/MM/DD')
        return userTrips
    }))
}


function displayUserInfo() {
    displayUserName(travelUser)
    displayTravelersTrips(trips, travelUser)
    displayTotalCostYear(travelUser, dayjs().format('YYYY'))
    setCalendarDate()
    createSwiper(trips.destinationData)

}



function displayUserName(user) {
    travelerName.innerText = `Welcome, ${user.getFirstName()}`
}



function displayTravelersTrips(repo, user) {
    repo.findPastTrips(user.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination)
    .forEach((element, index) => {
        pastTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
    })
    
    // if(document.getElementById("result").innerHTML = pendingTrips.hasChildNoodes())
    // if(repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")) === "You Don't Have Any Upcoming Trips, Book Now!") {
    //     upcomingTrips.innerHTML += `<p>You Don't Have Any Upcoming Trips, Book Now!</p>`
    // }else {
        
    //     repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination)
    //     .forEach((element, index) => {
    //         upcomingTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
    //     })
    //     }

        if(repo.findPendingTrips(user.id) === "You Don't Have Any Pending Trips, Book Now!") {
            pendingTrips.innerHTML += `<p>You Don't Have Any Pending Trips, Book Now!</p>`
        }else {
            repo.findPendingTrips(user.id).map(el => el.destination)
            .forEach((element, index) => {
                pendingTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
            })
            }
            if(pendingTrips.firstChild && repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")) === "You Don't Have Any Upcoming Trips, Book Now!") {
                return upcomingTrips.innerHTML += `<p>Waiting For Your Vacation To Be Approved!</p>`
            }
            if(repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")) === "You Don't Have Any Upcoming Trips, Book Now!") {
                upcomingTrips.innerHTML += `<p>You Don't Have Any Upcoming Trips, Book Now!</p>`
            }else {
                
                repo.findUpcomingTrips(user.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination)
                .forEach((element, index) => {
                    upcomingTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
                })
                }
}

function displayTotalCostYear(user, year) {
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
totalForYear.innerText = `${formatter.format(trips.totalCostByYear(user.id, year))} for ${dayjs().year()}`
}


// function showVacationSpots() {
// Swiper.use([Navigation])
// let swiper = new Swiper(".mySwiper", {
//     spaceBetween: 10,
//     slidesPerView: 4,
//     freeMode: true,
//     watchSlidesProgress: true,
//    });
   
   
//    let swiper2 = new Swiper(".mySwiper2", {
//     spaceBetween: 10,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     thumbs: {
//       swiper: swiper,
//     },
//    });

//    let newSwiper = new Swiper(".mySwiper", {
//     lazy: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//    });

// document.getElementById('swipeSlide').innerHTML = `<img src="https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" width="100%" height="100%"/>`
// document.getElementById('swipeSlide2').innerHTML = `<img src="https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"/>`
// }


function setCalendarDate() {
    calendar.setAttribute('min', dayjs().format('YYYY-MM-DD'))
  }


function checkInputValidity() {
    if(!calendar.value || !userDestinationInput.value || !userTravelerInput.value || !userDurationInput.value) {
        return inputErrorMessage("Please Fill Out All Available Fields")
    }
    if(+userTravelerInput.value < 0 || +userDurationInput.value < 0) {
        return inputErrorMessage('Please Enter A Positive Number')
    }
    if(+userTravelerInput.value > 40) {
         return inputErrorMessage("For bookings with over 40 travelers, Please call our 24 hour call center at 1-800-392-6612")
    }
    if(+userDurationInput.value > 30) {
         return inputErrorMessage("For bookings that extend over 30 days, Please call our 24 hour call center at 1-800-392-6612")
    }
    if(userDataForDate(trips.findAllTravelerTrips(travelUser.id), travelUser.id, dayjs(calendar.value).format('YYYY/MM/DD'))) {
    return inputErrorMessage("Vacation already booked for that date. Please reach out to your Travel Agent.")
}
    return true
}
function userDataForDate(data, id, date) {
    return data.find((el) => el.userID === id && el.date === date);
  };

function inputErrorMessage(message) {
errorMessage.innerHTML = `
  <p class="submitErrorMessage"><strong>${message}</strong></p>
`;
return false;
}

function postInputData(event) {
    event.preventDefault()

    const userInputDate = dayjs(calendar.value).format('YYYY/MM/DD')
    const userDestination = userDestinationInput.value 
    const userTravelers = userTravelerInput.value
    const userDuration = userDurationInput.value
    const getLastId = trips.tripsData.sort((a, b) => b.id - a.id)[0].id
    if(!checkInputValidity()) {
        return
    }
    postData ({
        id: getLastId + 1, 
        userID: travelUser.id, 
        destinationID: trips.destinationData.find(vacay => vacay.destination === userDestination).id, 
        travelers: +userTravelers,
        date: userInputDate,
        duration: +userDuration,
        status: 'pending',
        suggestedActivities:[],
    }, 'trips', updateDataModel, displayUserInfo, travelUser, clearInputs)
}


function displayAvailableVacations(event) {
    event.preventDefault()
    swiperBox.classList.remove('hidden')
    homePageMessage.classList.add('hidden')
}

  function clearInputs() {
    calendar.value = ""
    userDestinationInput.value = ""
    userTravelerInput.value = ""
    userDurationInput.value = ""
  }















