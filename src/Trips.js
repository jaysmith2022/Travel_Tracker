class Trips {
  constructor(destinationData, tripsData) {
    this.destinationData = destinationData;
    this.tripsData = tripsData;
  }

  findAllTravelerTrips(id) {
    return this.tripsData.filter((trip) => trip.userID === id);
  }

    getDestinationData(id) {
    const tripsID = this.findAllTravelerTrips(id).map(destID => destID.destinationID)
    return tripsID.reduce((acc, curr) => {
        this.destinationData.forEach(element => {
            if(element.id === curr) {
                acc.push(element)
            }
        })
        return acc
    }, [])
  }

  findPastTrips(id, date) {
    const pastTrip = this.findAllTravelerTrips(id).filter(trip => trip.date < date).map(el => el.destinationID)
    return pastTrip.reduce((acc, curr) => {
        this.destinationData.forEach(element => {
            if(element.id === curr) {
                acc.push(element)
            }
        })
        return acc
    }, [])
  }
}

export default Trips;
