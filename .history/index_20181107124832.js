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

function StopWatch(){
  this.start() =  function{

  };
}