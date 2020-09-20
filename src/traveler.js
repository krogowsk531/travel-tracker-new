class Traveler {
  constructor(data) {
    console.log("T", data)
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType
  }
}

export default Traveler;
