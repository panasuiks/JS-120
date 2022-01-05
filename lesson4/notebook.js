// function createPet(animal, name) {
//   return {
//     animal,
//     name,

//     sleep: function () {
//       console.log('I am sleeping');
//     },

//     wake: function () {
//       console.log('I am awake');
//     }
//   }
// }


// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

// PetPrototype = {
//   sleep: function() {
//     console.log('I am sleeping');
//   },

//   wake: function() {
//     console.log('I am awake');
//   },

//   init(animal, name) {
//     this.name = name;
//     this.animal = animal;
//     return this;
//   }
// }

// let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake


//Case 1 = logs "Hello!"
//Case 2 = type error. undefined is not a function.
//Case 3 = logs undefined
//Case 4 = logs 'Goodbye!'
//Case 5 = type error. undefined is not a function.

// class Greeting {
//   constructor() {
//   }

//   greet(string) {
//     console.log(string);
//   }
// }

// class Hello extends Greeting {
//   hi() {
//     this.greet('Hello');
//   }
// }

// class Goodbye extends Greeting {
//   bye() {
//     this.greet('Goodbye');
//   }
// }

// let hi = new Hello;
// let buhbye = new Goodbye;

// hi.hi();
// buhbye.bye();

// const Speed = {
//   goFast() {
//     console.log(`I'm a ${this.constructor.name} and going super fast!`);
//   }
// };

// class Car {
//   goSlow() {
//     console.log(`I'm safe and driving slow.`);
//   }
// }

// Object.assign(Car.prototype, Speed)

// class Truck {
//   goVerySlow() {
//     console.log(`I'm a heavy truck and like going very slow.`);
//   }
// }

// Object.assign(Truck.prototype, Speed);

// let blueTruck = new Truck();
// blueTruck.goFast(); // => logs "I'm a Truck and going super fast!"

// let smallCar = new Car();
// smallCar.goFast(); // => logs "I'm a Car and going super fast!"
// const tires = {
//   tirePressure(tireIdx) {
//     return this.tires[tireIdx];
//   },

//   inflateTire(tireIdx, pressure) {
//     this.tires[tireIdx] = pressure;
//   },
// }

// class Vehicle {
//   constructor(kmTravelledPerLiter, fuelCapInLiter) {
//     this.fuelEfficiency = kmTravelledPerLiter;
//     this.fuelCap = fuelCapInLiter;
//   }

//   range() {
//     return this.fuelCap * this.fuelEfficiency;
//   }
// }

// class WheeledVehicle extends Vehicle {
//   constructor(tires, kmTravelledPerLiter, fuelCapInLiter) {
//     super(kmTravelledPerLiter, fuelCapInLiter);
//     this.tires = tires;
//   }

//   tirePressure(tireIdx) {
//     return this.tires[tireIdx];
//   }

//   inflateTire(tireIdx, pressure) {
//     this.tires[tireIdx] = pressure;
//   }

// }

// class Auto extends WheeledVehicle {
//   constructor() {
//     // the array represents tire pressure for four tires
//     super([30, 30, 32, 32], 50, 25.0);
//   }
// }

// class Motorcycle extends WheeledVehicle {
//   constructor() {
//     // array represents tire pressure for two tires
//     super([20, 20], 80, 8.0);
//   }
// }

// class Catamaran extends Vehicle {
//   constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
//     super(kmTravelledPerLiter, fuelCapInLiter);
//     this.propellerCount = propellerCount;
//     this.hullCount = hullCount;
//   }
// }

class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
}

let tireMixin = {
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },
  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

class Auto extends Vehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super(50, 25.0);
    this.tires = [30, 30, 32, 32];
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    // array represents tire pressure for two tires
    super(80, 8.0);
    this.tires = [20, 20];
  }
}

Object.assign(Auto.prototype, tireMixin);
Object.assign(Motorcycle.prototype, tireMixin);

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}