import { expect } from "chai";
import travelerData  from "../src/data/travelerData";
import tripsData  from "../src/data/tripsData";
import Traveler from "../src/traveler";
import Trips from '../src/Trips.js'


describe('Repository', function() {
    let traveler;
    let tripsInfo;

    beforeEach(() => {
        traveler = new Traveler(travelerData[0])
        tripsInfo = new Trips(tripsData)
    })

})