const hardCopy = require('./hard-copy');

describe('Plain Object', () => {
  test('should create a copied object which is a hard copied version', () => {

    const originalObj = {
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null 
    };

    const copiedObj = hardCopy(originalObj);

    copiedObj.a = 1;
    copiedObj.b = false;
    copiedObj.c = true;
    copiedObj.d = 'test changed';
    copiedObj.e = 1234;
    copiedObj.f = 'not null';
    expect(copiedObj).toEqual({
      a: 1,
      b: false,
      c: true,
      d: 'test changed',
      e: 1234,
      f: 'not null',
    });
    expect(originalObj).toEqual({
      a: undefined,
      b: true,
      c: false,
      d: 'test',
      e: 123,
      f: null 
    });
  });
});