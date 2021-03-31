# Deep Copy Nested Objects 

![Coverage badge gree][coverage-badge-green]

[coverage-badge-green]: https://img.shields.io/badge/Coverage-100%25-brightgreen.svg
[coverage-badge-yellow]: https://img.shields.io/badge/Coverage-100%25-yellow.svg
[coverage-badge-red]: https://img.shields.io/badge/Coverage-100%25-red.svg

This javascript module aims to create a real hard copy from original javascript object. It avoids all [limitations](#limitions-of-common-ways) of using **spread operator**, **Object.assign** and **JSON.parse(JSON.stringify(object))**. 

| Feature  | JSON.parse(JSON.stringify(object)) | spread operator | Object.assign | nest-object-deep-copy |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [Hard Copy nested object](#cannot-make-hard-copy-on-nested-objects) | :heavy_check_mark:  | :x:  | :x:  | :heavy_check_mark:  |
| [Copy functions](#loosing-functions) | :x:  | :heavy_check_mark:  | :heavy_check_mark:  |  :heavy_check_mark:  |
| [Keep prototype chain](#loosing-prototype-chain)  | :x:  | :x:  | :x:  |  :heavy_check_mark:  |

## Limitions of common ways
### Cannot make hard copy on nested objects 

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


### Loosing functions

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

### Loosing prototype chain

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

## Install
```console
$ npm install nest-object-deep-copy
```

## How to use it
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
