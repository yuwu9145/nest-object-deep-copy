'use strict';

var DEFAULT_CIRCULAR_VALUE = '[Circular]';

/*****************
 * HELPERS *
 * **************/

 /**
 * Dynamically sets a deeply nested value in an object.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 */
function setDeep(obj, path, value) {

  var level = 0;

  path.reduce((a, b)=>{
    level++;

    if (level === path.length){
      a[b] = value;
      return value;
    } else {
      return a[b];
    }
  }, obj);
}

/**
 * Dynamically gets a deeply nested value from an object.
 * @function
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!object} obj  - The object which contains the value you want to get.
 */
function getDeep(path, obj) {
  return path.reduce(function(prev, curr) { 
    return prev[curr] 
  }, obj);
}

function checkCircular(obj){
  var containCircular = false; 
  try {
    JSON.parse(JSON.stringify(obj));
  } catch (e) {
    if (e instanceof TypeError && e.message.indexOf('Converting circular structure to JSON') !== -1) {
      containCircular = true;
    }
  }
  return containCircular;
}

// Not boolean, number, string, undefined, null, bigint, symbol
function isNonePrimitive(value) {
  return typeof value === 'object' && value && value !== null && !Array.isArray(value);
}

function getKeyChains(obj) {
  var keyChain = [];
  var subKeyChain = [];
  var circularKeyChain = [];
  
  var containCircularRefs = checkCircular(obj); 
  var referenceObjs = [obj];
  
  function iterateKeys(obj) {

    Object.keys(obj).forEach(key => {
      
      var currentKeyChainValue = obj[key]; 
      
      if (isNonePrimitive(currentKeyChainValue)) {
        if (containCircularRefs) {
          if (referenceObjs.indexOf(currentKeyChainValue) > -1) {
            circularKeyChain.push([...subKeyChain, key]);
            return; 
          } else {
            subKeyChain.push(key); 
            referenceObjs.push(currentKeyChainValue);
          }
        }
        
        subKeyChain.push(key); 
        iterateKeys(obj[key]);
        return;
      }
      return;
    });
  }
  
  Object.keys(obj).forEach(key => {
    
    var currentKeyChainValue = obj[key]; 

    if ( isNonePrimitive(currentKeyChainValue)) {
      
      if (containCircularRefs) {
        if (referenceObjs.indexOf(currentKeyChainValue) > -1) {
          circularKeyChain.push([key]);
          return; 
        } else {
          referenceObjs.push(currentKeyChainValue);
        }
      }
      
      subKeyChain = [...[key]];
      iterateKeys(obj[key]);
      keyChain.push([...subKeyChain]);
    } else {
      keyChain.push([key]);
    }
  });

  return {
    keyChain,
    circularKeyChain
  };
}

/*****************
 * END OF HELPERS *
 * **************/


 /*****************
 * MAIN CLOSURE *
 * **************/
function deepCopy(obj) {
  
  var copiedObj = Object.assign({});
  
  copiedObj.__proto__ = Object.getPrototypeOf(obj);

  var keyChainAndCircularChain = getKeyChains(obj);
  var keyChain = keyChainAndCircularChain.keyChain;
  var circularKeyChain = keyChainAndCircularChain.circularKeyChain;

  keyChain.forEach(keyLevelArray => {
    copiedObj[keyLevelArray[0]] = {...obj[keyLevelArray[0]]}; 
    keyLevelArray.forEach((currentKey, index) => {
      var currentCutDownSubKeyChain = [...keyLevelArray].slice(0, index + 1);
      var valueToAssign = getDeep(currentCutDownSubKeyChain, obj);
      setDeep(copiedObj, currentCutDownSubKeyChain, isNonePrimitive(valueToAssign) ? {...valueToAssign} : valueToAssign); 
    });
  });

  if (circularKeyChain.length) {
    circularKeyChain.forEach(keyLevelArray => {
      setDeep(copiedObj, keyLevelArray, DEFAULT_CIRCULAR_VALUE); 
    });
  }
  
  return copiedObj;
}
 /*****************
 * END OF MAIN CLOSURE *
 * **************/

module.exports = deepCopy;
