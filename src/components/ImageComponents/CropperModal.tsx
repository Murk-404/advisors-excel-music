// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import generateDownload from "../../functions/transformImage";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cropper from "react-easy-crop";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useMountTransition from "../../functions/useMountTransition";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import loadImage from "blueimp-load-image";

import React from "react";
import "./CropperModal.css";
import { NewSong } from "../../types/Song";

type Props = {
  fileInputRef: HTMLInputElement | undefined,
  uploadState: string,
  setUploadState: React.Dispatch<React.SetStateAction<string>>,
  // song: NewSong,
  image: null | string,
  setImage: React.Dispatch<React.SetStateAction<null | string>>,
}

export default function CropperModal({
  fileInputRef,
  uploadState,
  setUploadState,
  image,
  // song,
  setImage,
  // setSong,
}: Props) {
  const hasTransitionedIn = useMountTransition(uploadState == "cropping", 250);
  // const [localImage, setLocalImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onDownload = async () => {
    console.log("cropped area: ", croppedArea);
    const croppedImage = await generateDownload(image, croppedArea);
    console.log("cropped image: ", croppedImage)
    const fileSizeInMB = croppedImage.length / 1024 / 1024;
    console.log("file size: ", fileSizeInMB);
    setImage(croppedImage);
    setUploadState("uploaded");
  };
  // const onCancel = () => {
  //   setSong({
  //     ...song,
  //     image: "",
  //   });
  //   setUploadState("default");
  // };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    loadImage(
      file,
      (canvas: any) => {
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImage(dataUrl);
        setUploadState("cropping");
      },
      { orientation: true, canvas: true, maxWidth: 1200, maxHeight: 1200 }
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {(hasTransitionedIn || uploadState == "cropping") && (
        <div
          className={`cropper-view ${hasTransitionedIn && "in"} ${
            uploadState == "cropping" && "visible"
          }`}
        >
          <div className={"submit-row"}>
            {/* <button id="cancel" onClick={onCancel}>
              Cancel
            </button> */}
            {/* <span>Upload Cover</span> */}
            <button id="submit" onClick={onDownload}>
              Choose
            </button>
          </div>
          <div className="cropper-container">
            <Cropper
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              id="cropping"
              className="cropper"
            />
          </div>
        </div>
      )}
    </>
  );
}
