const hardCopy = require('./hard-copy');

describe('Plain Object', () => {
  it('should create a copied object which is a hard copied version', () => {

    const originalObj = {
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null,
      g: function() { console.log('I am a function') } 
    };

    const copiedObj = hardCopy(originalObj);

    copiedObj.a = 1;
    copiedObj.b = false;
    copiedObj.c = true;
    copiedObj.d = 'test changed';
    copiedObj.e = 1234;
    copiedObj.f = 'not null';
    copiedObj.g = function() { console.log('I am a modified function') };

    expect(copiedObj).toEqual({
      a: 1,
      b: false,
      c: true,
      d: 'test changed',
      e: 1234,
      f: 'not null',
      g: expect.any(Function)
    });

    expect(originalObj).toEqual({
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null, 
      g: expect.any(Function)
    });

  });
});

describe('Nested Object', () => {
  it('should create a copied object which is a hard copied version', () => {
    
    const user = {
      id: 101,
      email: 'jack@dev.com',
      personalInfo: {
        name: 'Jack',
        address: {
          line1: 'westwish st',
          line2: 'washmasher',
          city: 'wallas',
          state: 'WX'
        }
      }
    };

    const copiedUser = hardCopy(user);

    copiedUser.personalInfo.name = 'Trump';
    copiedUser.personalInfo.address.line1 = 'White House';

    expect(user.personalInfo.name).toBe('Jack');
    expect(user.personalInfo.address.line1).toBe('westwish st');
  
  });
});