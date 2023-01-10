import { expect } from "chai";
import travelerInfo from "../src/data/travelerData";
import Traveler from "../src/Traveler";

describe("Traveler", function () {
  let travelerUser;

  beforeEach(() => {
    travelerUser = new Traveler(travelerInfo[0]);
  });

  it("Should be a function", function () {
    expect(Traveler).to.be.a("function");
  });
})
