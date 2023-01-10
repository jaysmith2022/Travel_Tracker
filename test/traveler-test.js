import { expect } from "chai";
import travelerData  from "../src/data/travelerData";
import Traveler from '../src/traveler.js'


describe("Traveler", function () {
    let traveler;

    beforeEach(() => {
        traveler = new Traveler(travelerData[0])
    })

    it("Should be a function", function () {
        expect(Traveler).to.be.a("function")
    })
})

