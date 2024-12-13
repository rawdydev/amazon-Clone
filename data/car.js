class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  

  constructor(vehicleDetailes) {
    this.#brand = vehicleDetailes.brand;
    this.#model = vehicleDetailes.model;
  }

  go() {
    if (this.speed < 200 && !this.isTrunkOpen) {
      this.speed += 5;      
    } else if (this.speed > 200) {
      alert("maximum speed")
    } else if (this.isTrunkOpen) {
      alert("Trunk is open")
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
    } else if (this.speed < 0) {
      alert("Not enough speed")
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    } else if (this.speed > 0) {
      alert("Car is running!")
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'Open' : 'Closed';

    console.log(
      `${this.#brand} ${this.#model} Speed: ${this.speed} Km/h 
      Trunk: ${trunkStatus}`
    )
  }

}

class RaceCar extends Car {
  acceleration;

  constructor(vehicleDetailes) {
    super(vehicleDetailes)

    this.acceleration = vehicleDetailes.acceleration;
  }

  go() {
    if (this.speed < 300) {
    this.speed += this.acceleration;
    } else if (this.speed > 300) {
      alert("maximum speed")
    }

   /*
    if (this.speed > 300) {
      this.speed = 300;
    } */
  }

  openTrunk() {
    console.log("Race cars don't have a trunk.");
  }

  closeTrunk() {
    console.log("Race cars don't have a trunk.");
  }

}


const corolla = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const tesla = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const tesla2 = new Car({
  brand: 'Tesla',
  model: 'Model s'
});

const mcLaren = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 30
});

corolla.go()
corolla.go()
corolla.go()
tesla.go()
mcLaren.go()
mcLaren.go()

tesla2.openTrunk()
mcLaren.openTrunk()

corolla.brake()

corolla.displayInfo()
tesla.displayInfo()
tesla2.displayInfo()
mcLaren.displayInfo()

console.log(corolla, tesla, tesla2);
console.log(mcLaren);