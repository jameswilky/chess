function Car(manufacturer) {
  this.manufacturer = manufacturer;
  this.model = "Jazz";
  let wheels = 5;
  this.doors = 4;
  this.drive = function() {
    console.log("Driving " + this.model + this.wheels);
  };
}

const car = new Car("Honda");

car.drive();
