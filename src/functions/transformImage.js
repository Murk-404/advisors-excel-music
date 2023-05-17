import imageCompression from 'browser-image-compression';

const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		// image.setAttribute("crossOrigin", "anonymous");
		image.src = url;
	});

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  canvas.width = safeArea;
  canvas.height = safeArea;
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );
	const blob = await new Promise((resolve) => {
		canvas.toBlob((b) => resolve(b), "image/jpeg", 1);
	});
	return blob;
}

async function getImageDataAsBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

const compressImage = async (image) => {
	const sizeOptions = {
		maxSizeMB: 0.24, // maximum size of the image in MB
		maxWidthOrHeight: 512, // maximum width or height of the image
	};
	const file = await imageCompression(image, sizeOptions);
	// console.log('file size after compression: ', fileSizeInMB, ' MB')
	const imageEncoded = await getImageDataAsBase64(file)
	return imageEncoded;

}
	

const transformImage = async (imageSrc, crop) => {
  if (!crop || !imageSrc) {
    return;
  }
  const imageBlob = await getCroppedImg(imageSrc, crop);
	const compressed = await compressImage(imageBlob);
	return compressed;
};

export default transformImage;
