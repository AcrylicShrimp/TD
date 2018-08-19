
'use strict';

define(() => (state, cmd) => {
	state.relativeX(cmd.dx);
	state.vertexAt();
});