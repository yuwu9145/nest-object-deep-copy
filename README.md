# Deep Copy Nested Objects 

![Coverage badge gree][coverage-badge-green]

[coverage-badge-green]: https://img.shields.io/badge/Coverage-100%25-brightgreen.svg
[coverage-badge-yellow]: https://img.shields.io/badge/Coverage-100%25-yellow.svg
[coverage-badge-red]: https://img.shields.io/badge/Coverage-100%25-red.svg

One confusion in javascript is **hard copy / shallow copy** objects. Usually developers are being told to use the **spread operator**, **Object.assign** or **JSON.parse(JSON.stringify(object))** to get a real copy from the original object.

In most situations they will work as expected, but in certain circumstances they will not work as might you expect.

This javascript module aims to avoid problems that these methods have and always give you a real hard copy based on the original object.

## Features

- Copied object will keep original object's **prototype chain**
- Will create brandnew object for each nested objects rather than just copy nested objects reference
- Will copy over all properties which equal to function declaration

## What will happen if copied object wants to delegate to original object's prototype chain that has useful methods?

```javascript
// Declare a constructor function
function Foo(who) {
  this.me = who;
}

// Now there is a new property called 'identify' which equals to a function in prototype chain of any object being created by calling new Foo
Foo.prototype.identify = function() {
  return 'I am ' + this.me;
}

// Create a user object by constructor Foo
const user = new Foo('Jack');

// Create a copy object by using spread operator
const copiedUser1 = {...user};
// Prototype chain is lost !!
copiedUser1.identify(); // Uncaught TypeError: copiedUser1.identify is not a function

// Create a copy object by using Object.assign()
const copiedUser2 = Object.assign({}, user);
// Prototype chain is lost !!
copiedUser2.identify(); // Uncaught TypeError: copiedUser2.identify is not a function

// Create a copy object by using JSON.parse(JSON.stringify(object))
const copiedUser3 = JSON.parse(JSON.stringify(user));
// Prototype chain is lost !!
copiedUser3.identify(); // Uncaught TypeError: copiedUser3.identify is not a function

```


## Problem with spread operator and Object.assign()

If the object is a plain object and has only primitive values:

```javascript
let user = {
  id: 1,
  gender: 'male'
};
```

Then the spread operator or Object.assign() will give you a hard copied object, let us continue with the example above:

```javascript
let copiedUser = {
  ...user
};

// Change a property
copiedUser.id = 2;

console.log(user.id); // 1
console.log(copiedUser.id); // 2

// CopiedUser object property value change does not have an impact on the original user object
```

**However**, if the original object has a property that refers to a nested object, for example:

```javascript
let user = {
  id: 101,
  gender: 'male',
  personalInfo: {
    name: 'Jack',
  }
};
```

Then the spread operator or Object.assign() **WILL NOT** give you a hard copied object, let us continue with another example:

```javascript
let copiedUser = {
  ...user
};

// Change a nested object value
copiedUser.personalInfo.name = 'Tom';

// Change a property which holds a primitive value
copiedUser.id = 2;

// original user object mutation happens
console.log(user.personalInfo.name); // 'Tom'
console.log(copiedUser.personalInfo.name); // 'Tom'

// BUT mutation does not happen to property which holds a primitive value
console.log(user.id); // 1
console.log(copiedUser.id); // 2
```


## Problem with JSON.parse(JSON.stringify(object))

JSON.parse(JSON.stringify(object)) **WILL LOSE** the property which equals to a function, for example:

```javascript
let user = {
  id: 1,
  name: 'jack',
  speak: function() {
    console.log('I am speaking from original object.');
  }
};

let copiedUser = JSON.parse(JSON.stringify(user));

user.speak(); // `I am speaking from original object.`
copiedUser.speak(); //Uncaught TypeError: copiedUser.speak is not a function
```

## Install
```javascript
$ npm install nest-object-deep-copy
```

## Hot to use it
```javascript
const nestedHardCopy = require('nest-object-deep-copy');

// original object
let user = {
  id: 1,
  gender: 'male',
  personalInfo: {
    name: 'Jack',
  },
  speak: function() {
    console.log('I am speaking from original object.');
  }
};

//Get a hard copy
let copiedUser = nestedHardCopy(user);

//Change some values in the copied object
copiedUser.id = 2; //primitive property change
copiedUser.personalInfo.name = 'Daniel'; //nested object value change

copiedUser.speak = function() {
  console.log('I am speaking from copied object.')
}; //Assign a new function

console.log(user.id); // 1
console.log(user.personalInfo.name); // 'Jack'
user.speak(); // 'I am speaking from original object.'
copiedUser.speak(); //'I am speaking from copied object.'
```
## License

This project is licensed under the MIT License 
