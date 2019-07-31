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

let keyChain = [];
const copiedObj = Object.assign({});

function iterateKeys(obj) {
    
  Object.keys(obj).forEach(key => {
    const currentKeyChainValue = keyChain.length ? getDeep(keyChain, obj) : obj[key]; 
    
    if (typeof currentKeyChainValue === 'object' && obj[key] && obj[key] !== null) {
      keyChain.push(key); 
      console.log('----value here----', currentKeyChainValue, key, keyChain); 
      iterateKeys(obj[key]);
      return;
    }
     
    
    if(keyChain.length) {
      console.log('--primitive values---', keyChain); 
      setDeep(copiedObj, keyChain, getDeep(keyChain, obj));
      // keyChain = [];
    } else {
      copiedObj[key] = obj[key];
    }
    return;
    // copiedObj[key] = obj[key];
  });
}


function hardCopy(obj) {

	iterateKeys(obj);

	console.log('--fdfd---', copiedObj);

	return copiedObj;
}

module.exports = hardCopy;
