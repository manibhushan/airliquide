const find_nearest = (target, input_arr) => {
	const nearest = input_arr.reduce((prev, curr) => {
		return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
	})
	return nearest;
}

module.exports = find_nearest;

