// function Car(manufacturer, model) {
//   this.manufacturer = manufacturer;
//   this.model = model;
//   this.doors = 4;
//   this.drive = function() {
//     console.log(
//       "Driving  A " +
//         this.doors +
//         " Door " +
//         this.manufacturer +
//         " " +
//         this.model
//     );
//   };
// }

//const car = new Car();

const Car = new Function(
  "manufacturer",
  "model",
  ` this.manufacturer = manufacturer;
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
};`
);

const x = new Car("Honda", "Jazz");
