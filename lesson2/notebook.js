// /let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = {
//    a: 'abc',
//    b: 'def',
//    add: function() {
//      return this.a + this.b;
//    },
// };

// bar.add.call(foo);

// function repeatThreeTimes(func, context) {
//   func.call(context); // can't use func.call(john); john is out of scope
//   func.call(context);
//   func.call(context);
// }

// function foo() {
//   let john = {
//     firstName: 'John',
//     lastName: 'Doe',
//     greetings: function() {
//       console.log('hello, ' + this.firstName + ' ' + this.lastName);
//     },
//   };

//   repeatThreeTimes(john.greetings, john); // Strips context
// }

// foo();

// z = {test: 'test'};
// let x = [1, 2, 3];


// x.forEach(value => console.log(this), {test: 'test'})

// let obj = {
//   a: 'hello',
//   b: 'world',
//   foo: function() {
//     function bar() {
//       console.log(this);
//     }

//     bar();
//   },
// };

// obj.foo();        // => undefined undefined

// let obj = {
//   a: 'hello',
//   b: 'world',
//   foo: function() {
//     let bar = function() {
//       console.log(this.a + ' ' + this.b);
//     }.bind(this);

//     // some code
//     bar();

//     // some more code
//     bar();

//     // still more code
//   }
// };

// obj.foo();
// // => hello world
// // => hello world

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// let getDescriptionFromTurk = turk.getDescription.bind(turk);

// logReturnVal(getDescriptionFromTurk);

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();


// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     let incre = increment.bind(this)
//     incre();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();
// console.log(foo.a)

(function sum(number1, number2) {
  return number1 + number2;
});

console.log(sum(3, 4));

