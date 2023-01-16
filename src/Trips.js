import {
  getDestinations,
  getDestinationbyID,
  getFlightAndLodging,
} from "./helperFunctions";

class Trips {
  constructor(destinationData, tripsData) {
    this.destinationData = destinationData;
    this.tripsData = tripsData;
  }

  findAllTravelerTrips(id) {
    const userTravel = this.tripsData.filter((trip) => trip.userID === id);
    if(userTravel.length <= 0) {
      return 'No User Information'
    } else {
      return userTravel
    }
  }

  getDestinationData(id) {
    const tripsID = this.findAllTravelerTrips(id).map(
      (destID) => destID.destinationID
    );
    return getDestinationbyID(tripsID, this.destinationData);
  }

  findPastTrips(id, date) {
    const pastTrip = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date < date)
      .map((el) => el.destinationID);
    return getDestinationbyID(pastTrip, this.destinationData);
  }

  findUpcomingTrips(id, date) {
    const upcomingTrips = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date > date)
      .filter((element) => element.status !== "pending")
      .map((el) => el.destinationID);
    return getDestinations(
      upcomingTrips,
      "You Don't Have Any Upcoming Trips, Book Now!",
      this.destinationData
    );
  }

  findPendingTrips(id) {
    const pendingTrips = this.findAllTravelerTrips(id)
      .filter((el) => el.status === "pending")
      .map((e) => e.destinationID);
    return getDestinations(
      pendingTrips,
      "You Don't Have Any Pending Trips, Book Now!",
      this.destinationData
    );
  }

  totalCostPerBookedTrip(chosenDest, travelers, length) {
    const lodging = chosenDest.estimatedLodgingCostPerDay * length;
    const airFair = chosenDest.estimatedFlightCostPerPerson * travelers;
    const total = lodging + airFair;
    const travelAgentFee = total / 10;
    const finalTotalByYear = total + travelAgentFee;
    return +finalTotalByYear.toFixed(0);
  }

  totalCostByYear(id, year) {
    const totalLodgingByYear = getFlightAndLodging(
      this.destinationData,
      this.findAllTravelerTrips(id),
      "estimatedLodgingCostPerDay",
      "duration",
      id,
      year
    );
    const totalFlightByYear = getFlightAndLodging(
      this.destinationData,
      this.findAllTravelerTrips(id),
      "estimatedFlightCostPerPerson",
      "travelers",
      id,
      year
    );
    const total = totalFlightByYear + totalLodgingByYear;
    const travelAgentFee = total / 10;
    const finalTotalByYear = total + travelAgentFee;
    return +finalTotalByYear.toFixed(0);
  }
}

export default Trips;
