function Car(manufacturer, model) {
  this.manufacturer = manufacturer;
  this.model = model;
  this.doors = 4;
  this.drive = function() {
    console.log(
      "Driving  A " +
        this.doors +
        " Door " +
        this.manufacturer +
        " " +
        this.model
    );
  };
}

Car.call({}, "Honda", "Jazz");
//const car = new Car("Honda", "Jazz");
