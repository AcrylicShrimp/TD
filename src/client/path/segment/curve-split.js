
'use strict';

define(['./curve'], curve => {
	return {
		splitBezier2(fromX, fromY, toX, toY, p0X, p0Y, quality, callback) {
			const qualityInv = 1 / quality;
		
			for (let n = 1; n <= quality; ++n)
				callback(
					curve.Bezier2(fromX, toX, p0X, n * qualityInv),
					curve.Bezier2(fromY, toY, p0Y, n * qualityInv));
		},
		splitBezier3(fromX, fromY, toX, toY, p0X, p0Y, p1X, p1Y, quality, callback) {
			const qualityInv = 1 / quality;
		
			for (let n = 1; n <= quality; ++n)
				callback(
					curve.Bezier3(fromX, toX, p0X, p1X, n * qualityInv),
					curve.Bezier3(fromY, toY, p0Y, p1Y, n * qualityInv));
		},
		splitBezier4(fromX, fromY, toX, toY, p0X, p0Y, p1X, p1Y, p2X, p2Y, quality, callback) {
			const qualityInv = 1 / quality;
		
			for (let n = 1; n <= quality; ++n)
				callback(
					curve.Bezier4(fromX, toX, p0X, p1X, p2X, n * qualityInv),
					curve.Bezier4(fromY, toY, p0Y, p1Y, p2Y, n * qualityInv));
		}
	};
});