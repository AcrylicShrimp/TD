
'use strict';

define(() => {
	class Base {
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

			if (typeof param === 'number')
				this.gl.bufferData(this.type(), (this.length = param) * this.size(), this.gl.STATIC_DRAW);
			else {
				const arr         = this.array(param);
				      this.length = arr.length;

				this.gl.bufferData(this.type(), arr, this.gl.STATIC_DRAW);
			}
		}

		use() {
			this.gl.bindBuffer(this.type(), this.buffer);
		}
	}

	class ArrayBase extends Base {
		type() {
			return this.gl.ARRAY_BUFFER;
		}
	}

	class IndexBase extends Base {
		type() {
			return this.gl.ELEMENT_ARRAY_BUFFER;
		}
	}

	class ArrayI8 extends ArrayBase {
		array(param) {
			return new Int8Array(param);
		}

		size() {
			return 1;
		}
	}

	class ArrayI16 extends ArrayBase {
		array(param) {
			return new Int16Array(param);
		}

		size() {
			return 2;
		}
	}

	class ArrayI32 extends ArrayBase {
		array(param) {
			return new Int32Array(param);
		}

		size() {
			return 4;
		}
	}

	class ArrayUI8 extends ArrayBase {
		array(param) {
			return new Uint8Array(param);
		}

		size() {
			return 1;
		}
	}

	class ArrayUI8Clamped extends ArrayBase {
		array(param) {
			return new Uint8ClampedArray(param);
		}

		size() {
			return 1;
		}
	}

	class ArrayUI16 extends ArrayBase {
		array(param) {
			return new Uint16Array(param);
		}

		size() {
			return 2;
		}
	}

	class ArrayUI32 extends ArrayBase {
		array(param) {
			return new Uint32Array(param);
		}

		size() {
			return 4;
		}
	}

	class ArrayF32 extends ArrayBase {
		array(param) {
			return new Float32Array(param);
		}

		size() {
			return 4;
		}
	}

	class ArrayF64 extends ArrayBase {
		array(param) {
			return new Float64Array(param);
		}

		size() {
			return 8;
		}
	}

	class IndexUI8 extends IndexBase {
		array(param) {
			return new Int8Array(param);
		}

		size() {
			return 1;
		}
	}

	class IndexUI16 extends IndexBase {
		array(param) {
			return new Int16Array(param);
		}

		size() {
			return 2;
		}
	}

	return {
		Base           : Base,
		ArrayBase      : ArrayBase,
		IndexBase      : IndexBase,
		ArrayI8        : ArrayI8,
		ArrayI16       : ArrayI16,
		ArrayI32       : ArrayI32,
		ArrayUI8       : ArrayUI8,
		ArrayUI8Clamped: ArrayUI8Clamped,
		ArrayUI16      : ArrayUI16,
		ArrayUI32      : ArrayUI32,
		ArrayF32       : ArrayF32,
		ArrayF64       : ArrayF64,
		IndexUI8       : IndexUI8,
		IndexUI16      : IndexUI16
	};
});