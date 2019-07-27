function hardCopy(obj) {
  console.log(Object.getOwnPropertyDescriptors(obj.personalInfo)); 
  return {...obj};
}

module.exports = hardCopy;
