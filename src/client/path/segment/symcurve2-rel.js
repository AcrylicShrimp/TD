
'use strict';

define(['./curve-split'], curveSplit => (state, cmd, cmdPrev) => curveSplit.splitBezier2(0, 0, cmd.dx, cmd.dy, cmdPrev.dx - cmdPrev.dx1, cmdPrev.dy - cmdPrev.dy1, state.quality, (dx, dy) => {
	state.relative(dx, dy);
	state.vertexAt();
}));