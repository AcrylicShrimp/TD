
'use strict';

define(() => (state, cmd) => {
	state.relativeY(cmd.dy);
	state.vertexAt();
});