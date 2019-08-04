# Deep Copy Nested Objects 

One of confusion in javascript is **hard copy vs shallow copy**. Usually developers are being told to use **spread operator**, **Object.assign** or **JSON.parse(JSON.stringify(object))** to get a real copy from your original object.

In most situations, they will work as expect, but in certain circumstances, they will not work as you expect.

This javascript module aims to avoid problems that these mothods have and always give you a real hard copy based on your original object.

## Problem with spread operator and Object.assign()

If your object is a plain object and has primitive only values, for example:

```javascript
var user = {
  id: 1,
  gender: 'male'
};
```

The spread operator or Object.assign() will give you a hard copy object, let us continue with obove example:

```javascript
var copiedUser = {
  ...user
};

// Change a property
copiedUser.id = 2;

console.log(user.id); // 1
console.log(copiedUser.id); // 2

// CopiedUser object property value change does not have impact on original user object
```

**However**, if your original object has a property that refers to a nested object, for example:

```javascript
var user = {
  {
    id: 101,
    gender: 'male'
    personalInfo: {
      name: 'Jack',
    }
  }
};
```

The spread operator or Object.assign() **WILL NOT** give you a hard copy object, let us continue with obove example:

```javascript
var copiedUser = {
  ...user
};

// Change a nested object value
copiedUser.personalInfo.name = 'Tom';

// Change a property which holds primitive value
copiedUser.id = 2;

// original user object mutation happens
console.log(user.personalInfo.name); // 'Tom'
console.log(copiedUser.personalInfo.name); // 'Tom'

// BUT mutation does not happen to property which holds primitive value
console.log(user.id); // 1
console.log(copiedUser.id); // 2
```


## Problem with JSON.parse(JSON.stringify(object))

JSON.parse(JSON.stringify(object)) **WILL LOST** the property which equals to a function, for example:

```javascript
var user = {
  id: 1,
  name: 'jack',
  speak: function() {
    console.log('I am speaking from original object.');
  }
};

var copiedUser = JSON.parse(JSON.stringify(user));

user.speak(); // `I am speaking from original object.`
copiedUser.speak(); //Uncaught TypeError: copiedUser.speak is not a function
```

## Install
```javascript
$ npm install nest-object-deep-copy
```

## Hot to use it
```javascript
const nestedHardCopy = require('./nest-object-hard-copy');

// original object
var user = {
  {
    id: 1,
    gender: 'male'
    personalInfo: {
      name: 'Jack',
    },
    speak: function() {
      console.log('I am speaking from original object.');
    }
  }
};

//Get a hard copy
var copiedUser = nestedHardCopy(user);

//Change some values in copied object
copiedUser.id = 2; //primitive property change
copiedUser.personalInfo.name = 'Daniel'; //nested object value change

copiedUser.speak = function() {
  console.log('I am speaking from copied object.')
}; //Assign a new fuction

console.log(user.id); // 1
console.log(user.personalInfo.name); // 'Jack'
user.speak(); // 'I am speaking from original object.'
copiedUser.speak(); //'I am speaking from copied object.'
```
## License

This project is licensed under the ISC License 
