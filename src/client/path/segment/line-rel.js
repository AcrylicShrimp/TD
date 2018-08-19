
'use strict';

define(() => (state, cmd) => {
	state.relative(cmd.dx, cmd.dy);
	state.vertexAt();
});