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

    it("Should be an instance of Traveler", function () {
        expect(traveler).to.be.an.instanceof(Traveler);
    });

    it("Should have an id", function () {
        expect(traveler.id).to.equal(1);
    });

    it("Should have a name", function () {
        expect(traveler.name).to.equal("Ham Leadbeater");
    });

    it("Should have a travel type", function () {
        expect(traveler.travelerType).to.equal("relaxer");
    });
})

