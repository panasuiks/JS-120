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

function createBook(Title, Author) {  
  return {
    Title,
    Author,
    read: false,

    readBook() {
      this.read = true;
    },

    getDescription() {
      let ending = ''
      this.read ? ending = 'I have read it.' : ending = 'I haven\'t read it.';
      return `${this.Title} was written by ${this.Author}. ${ending}`;
    }
  }
}