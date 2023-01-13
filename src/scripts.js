import './css/styles.css';
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './images/travel-logo.png'
import { fetchData } from './apiCalls';
import Traveler from './traveler';
import Trips from './trips';
import * as dayjs from "dayjs";






const pastTrips = document.querySelector('#pastTrips')
const upcomingTrips = document.querySelector('#upcomingTrips')
const pendingTrips = document.querySelector('#pendingTrips')
const travelerName = document.querySelector('#travelerName')
const totalForYear = document.querySelector('#yearCost')
const calendar = document.getElementById("myDate");
const calendarBtn = document.querySelector("#calendarBtn");

let travelUser;
let trips;


calendarBtn.addEventListener('click', setCalendarDate)


window.addEventListener('load', fakeLogin)
function fakeLogin() {
    userLogin(2)
}

function userLogin(userID) {
    Promise.all([fetchData("trips"), fetchData("destinations"), fetchData(`travelers/${userID}`)])
    .then(data => {
        loadTravelerData(data)
    })
}

function loadTravelerData(data) {
    travelUser = new Traveler(data[2])
    trips = new Trips(data[1].destinations, data[0].trips)
    displayUserInfo()
}


function displayUserInfo() {
    displayFirstName()
    displayTravelersTrips()
    displayTotalCostYear()
    showVacationSpots()
    setCalendarDate()
}
function displayFirstName() {
    travelerName.innerText = `Welcome, ${travelUser.getFirstName()}`
}

function displayTravelersTrips() {
    trips.findPastTrips(travelUser.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination)
    .forEach((element, index) => {
        pastTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
    })

    if(trips.findUpcomingTrips(travelUser.id, dayjs().format("YYYY/MM/DD")) === "You Don't Have Any Upcoming Trips, Book Now!") {
        upcomingTrips.innerHTML += `<p>You Don't Have Any Upcoming Trips, Book Now!</p>`
    }else {
        trips.findUpcomingTrips(travelUser.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination)
        .forEach((element, index) => {
            upcomingTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
        })
        }

        if(trips.findPendingTrips(travelUser.id) === "You Don't Have Any Pending Trips, Book Now!") {
            pendingTrips.innerHTML += `<p>You Don't Have Any Pending Trips, Book Now!</p>`
        }else {
            trips.findPendingTrips(travelUser.id).map(el => el.destination)
            .forEach((element, index) => {
                pendingTrips.innerHTML += `<p>${index +1}.) ${element}</p>`
            })
            }
}

function displayTotalCostYear() {
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

totalForYear.innerText = `${formatter.format(trips.totalCostByYear(travelUser.id, dayjs().year()))} for ${dayjs().year()}`

}



function showVacationSpots() {
Swiper.use([Navigation])
let swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
   });
   
   
   let swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
   });

   let newSwiper = new Swiper(".mySwiper", {
    lazy: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
   });

document.getElementById('swipeSlide').innerHTML = `<img src="https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" width="100%" height="100%"/>`
document.getElementById('swipeSlide2').innerHTML = `<img src="https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"/>`
}


function setCalendarDate() {
    calendar.setAttribute('min', dayjs().format('YYYY-MM-DD'))
  }











