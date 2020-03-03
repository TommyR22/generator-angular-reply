const imagemin = require('imagemin');
const JPEGImages = 'src/assets/images/*.{jpg,png}';
const output = 'src/assets/images/optimized';
const output_webp = 'src/assets/images/webp';
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');


(async () => {
  const files = await imagemin(['src/assets/images/*.{jpg,png}'], {
    destination: output,
    plugins: [
      imageminMozjpeg({
        quality: 70,
      }),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });
  // console.log(files);
  const files_png_to_webp = await imagemin(['src/assets/images/*.{png}'], {
    destination: output_webp,
    plugins: [
      imageminWebp({
        quality: 85,
      })
    ]
  });

  const files_jpg_to_webp = await imagemin(['src/assets/images/*.{jpg}'], {
    destination: output_webp,
    plugins: [
      imageminWebp({
        quality: 75,
      })
    ]
  });

})();
