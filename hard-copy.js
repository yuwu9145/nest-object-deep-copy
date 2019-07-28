function hardCopy(obj) {
  console.log('input obj', obj); 
  const copiedObj = Object.assign({}); 
   
  function iterateKeys(obj) {
    Object.keys(obj).forEach(key => {
      copiedObj[key] = obj[key];
      if (!obj[key] || typeof obj[key] === 'string') return;
      iterateKeys(obj[key])
    });
  } 

  iterateKeys(obj);
  
  console.log('--fdfd---',Object.getOwnPropertyDescriptors(copiedObj)); 
  
  return copiedObj;
}

module.exports = hardCopy;
