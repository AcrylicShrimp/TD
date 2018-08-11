
'use strict';

define(() => {
	const Mapping = {
		Repeat: 0,
		Mirror: 1,
		Edge  : 2
	};

	const Filtering = {
		Point    : 0,
		Bilinear : 1,
		Trilinear: 2
	};

	class Base {
		constructor() {
			this.gl        = null;
			this.image     = null;
			this.texture   = null;
			this.width     = 0;
			this.height    = 0;
			this.mapping   = Mapping.Edge;
			this.filtering = Filtering.Point;
			this.prepared  = false;
		}

		init(gl) {
			if (this.gl)
				return;

			this.gl      = gl;
			this.texture = this.gl.createTexture();
		}

		fin() {
			if (!this.gl)
				return;

			this.gl.deleteTexture(this.texture);

			this.gl      = null;
			this.image   = null;
			this.texture = null;
			this.width   = 0;
			this.height  = 0;
			this.prepare = false;
		}

		prepare(url, callback = null) {
			if (this.prepared)
				return;

			this.image = new Image();
			this.image.onload(() => {
				if (!this.gl)
					return;

				if (!this.image)
					return;

				this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
				this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
				this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.externalFormatAlignment());
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat(), this.externalFormat(), this.externalFormatType(), this.image);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.filtering === Filtering.Point ? this.gl.NEAREST : this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.filtering === Filtering.Point ? this.gl.NEAREST : this.filtering === Filtering.Bilinear ? this.gl.LINEAR : this.gl.LINEAR_MIPMAP_LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.mapping === Mapping.Repeat ? this.gl.REPEAT : this.mapping === Mapping.Mirror ? this.gl.MIRRORED_REPEAT : this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.mapping === Mapping.Repeat ? this.gl.REPEAT : this.mapping === Mapping.Mirror ? this.gl.MIRRORED_REPEAT : this.gl.CLAMP_TO_EDGE);

				if (this.filtering === Filtering.Trilinear)
					this.gl.generateMipmap(this.gl.TEXTURE_2D);

				this.width   = this.image.width;
				this.height  = this.image.height;
				this.prepare = true;

				if (callback)
					callback(this);
			});
			this.image.src = url;
		}

		use(slot) {
			if (!this.gl)
				return;

			this.gl.activeTexture(this.gl.TEXTURE0 + slot);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		}
	}

	class RGBA extends Base {
		internalFormat() {
			return this.gl.RGBA;
		}

		externalFormat() {
			return this.gl.RGBA;
		}

		externalFormatAlignment() {
			return 4;
		}

		externalFormatType() {
			return this.gl.UNSIGNED_BYTE;
		}
	}

	class RGB extends Base {
		internalFormat() {
			return this.gl.RGB;
		}

		externalFormat() {
			return this.gl.RGB;
		}

		externalFormatAlignment() {
			return 3;
		}

		externalFormatType() {
			return this.gl.UNSIGNED_BYTE;
		}
	}

	class Grayscale extends Base {
		internalFormat() {
			return this.gl.LUMINANCE;
		}

		externalFormat() {
			return this.gl.LUMINANCE;
		}

		externalFormatAlignment() {
			return 1;
		}

		externalFormatType() {
			return this.gl.UNSIGNED_BYTE;
		}
	}

	return {
		Mapping  : Mapping,
		Filtering: Filtering,
		Base     : Base,
		RGBA     : RGBA,
		RGB      : RGB,
		Grayscale: Grayscale
	};
});