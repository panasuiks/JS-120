class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }
  info() {
    return `a ${this.animal} named ${this.name}`;
  }
}

class Shelter {
  constructor(name) {
    this.name = name;
    this.pets = [];
    this.adoptions = {};
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  removePet(pet) {
    let index = this.pets.indexOf(pet);
    this.pets.splice(index,1);
  }

  printAvailablePets() {
    console.log(`The shelter has ${this.numberOfPets()} pet available:`)
    this.pets.forEach(pet => console.log(pet.info()));
    console.log();
  }
  
  adopt(owner, pet) {
    this.adoptions[owner.name] = this.adoptions[owner.name] || []
    this.adoptions[owner.name].push(pet);
    owner.addPet(pet);
    this.removePet(pet);
  }

  numberOfPets() {
    return this.pets.length
  }

  printAdoptions() {
    for (let owner in this.adoptions) {
      let petArray = this.adoptions[owner];
      console.log(`${owner} has adopted the following pets:`)
      petArray.forEach(pet => console.log(pet.info()))
      console.log();
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter('PARL');
shelter.addPet(butterscotch);
shelter.addPet(pudding);
shelter.addPet(darwin);
shelter.addPet(kennedy);
shelter.addPet(sweetie);
shelter.addPet(molly);
shelter.addPet(chester);
console.log(shelter.pets);

shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);

console.log(shelter.pets);

shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
shelter.printAvailablePets();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`${shelter.name} has ${shelter.numberOfPets()} unadopted pets.`);

