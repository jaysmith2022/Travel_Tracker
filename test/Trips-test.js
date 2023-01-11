import { expect } from "chai";
import travelerData  from "../src/data/travelerData";
import tripsData  from "../src/data/tripsData";
import Traveler from "../src/traveler";
import Trips from '../src/Trips.js'


describe('Trips', function() {
    let traveler;
    let tripsInfo;
    let travelerInfo

    beforeEach(() => {
        traveler = new Traveler(travelerData)
        tripsInfo = new Trips(tripsData)
        travelerInfo = new Trips(travelerData)
    })

    it("Should be a function", function () {
        expect(Trips).to.be.a("function")
    })

    it("Should be an instance of Trips and Traveler", function () {
        expect(tripsInfo).to.be.an.instanceof(Trips)
        expect(travelerInfo).to.be.an.instanceof(Trips)
        expect(traveler).to.be.an.instanceof(Traveler);
    });

    it("Should have a property that holds data", function () {
        expect(tripsInfo.data).to.equal(tripsData)
        expect(travelerInfo.data).to.equal(travelerData)
    })

    it("Should find user by ID when given an id", function () {
        expect(findUserByID(1)).to.equal(travelerData[0])
    })



})