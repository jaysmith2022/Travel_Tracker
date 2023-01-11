class Trips {
    constructor(destinationData, tripsData) {
        this.destinationData = destinationData
        this.tripsData = tripsData
    }

    findAllTravelerTrips(id) {
        return this.tripsData.filter((trip) => trip.userID === id);
    }
}














export default Trips;