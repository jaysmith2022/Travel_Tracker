class Trips {
  constructor(destinationData, tripsData) {
    this.destinationData = destinationData;
    this.tripsData = tripsData;
  }

  findAllTravelerTrips(id) {
    return this.tripsData.filter((trip) => trip.userID === id);
  }

  getDestinationData(id) {
    const tripsID = this.findAllTravelerTrips(id).map(
      (destID) => destID.destinationID
    );
    return tripsID.reduce((acc, curr) => {
      this.destinationData.forEach((element) => {
        if (element.id === curr) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }

  findPastTrips(id, date) {
    const pastTrip = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date < date)
      .map((el) => el.destinationID);
    return pastTrip.reduce((acc, curr) => {
      this.destinationData.forEach((element) => {
        if (element.id === curr) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }

  findUpcomingTrips(id, date) {
    const upcomingTrips = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date > date)
      .map((el) => el.destinationID);
    return upcomingTrips.reduce((acc, curr) => {
      this.destinationData.forEach((element) => {
        if (element.id === curr) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }

  totalCostByYear(id, year) {
    const tripsByYearDuration = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date.split("/")[0] === year)
      .map((el) => el.duration);
    const tripsByNumPeople = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date.split("/")[0] === year)
      .map((el) => el.travelers);
    const tripIDs = this.findAllTravelerTrips(id)
      .filter((trip) => trip.date.split("/")[0] === year)
      .map((el) => el.destinationID);
    const destinationCosts = tripIDs.reduce((acc, curr) => {
      this.destinationData.forEach((element) => {
        if (element.id === curr) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
    const tripsByYear = this.findAllTravelerTrips(id).filter(
      (trip) => trip.date.split("/")[0] === year
    );
    const totalLodgingByYear = tripsByYear
      .reduce((acc, curr) => {
        this.destinationData.forEach((element) => {
          if (element.id === curr.destinationID) {
            const lodging = element.estimatedLodgingCostPerDay * curr.duration;
            acc.push(lodging);
          }
        });
        return acc;
      }, [])
      .reduce((acc, curr) => acc + curr, 0);
    const totalFlightByYear = tripsByYear
      .reduce((acc, curr) => {
        this.destinationData.forEach((element) => {
          if (element.id === curr.destinationID) {
            const flight =
              element.estimatedFlightCostPerPerson * curr.travelers;
            acc.push(flight);
          }
        });
        return acc;
      }, [])
      .reduce((acc, curr) => acc + curr, 0);
    const total = totalFlightByYear + totalLodgingByYear;
    const travelAgentFee = total / 10;
    const finalTotalByYear = total + travelAgentFee;
    return +finalTotalByYear.toFixed(0);
  }
}

export default Trips;
