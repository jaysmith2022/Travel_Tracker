class Trips {
    constructor(destinationData, tripsData) {
        this.destinationData = destinationData
        this.tripsData = tripsData
    }

    findUserByID(id) {
    return this.data.find(traveler => traveler.id === id)
    }
}














export default Trips;