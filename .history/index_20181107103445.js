function Car(manufacturer) {
  this.manufacturer = manufacturer;
  this.model = "Jazz";
  this.doors = 4;
  this.drive = function() {
    console.log("Driving ");
  };
}

const car = new Car("Honda");

car.drive();
