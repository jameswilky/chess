let car = {
  manufacturer: "Honda",
  model: "Jazz",
  wheels: 4,
  doors: 4,
  drive: function() {
    console.log("Driving " + manufacturer + " " + this.model);
  }
};

console.log(car.constructor);
car.drive();
