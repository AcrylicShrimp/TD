
'use strict';

define(['./sub-shader'], (SubShader) => {
	class Base {
		constructor() {
			this.gl       = null;
			this.program  = null;
			this.vertex   = new SubShader.Vertex();
			this.fragment = new SubShader.Fragment();
		}

		init(gl) {
			if (this.gl)
				return;

			this.gl      = gl;
			this.program = this.gl.createProgram();

			this.vertex.init(gl);
			this.fragment.init(gl);
			this.vertex.attach(this.program);
			this.fragment.attach(this.program);
		}

		fin() {
			if (!this.gl)
				return;

			this.vertex.detach(this.program);
			this.fragment.detach(this.program);
			this.vertex.fin();
			this.fragment.fin();

			this.gl.deleteProgram(this.program);

			this.gl      = null;
			this.program = null;
		}

		link(log = false) {
			if (!this.gl)
				return null;

			this.gl.linkProgram(this.program);

			const result = {
				status: this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)
			};

			if (log)
				result.log = this.gl.getProgramInfoLog(this.program);

			return result;
		}

		validate(log) {
			if (!this.gl)
				return null;

			this.gl.validateProgram(this.program);

			const result = {
				status: this.gl.getProgramParameter(this.program, this.gl.VALIDATE_STATUS)
			};

			if (log)
				result.log = this.gl.getProgramInfoLog(this.program);

			return result;
		}
	}

	return Base;
});