/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 * @param {boolean} setrecursively - If true, will set value of non-existing path as well.
 */
function setDeep(obj, path, value, setrecursively = false) {

    let level = 0;

    path.reduce((a, b)=>{
        level++;

        if (setrecursively && typeof a[b] === "undefined" && level !== path.length){
            a[b] = {};
            return a[b];
        }

        if (level === path.length){
            a[b] = value;
            return value;
        } else {
            return a[b];
        }
    }, obj);
}

function getDeep(path, obj) {
  return path.reduce(function(prev, curr) {
      return prev ? prev[curr] : null
  }, obj || self)
}

let copiedObj = Object.assign({});

const keyChain = [];
let subKeyChain = [];

function iterateKeys(obj) {
  Object.keys(obj).forEach(key => {
    const currentKeyChainValue = obj[key]; 
    
    if (typeof currentKeyChainValue === 'object' && obj[key] && obj[key] !== null) {
      subKeyChain.push(key); 
      iterateKeys(obj[key]);
      return;
    }
    return;
  });
}


function hardCopy(obj) {
  Object.keys(obj).forEach(key => {
    console.log(key); 
    const currentKeyChainValue = obj[key]; 
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

module.exports = hardCopy;
