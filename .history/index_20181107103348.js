function Car(manufacturer) {
  this.manufacturer = manufacturer;
  this.model = "Jazz";
  let wheels = 4;
  this.doors = 4;
  this.drive = function () {
    console.log("Driving " + model);
  };
}

const car = new Car("Honda");

car.drive();
