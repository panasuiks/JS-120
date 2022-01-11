// name property added to make objects easier to identify
let foo = {
  name: 'foo',

  ancestors() {
    let result = [];
    let currentObject = this;
    while (true) {
      currentObject = Object.getPrototypeOf(currentObject)
      if (currentObject === null) break;
      if (currentObject === Object.prototype) {
        result.push('Object.prototype');
      } else {
        result.push(currentObject.name);
      }
    }
    return result;
  }
};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']