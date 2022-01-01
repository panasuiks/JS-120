class Cat {
  constructor(name) {
    this.name = name;
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }

  static genericGreeting() {
    console.log('Hello! I\'m a cat!');
  }

  static speak() {
    console.log(`Meow!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();
Cat.speak();
