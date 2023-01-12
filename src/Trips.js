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
      if(upcomingTrips.length === 0) {
        return "You Don't Have Any Upcoming Trips, Book Now!"
      } else {
        return upcomingTrips.reduce((acc, curr) => {
        this.destinationData.forEach((element) => {
        if (element.id === curr) {
          acc.push(element);
        }
      });
      return acc;
    }, []);
  }
  }

  findPendingTrips(id) {
    const pendingTrips = this.findAllTravelerTrips(id)
    .filter((el) => el.status === "pending").map(e => e.destinationID) 
    if(pendingTrips.length === 0) {
      return "You Don't Have Any Pending Trips, Book Now!"
    } else {
    return pendingTrips.reduce((acc, curr) => {
    this.destinationData.forEach((element) => {
      if (element.id === curr) {
        acc.push(element);
      }
    });
    return acc;
  }, []);
}
}
  


  totalCostPerTrip(id, date) {
    const tripByDate = this.findAllTravelerTrips(id).filter(trip => trip.date === date)
    const totalPerTrip = tripByDate
    .reduce((acc, curr) => {
      this.getDestinationData(id).forEach((element) => {
        if (element.id === curr.destinationID) {
          const lodging = element.estimatedLodgingCostPerDay * curr.duration;
          const flight = element.estimatedFlightCostPerPerson * curr.travelers
          const totalBeforeComish = flight + lodging
          const total = totalBeforeComish/10 + totalBeforeComish
          acc.push(total);
        }
      });
      return acc;
    }, [])

    return totalPerTrip[0]
  }


  totalCostByYear(id, year) {
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
