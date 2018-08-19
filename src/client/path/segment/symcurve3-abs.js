
'use strict';

define(['./curve-split'], curveSplit => (state, cmd, cmdPrev) => curveSplit.splitBezier3(state.x, state.y, cmd.x, cmd.y, 2 * cmdPrev.x - cmdPrev.x2, 2 * cmdPrev.y - cmdPrev.y2, cmd.x2, cmd.y2, state.quality, (x, y) => {
	state.absolute(x, y);
	state.vertexAt();
}));