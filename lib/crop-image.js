"use strict";

var loadImage = function loadImage(src, done) {
	var image = new Image();

	image.onload = function () {
		done(image);
	};

	image.src = src.src || src;
};

// Takes a source image (object or src) and returns a cropped version

var cropImage = module.exports = function (sourceImage, sourceRect, size, scale, done) {
	loadImage(sourceImage, function (sourceImage) {

		var canvas = document.createElement("canvas");
		canvas.width = size[0] * scale;
		canvas.height = size[1] * scale;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(sourceImage, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, 0, 0, size[0] * scale, size[1] * scale);

		done(canvas.toDataURL("image/jpg", 0.9));
	});
};