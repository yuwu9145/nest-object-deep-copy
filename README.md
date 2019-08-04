# Deep Copy Nested Objects 

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
