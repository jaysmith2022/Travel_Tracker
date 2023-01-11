import { expect } from "chai";
import tripsData  from "../src/data/tripsData";
import destinationData from "../src/data/destinationData";
import Trips from '../src/Trips.js'


describe('Trips', function() {
    let tripsInfo;
    let destinationInfo
    let allData

    beforeEach(() => {
        tripsInfo = new Trips(tripsData)
        destinationInfo = new Trips(destinationData)
        allData = new Trips(destinationData, tripsData)
    })

    it("Should be a function", function () {
        expect(Trips).to.be.a("function")
    })

    it("should have property to hold destination data", function () {
        expect(destinationInfo.destinationData).to.deep.equal(destinationData)
    })

    it("should have property to hold trip and destination data", function () {
        expect(allData.destinationData).to.deep.equal(destinationData)
        expect(allData.tripsData).to.deep.equal(tripsData)
    })

    it("Should find all traveler trips by id", function () {
        expect(allData.findAllTravelerTrips(1).length).to.deep.equal(1)
    })

    it("Should find all past trips", function () {
        expect(allData.findAllPastTrips(2, '2023/01/11').length).to.deep.equal(7)
    })




})