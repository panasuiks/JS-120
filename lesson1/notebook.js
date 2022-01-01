//Create Car Function
/*
function createCar(manufacturer, fuel, engineStatus) {
  if (fuel > 1) {
    fuel = fuel / 100;
  }
  
  return {
    make: manufacturer,
    fuelLevel: fuel,
    engineOn: engineStatus,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  }
}

let corvette = createCar('Jaguar', 0.4, false);

*/

// function createBook(Title, Author) {  
//   return {
//     Title,
//     Author,
//     read: false,

//     readBook() {
//       this.read = true;
//     },

//     getDescription() {
//       let ending = ''
//       this.read ? ending = 'I have read it.' : ending = 'I haven\'t read it.';
//       return `${this.Title} was written by ${this.Author}. ${ending}`;
//     }
//   }
// }

// function assignProperty(object, property, value) {
//   let obj = object;
//   while (true) {
//     if (obj === null) {
//       break;
//     } else if (obj.hasOwnProperty(property)) { 
//       obj[property] = value;
//       break;
//     } else {
//       obj = Object.getPrototypeOf(obj);
//     }
//   }
// }

// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false


let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

bar.add.call(foo);
