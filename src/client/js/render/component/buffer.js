
'use strict';

define(function () {
	class Buffer {
		constructor() {
			this.gl     = null;
			this.buffer = null;
			this.length = 0;
		}

		init(gl) {
			if (this.gl)
				return;

			this.gl     = gl;
			this.buffer = this.gl.createBuffer();
		}

		fin() {
			if (!this.gl)
				return;

			this.gl.deleteBuffer(this.buffer);

			this.gl     = null;
			this.buffer = null;
			this.length = 0;
		}

		fill(param) {
			if (!this.gl)
				return;

			this.gl.bindBuffer(this.type(), this.buffer);
			this.gl.bufferData(this.type(), (typeof param === 'number') ? param : this.array(param), this.gl.STATIC_DRAW);
		}

		use() {
			this.gl.bindBuffer(this.type(), this.buffer);
		}
	}

	class ArrayBuffer extends Buffer {
		type() {
			return this.gl.ARRAY_BUFFER;
		}
	}

	class IndexBuffer extends Buffer {
		type() {
			return this.gl.ELEMENT_ARRAY_BUFFER;
		}
	}

	class ArrayI8 extends ArrayBuffer {
		array(param) {
			return new Int8Array(param);
		}
	}

	class IndexUI8 extends IndexBuffer {
		array(param) {
			return new Int8Array(param);
		}
	}


});