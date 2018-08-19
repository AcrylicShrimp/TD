
'use strict';

define({
	Bezier2(from, to, p0, t) {
		const mt = 1 - t;
		return mt * mt * from + 2 * t * mt * p0 + t * t * to;
	},
	Bezier3(from, to, p0, p1, t) {
		const mt = 1 - t;
		return mt * mt * mt * from + 3 * p0 * t * mt * mt + 3 * p1 * t * t * mt + to * t * t * t;
	},
	Bezier4(from, to, p0, p1, p2, t) {
		const mt = 1 - t;
		return mt * mt * mt * mt * from + 4 * t * mt * mt * mt * p0 + 6 * t * t * mt * mt * p1 + 4 * t * t * t * mt * p2 + t * t * t * t * to;
	}
});