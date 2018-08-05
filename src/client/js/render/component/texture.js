
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
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, );

				this.width   = this.image.width;
				this.height  = this.image.height;
				this.prepare = true;
			});
			this.image.src = url;
		}
	}

	return {
		TextureRGBA: TextureRGBA,

	};
});