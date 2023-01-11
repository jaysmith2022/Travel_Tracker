class Trips {
    constructor(data) {
        this.data = data
    }

    findUserByID(id) {
        return this.data.find(traveler => traveler.id === id)
    }
}














export default Trips;