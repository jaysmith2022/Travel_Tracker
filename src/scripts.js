import './css/styles.css';
import './images/turing-logo.png'
import './images/travel-logo.png'
import { fetchData } from './apiCalls';
import Traveler from './traveler';

const pastTrips = document.querySelector('#pastTrips')
const currentTrips = document.querySelector('#currentTrips')
const pendingTrips = document.querySelector('#pendingTrips')


let traveler;



function getFetchData() {
    Promise.all([fetchData("trips"), fetchData("destinations"), fetchData("travelers")])
    .then(data => {
        realocateData(data)
    })
}

function realocateData(data) {
    traveler = new Traveler(data[2])
    
}

getFetchData()










