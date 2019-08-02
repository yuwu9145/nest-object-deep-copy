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
			g: function() {
				return 'I am a function from original obj';
			},
			h: [1, 2, 3]
		};

		const copiedObj = hardCopy(originalObj);

		copiedObj.a = 1;
		copiedObj.b = false;
		copiedObj.c = true;
		copiedObj.d = 'test changed';
		copiedObj.e = 1234;
		copiedObj.f = 'not null';
		copiedObj.g = function() {
			return 'I am a function from copied obj';
		};
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
			father: {
				id: 102,
				email: 'daniel@dev.com',
				personalInfo: {
					name: 'Daniel',
					isEmployed: true,
					nationality: 'Australia',
					address: {
						line1: 'westwish loop',
						line2: '',
						city: 'Melbourne',
						state: 'VIC'
					}
				},
				speak: function() {
					return "I am Jack's father and my name is Daniel.";
				}
			},
			speak: function() {
				return 'My name is Jack.';
			}
		};

		const copiedUser = hardCopy(user);

		copiedUser.personalInfo.name = 'Trump';
		copiedUser.personalInfo.address.line1 = 'White House';
		copiedUser.speak = function() {
			return 'My name is Trump but I am a copied version based on Jack';
		};

		copiedUser.father.personalInfo.name = 'Tom';
		copiedUser.father.speak = function() {
			return 'My name is Tom but I am a copied version based on Daniel';
		};
		// Test properties
		expect(user.personalInfo.name).toBe('Jack');
		expect(user.personalInfo.address.line1).toBe('westwish st');

		// Test Functions
		expect(copiedUser.speak).toEqual(expect.any(Function));
		expect(copiedUser.speak()).toBe(
			'My name is Trump but I am a copied version based on Jack'
		);
		expect(copiedUser.father.speak()).toBe(
			'My name is Tom but I am a copied version based on Daniel'
		);
		expect(user.speak()).toBe('My name is Jack.');
	});
});

describe('Array', () => {
	it('should create a copied array which is a hard copied version', () => {
		const originalArray = [
			{
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
				speak: function() {
					return 'My name is Jack.';
				}
      },
      {
				id: 102,
				email: 'daniel@dev.com',
				personalInfo: {
					name: 'Daniel',
					isEmployed: true,
					nationality: 'Australia',
					address: {
						line1: 'westwish loop',
						line2: '',
						city: 'Melbourne',
						state: 'VIC'
					}
				},
				speak: function() {
					return "I am Jack's father and my name is Daniel.";
        }
      }
    ];
    
    const copiedArray = hardCopy(originalArray);

    // Change first element values in copied Array
    copiedArray[0].personalInfo.name = 'Trump';
		copiedArray[0].personalInfo.address.line1 = 'White House';
		copiedArray[0].speak = function() {
			return 'My name is Trump but I am a copied version based on Jack';
    };
    
    expect(originalArray[0].personalInfo.name).toBe('Jack');
		expect(originalArray[0].personalInfo.address.line1).toBe('westwish st');
		expect(originalArray[0].speak()).toBe('My name is Jack.');
  });
});
