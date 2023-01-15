import { expect } from "chai";
import tripsData from "../src/data/tripsData";
import destinationData from "../src/data/destinationData";
import Trips from "../src/Trips.js";

describe("Trips", function () {
  let tripsInfo;
  let destinationInfo;
  let allData;

  beforeEach(() => {
    tripsInfo = new Trips(tripsData);
    destinationInfo = new Trips(destinationData);
    allData = new Trips(destinationData, tripsData);
  });

  it("Should be a function", function () {
    expect(Trips).to.be.a("function");
  });

  it("should have property to hold destination data", function () {
    expect(destinationInfo.destinationData).to.deep.equal(destinationData);
  });

  it("should have property to hold trip and destination data", function () {
    expect(allData.destinationData).to.deep.equal(destinationData);
    expect(allData.tripsData).to.deep.equal(tripsData);
  });

  it("Should find all traveler destinations by id", function () {
    expect(allData.findAllTravelerTrips(2).length).to.deep.equal(6);
  });

  it("Should return all destination for traveler", function () {
    expect(allData.getDestinationData(2)[0].destination).to.deep.equal(
      "Toronto, Canada"
    );
  });

  it("Should find all past trips", function () {
    console.log(allData.findPastTrips(2, "2023/01/13"))
    expect(allData.findPastTrips(2, "2020/06/20")[1].destination).to.equal(
      "Paris, France"
    );
  });

  it("should find all upcoming trips", function () {
    expect(allData.findUpcomingTrips(2, "2020/06/20")[0].destination).to.equal(
      "Jakarta, Indonesia"
    );
  });

  it("Should display message if there are no upcoming trips", function () {
    expect(allData.findUpcomingTrips(2, "2023/01/11")).to.equal(
      "You Don't Have Any Upcoming Trips, Book Now!"
    );
  })

  it("Should return all pending trips", function () {
    expect(allData.findPendingTrips(2, "2023/01/11")[0].destination).to.equal(
      "Nassau, The Bahamas"
    );
  })

  it("Should return message if there are no pending trips", function () {
    expect(allData.findPendingTrips(133, "2023/01/11")).to.equal(
      "You Don't Have Any Pending Trips, Book Now!"
    );
  })

  // it("Should Calculate total price per trip", function () {
  //   expect(allData.totalCostPerTrip(2, "2019/09/27")).to.deep.equal([3762, 6644, 2183.5, 2183.5, 1529, 1529, 10989, 3205.4]);
  // })

  it("should calculate total cost for trips taken by year", function () {
    // expect(allData.totalCostByYear(2, "2019")).to.equal(3762);
    expect(allData.totalCostByYear(2, "2020")).to.equal(24551);
  });
});
