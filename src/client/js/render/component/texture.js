
'use strict';

define(function () {
	const TextureMapping = {
		Repeat: 0,
		Mirror: 1,
		Edge  : 2
	};

	const TextureFiltering = {
		Point    : 0,
		Bilinear : 1,
		Trilinear: 2
	};

	class Texture {
		constructor() {
			this.gl        = null;
			this.image     = null;
			this.texture   = null;
			this.width     = 0;
			this.height    = 0;
			this.mapping   = TextureMapping.Edge;
			this.filtering = TextureFiltering.Point;
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

		prepare(url) {
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
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.filtering === TextureFiltering.Point ? this.gl.NEAREST : this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.filtering === TextureFiltering.Point ? this.gl.NEAREST : this.filtering === TextureFiltering.Bilinear ? this.gl.LINEAR : this.gl.LINEAR_MIPMAP_LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.mapping === TextureMapping.Repeat ? this.gl.REPEAT : this.mapping === TextureMapping.Mirror ? this.gl.MIRRORED_REPEAT : this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.mapping === TextureMapping.Repeat ? this.gl.REPEAT : this.mapping === TextureMapping.Mirror ? this.gl.MIRRORED_REPEAT : this.gl.CLAMP_TO_EDGE);

				if (this.filtering === TextureFiltering.Trilinear)
					this.gl.generateMipmap(this.gl.TEXTURE_2D);

				this.width   = this.image.width;
				this.height  = this.image.height;
				this.prepare = true;
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

	class TextureRGBA extends Texture {
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

	class TextureRGB extends Texture {
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

	class TextureGrayscale extends Texture {
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
		TextureMapping  : TextureMapping,
		TextureFiltering: TextureFiltering,
		Texture         : Texture,
		TextureRGBA     : TextureRGBA,
		TextureRGB      : TextureRGB,
		TextureGrayscale: TextureGrayscale
	};
});