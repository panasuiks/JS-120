function objectsEqual(obj1, obj2) {
   let string1 = Object.entries(obj1).sort().toString();
   let string2 = Object.entries(obj2).sort().toString();
   return string1 === string2;
}


console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false