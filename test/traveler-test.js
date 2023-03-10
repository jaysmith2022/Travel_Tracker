import { expect } from "chai";
import travelerData from "../src/data/travelerData";
import tripsData from "../src/data/tripsData";
import destinationData from "../src/data/destinationData";
import Traveler from "../src/traveler.js";
import Trips from "../src/Trips.js";

describe("Traveler", function () {
  let traveler;
  let destinationInfo;
  let tripsInfo;

  beforeEach(() => {
    traveler = new Traveler(travelerData[0]);
    destinationInfo = new Trips(destinationData);
    tripsInfo = new Trips(tripsData);
  });

  it("Should be a function", function () {
    expect(Traveler).to.be.a("function");
  });

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

  it("Should return the travelers first name", function () {
    expect(traveler.getFirstName()).to.equal("Ham");
  });
});
