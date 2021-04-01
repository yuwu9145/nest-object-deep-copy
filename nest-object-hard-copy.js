'use strict';

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

  let level = 0;

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
/*****************
 * END OF HELPERS *
 * **************/


 /*****************
 * MAIN CLOSURE *
 * **************/
function deepCopy(obj) {
  
  let copiedObj = Object.assign({});
  
  copiedObj.__proto__ = Object.getPrototypeOf(obj);

  let keyChain = [];
  let subKeyChain = [];
  
  function iterateKeys(obj) {
    Object.keys(obj).forEach(key => {
      let currentKeyChainValue = obj[key]; 
      if (typeof currentKeyChainValue === 'object' && obj[key] && obj[key] !== null && !Array.isArray(currentKeyChainValue)) {
        subKeyChain.push(key); 
        iterateKeys(obj[key]);
        return;
      }
      return;
    });
  }
  
  Object.keys(obj).forEach(key => {
    let currentKeyChainValue = obj[key]; 
    if (typeof currentKeyChainValue === 'object' && obj[key] && obj[key] !== null) {
      subKeyChain = [...[key]];
      iterateKeys(obj[key]);
      keyChain.push([...subKeyChain]);
    } else {
      copiedObj[key] = obj[key]; 
    }
  });

  keyChain.forEach(keyLevelArray => {
    copiedObj[keyLevelArray[0]] = {...obj[keyLevelArray[0]]}; 
    keyLevelArray.forEach((currentKey, index) => {
      const currentCutDownSubKeyChain = [...keyLevelArray].slice(0, index + 1);
      setDeep(copiedObj, currentCutDownSubKeyChain, {...getDeep(currentCutDownSubKeyChain, obj)}); 
    });
  });

  return copiedObj;
}
 /*****************
 * END OF MAIN CLOSURE *
 * **************/

module.exports = deepCopy;
