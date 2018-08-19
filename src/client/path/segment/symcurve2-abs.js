
'use strict';

define(['./curve-split'], curveSplit => (state, cmd, cmdPrev) => curveSplit.splitBezier2(state.x, state.y, cmd.x, cmd.y, 2 * cmdPrev.x - cmdPrev.x1, 2 * cmdPrev.y - cmdPrev.y1, state.quality, (x, y) => {
	state.absolute(x, y);
	state.vertexAt();
}));