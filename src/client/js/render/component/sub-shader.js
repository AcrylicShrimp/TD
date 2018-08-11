
'use strict';

define(() => {
	class Base {
		constructor() {
			this.gl        = null;
			this.subShader = null;
		}

		init(gl) {
			if (this.gl)
				return;

			this.gl        = gl;
			this.subShader = this.gl.createShader(this.type());
		}

		fin() {
			if (!this.gl)
				return;

			this.gl.deleteShader(this.subShader);

			this.gl        = null;
			this.subShader = null;
		}

		attach(program) {
			if (!this.gl)
				return;

			this.gl.attachShader(program, this.subShader);
		}

		detach(program) {
			if (!this.gl)
				return;

			this.gl.detachShader(program, this.subShader);
		}

		compile(src, log = false) {
			if (!this.gl)
				return null;

			this.gl.shaderSource(this.subShader, src);
			this.gl.compileShader(this.subShader);

			const result = {
				status: this.gl.getShaderParameter(this.subShader, this.gl.COMPILE_STATUS)
			};

			if (log)
				result.log = this.gl.getShaderInfoLog(this.subShader);

			return result;
		}
	}

	class Vertex extends Base {
		type() {
			return this.gl.VERTEX_SHADER;
		}
	}

	class Fragment extends Base {
		type() {
			return this.gl.FRAGMENT_SHADER;
		}
	}

	return {
		Base    : Base,
		Vertex  : Vertex,
		Fragment: Fragment
	};
});