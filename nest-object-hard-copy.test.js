const deepCopy = require('./nest-object-hard-copy.min');
// const deepCopy = require('./nest-object-hard-copy');
// const nestedHardCopy = require('./nest-object-hard-copy');
// const deepCopy = nestedHardCopy;

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

		const copiedObj = deepCopy(originalObj);

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
					return 'I am Jack\'s father and my name is Daniel.';
				}
			},
			speak: function() {
				return 'My name is Jack.';
			}
		};

		const copiedUser = deepCopy(user);

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
	
	it('should create a copied object which also keeps original object\'s prototype chain', () => {
		
		function Foo(who) {
			this.me = who;
		}

		Foo.prototype.identify = function() {
			return 'I am ' + this.me;
		}

		const user = new Foo('Jack');

		expect(user.__proto__).toEqual(Foo.prototype);
		
		const copiedUser = deepCopy(user);

		expect(copiedUser.__proto__).toEqual(Foo.prototype);
		expect(copiedUser.identify()).toEqual('I am Jack');
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
    
    const copiedArray = deepCopy(originalArray);

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

describe('Array & Object Mix', () => {
	it('should create a copied object from an object contains both array and object', () => {
		const originalObject = [
			{
				"controlType": 1,
				"customFieldId": "01d734b4-41dc-4f3c-6617-ecb4a03d28b8",
				"instructions": null,
				"isActive": true,
				"label": [
					{
						"supportedLanguageCode": "en-US",
						"value": "new label"
					},
					{
						"supportedLanguageCode": "es-MX",
						"value": "new labelaz"
					},
					{
						"supportedLanguageCode": "ja-JP",
						"value": "new labeljp"
					}
				],
				"mandatory": true,
				"selections": {
				},
				"sortOrder": 0,
				"customText": null
			},
			{
				"controlType": 0,
				"customFieldId": "648f6668-f316-5d4f-005f-60666087299c",
				"instructions": null,
				"isActive": true,
				"label": [
					{
						"supportedLanguageCode": "en-US",
						"value": "aa"
					},
					{
						"supportedLanguageCode": "es-MX",
						"value": "bbbb"
					},
					{
						"supportedLanguageCode": "ja-JP",
						"value": "cc"
					}
				],
				"mandatory": true,
				"selections": {
				},
				"sortOrder": 0,
				"customText": null
			}
		];
    
    const copiedObj = deepCopy(originalObject);

    copiedObj[0].customText = 'Changed value';
    
    expect(originalObject[0].customText).toBe(null);
	});
});

describe('Circular References', () => {
	it('should create a copied object containing circular references as [Circular]', () => {
		
		const originalObject = { 
			a: 'test',
			f: 1
		};
		originalObject.a = originalObject;
		originalObject.b = {};
		originalObject.b.c = originalObject;
		originalObject.g = originalObject.b;
    const copiedObj = deepCopy(originalObject);
    // const copiedObj = {...originalObject};
    // const copiedObj = JSON.parse(JSON.stringify(originalObject));

    expect(copiedObj.a).toBe('[Circular]');
    expect(copiedObj.b.c).toBe('[Circular]');
    expect(copiedObj.g).toBe('[Circular]');
	});
});
