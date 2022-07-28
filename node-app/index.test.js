const find_nearest = require('./index');

describe('testing nearest element', () =>{
	test('unique array', () => {
		const target = 10;
		const input_arr = [1, 8, 11, 15];
		const expected = 11;
		expect(find_nearest(target, input_arr)).toBe(expected);
	});

	test('array with duplicates', () => {
		const target = 9;
		const input_arr = [1, 8, 11, 15, 11, 12, 8];
		const expected = 8;
		expect(find_nearest(target, input_arr)).toBe(expected);
	});

	test('array with two nearest', () => {
		const target = 13;
		const input_arr = [1, 8, 11, 15, 11, 12, 9, 9, 12, 14];
		const expected = 12;
		expect(find_nearest(target, input_arr)).toBe(expected);
	});
});

