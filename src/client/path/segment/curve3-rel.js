
'use strict';

define(['./curve-split'], curveSplit => (state, cmd) => curveSplit.splitBezier3(0, 0, cmd.dx, cmd.dy, cmd.dx1, cmd.dy1, cmd.dx2, cmd.dy2, state.quality, (dx, dy) => {
	state.relative(dx, dy);
	state.vertexAt();
}));