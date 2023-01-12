import './css/styles.css';
import './images/turing-logo.png'
import './images/travel-logo.png'
import { fetchData } from './apiCalls';
import Traveler from './traveler';
import Trips from './trips';
import * as dayjs from "dayjs";

const pastTrips = document.querySelector('#pastTrips')
const currentTrips = document.querySelector('#currentTrips')
const pendingTrips = document.querySelector('#pendingTrips')
const travelerName =document.querySelector('#travelerName')


let travelUser;
let trips;
let currentUser;

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
}
function displayFirstName() {
    travelerName.innerText = `Welcome, ${travelUser.getFirstName()}`
}

function displayTravelersTrips() {
    const dest =  trips.findPastTrips(travelUser.id, dayjs().format("YYYY/MM/DD")).map(el => el.destination).map((acc, index) => {
            console.log(pastTrips.innerText = `${index +1}.) ${acc}`)
        })

    return dest
    
}













