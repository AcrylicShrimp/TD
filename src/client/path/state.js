
'use strict';

define(() => {
	class State {
		constructor(scale, quality) {
			this.x       = 0;
			this.y       = 0;
			this.scale   = scale || 1;
			this.quality = quality ? quality < 1 ? 1 : quality : 1;
			this.vertex = [[]];
			this.at     = this.vertex[0];
		}
		
		absolute(x, y) {
			this.x = x;
			this.y = y;
		}

		absoluteX(x) {
			this.x = x;
		}

		absoluteY(y) {
			this.y = y;
		}

		relative(dx, dy) {
			this.x += dx;
			this.y += dy;
		}

		relativeX(dx) {
			this.x += dx;
		}

		relativeY(dy) {
			this.y += dy;
		}

		vertexAt() {
			this.at.push(this.x * this.scale);
			this.at.push(-this.y * this.scale);
		}

		cut() {
			this.at = this.vertex[this.vertex.push([]) - 1];
		}
	}

	return State;
});