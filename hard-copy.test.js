const hardCopy = require('./hard-copy');

describe('Plain Object', () => {
  xit('should create a copied object which is a hard copied version', () => {

    const originalObj = {
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null,
      g: function() { return 'I am a function from original obj'; },
      h: [1, 2, 3] 
    };

    const copiedObj = hardCopy(originalObj);

    copiedObj.a = 1;
    copiedObj.b = false;
    copiedObj.c = true;
    copiedObj.d = 'test changed';
    copiedObj.e = 1234;
    copiedObj.f = 'not null';
    copiedObj.g = function() { return 'I am a function from copied obj'; };
    copiedObj.h = [1, 2, 3, 4];

    expect(copiedObj).toEqual({
      a: 1,
      b: false,
      c: true,
      d: 'test changed',
      e: 1234,
      f: 'not null',
      g: expect.any(Function),
      h: [1, 2, 3, 4]
    });

    expect(copiedObj.g()).toBe('I am a function from copied obj');

    expect(originalObj).toEqual({
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null, 
      g: expect.any(Function),
      h: [1, 2, 3]
    });
    
    expect(originalObj.g()).toBe('I am a function from original obj');

  });
});

describe('Nested Object', () => {
  it('should create a copied object which is a hard copied version', () => {
    
    const user = {
      id: 101,
      email: 'jack@dev.com',
      personalInfo: {
        name: 'Jack',
        isEmployed: false,
        nationality: undefined,
        address: {
          line1: 'westwish st',
          line2: 'washmasher',
          city: 'wallas',
          state: 'WX'
        }
      },
      family: {
        level1: {
          level2: {
            level3 : 1
          }
        } 
      },
      work: function() { return 'I am working in original user obj' }
    };

    const copiedUser = hardCopy(user);

    copiedUser.personalInfo.name = 'Trump';
    copiedUser.personalInfo.address.line1 = 'White House';
    copiedUser.work = function() { return 'I am working in copied user obj'};

    expect(user.personalInfo.name).toBe('Jack');
    expect(user.personalInfo.address.line1).toBe('westwish st');
    expect(copiedUser.work).toEqual(expect.any(Function));
    expect(copiedUser.work()).toBe('I am working in copied user obj');
  
  });
});