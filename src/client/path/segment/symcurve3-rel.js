
'use strict';

define(['./curve-split'], curveSplit => (state, cmd, cmdPrev) => curveSplit.splitBezier3(0, 0, cmd.dx, cmd.dy, cmdPrev.dx - cmdPrev.dx2, cmdPrev.dy - cmdPrev.dy2, cmd.dx2, cmd.dy2, state.quality, (dx, dy) => {
	state.relative(dx, dy);
	state.vertexAt();
}));