
'use strict';

define(['./curve-split'], curveSplit => (state, cmd) => curveSplit.splitBezier3(state.x, state.y, cmd.x, cmd.y, cmd.x1, cmd.y1, cmd.x2, cmd.y2, state.quality, (x, y) => {
	state.absolute(x, y);
	state.vertexAt();
}));