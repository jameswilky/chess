function Car(manufacturer) {
  this.manufacturer = manufacturer;
  this.model = "Jazz";
  this.doors = 4;
  this.drive = function() {
console.log("Driving  A " + this.doors " Door" + manufacturer + " " + this.model);
  };
}

const car = new Car("Honda");

car.drive();
