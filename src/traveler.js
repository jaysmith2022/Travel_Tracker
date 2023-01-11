class Traveler {
    constructor(travelerInfo) {
        console.log(travelerInfo)
        this.id = travelerInfo.id
        this.name = travelerInfo.name
        this.travelerType = travelerInfo.travelerType
    }

    getFirstName() {
        return this.name.split(" ")[0]
    }
}



export default Traveler;