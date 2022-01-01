// // function makeObj() {
// // return {
// // propA: 10,
// // propB: 20,
// // }
// // }
// // 

// // let invoice = {
// //   phone: 3000,
// //   internet: 6500
// // };

// // let payment = {
// //   phone: 1300,
// //   internet: 5500
// // };

// // let invoiceTotal = invoice.phone + invoice.internet;
// // let paymentTotal = payment.phone + payment.internet;
// // let remainingDue = invoiceTotal - paymentTotal;

// // console.log(paymentTotal);         // => 6800
// // console.log(remainingDue);         // => 2700



// function createInvoice(services = {}) {
//   let phone = services.phone;
//   let internet = services.internet;
//   if (phone === undefined) phone = 3000;
//   if (internet === undefined) internet = 5500;

//   return {
//     phone,
//     internet,
//     payments: [],

//     total() {
//       return this.phone + this.internet
//     },

//     paymentTotal() {
//       return this.payments.reduce((previous, current) => {
//         return previous + current.total()
//       }, 0)
//     },

//     addPayment(payment) {
//       this.payments.push(payment);
//     },

//     addPayments(paymentArray) {
//       paymentArray.forEach(payment => this.addPayment(payment));
//     },

//     amountDue() {
//       return this.total() - this.paymentTotal();
//     }
//   };
// }

// function invoiceTotal(invoices) {
//   let total = 0;

//   for (let index = 0; index < invoices.length; index += 1) {
//     total += invoices[index].total();
//   }

//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({ internet: 6500 }));
// invoices.push(createInvoice({ phone: 2000 }));
// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices)); // 31000

// function createPayment(services = {}) {
//   return {
//     phone: services.phone || 0,
//     internet: services.internet || 0,
//     amount: services.amount,

//     total() {
//       return (this.amount !== undefined) ? this.amount : this.phone + this.internet;
//     }
//   }
// }

// function paymentTotal(payments) {
//   return payments.reduce((sum, payment) => sum + payment.total(), 0);
// }

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));

// payments.push(createPayment({
//   phone: 2000,
// }));

// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));

// payments.push(createPayment({
//   amount: 10000,
// }));

// console.log(paymentTotal(payments));      // => 24000

// let invoice = createInvoice({
//   phone: 1200,
//   internet: 4000,
// });

// let payment1 = createPayment({ amount: 2000 });
// let payment2 = createPayment({
//   phone: 1000,
//   internet: 1200
// });

// let payment3 = createPayment({ phone: 1000 });

// invoice.addPayment(payment1);
// invoice.addPayments([payment2, payment3]);
// console.log(invoice.amountDue());       // this should return 0

// function Circle(radius) {
//   this.radius = radius
// }

// Circle.prototype.area = function () {
//   return Math.PI * this.radius * this.radius
// }



// let a = new Circle(3);
// let b = new Circle(4);

// a.area().toFixed(2); // => 28.27
// b.area().toFixed(2); // => 50.27
// a.hasOwnProperty('area'); // => false

// function Ninja() {
//   this.swung = false;
// }

// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// }

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

// let ninjaA;

// {
//   const Ninja = function() {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// let ninjaB = new ninjaA.constructor

// console.log(ninjaA.constructor === ninjaB.constructor) // => true


function User(first, last) {
  if (this instanceof User) {
    this.name = first + ' ' + last;
  } else {
    return new User(first, last)
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe


function Foo() {

}

Foo.prototype.sayHi = function() {
  console.log('Hi!');
}

let obj = new Foo;
obj.sayHi(); //logs 'Hi!'

Foo.prototype; // { sayHi: [Function (anonymous)] }
Foo.prototype.hasOwnProperty('sayHi'); // true
