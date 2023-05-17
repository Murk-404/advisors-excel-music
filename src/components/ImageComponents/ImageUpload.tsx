import {useState, useRef} from 'react'
import './ImageUpload.css'
import UploadImage from '../../assets/images/UploadImage.png'
import CropperModal from './CropperModal';
// import { NewSong } from '../../types/Song';
type Props = {
  // song: NewSong,
  image: null | string,
  setImage: React.Dispatch<React.SetStateAction<null | string>>,
  // setUpdatedSong: React.Dispatch<React.SetStateAction<NewSong>>,
}

export default function ImageUpload ({
  // song,
  // setUpdatedSong,
  image,
  setImage,
}: Props) {
  const [uploadState, setUploadState] = useState("default");
  // const [image, setImage] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  

  const handleSelecting = () => {
    setUploadState("selecting");
  };

  // useEffect(() => {
  //   function handleClick(e) {
  //     if (e.target.id == 'modal') {
  //       if (playlistForm.image) {
  //         setUploadState('uploaded');
  //       } else {
  //         setUploadState('default');
  //       }
  //     }
  //   }
  //   // Add event listener when attribute value is 'cropping'
  //   if (uploadState == 'selecting') {
  //     closeRef?.addEventListener('click', handleClick);
  //   }

  //   // Remove event listener when attribute value changes
  //   return () => {
  //     closeRef?.removeEventListener('click', handleClick);
  //   };
  // }, [uploadState]);


  

  return (
    <>
      <div className="image-upload-container" data-upload={uploadState}>
        <div
          className={`playlist-cover`}
          id={image ? "uploaded" : ""}
        >{
          (image) ? <img
          src={(image) ? image : ''}
          className="album-cover"
          /> : null
        }
        </div>
        <div
          className={`image-upload`}
          onClick={() => handleSelecting()}
        >
          <img src={UploadImage} alt="upload image" className="upload-icon" />
          <div className="select-upload-type">
            <button id="ai">Generate</button>
            <button onClick={handleButtonClick}>Upload</button>
          </div>
        </div>
      </div>
      <CropperModal
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileInputRef={fileInputRef}
        image={image}
        setImage={setImage}
        setUploadState={setUploadState}
        uploadState={uploadState}
      />
    </>
  );
}


// import React from "react";
// import "./App.css";

// import Cropper from "react-easy-crop";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";

// import { generateDownload } from "./utils/cropImage";

// export default function App() {
// 	const inputRef = React.useRef();

// 	const triggerFileSelectPopup = () => inputRef.current.click();

// 	const [image, setImage] = React.useState(null);
// 	const [croppedArea, setCroppedArea] = React.useState(null);
// 	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
// 	const [zoom, setZoom] = React.useState(1);

// 	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
// 		setCroppedArea(croppedAreaPixels);
// 	};

// 	// const onSelectFile = (event) => {
// 	// 	if (event.target.files && event.target.files.length > 0) {
// 	// 		const reader = new FileReader();
// 	// 		reader.readAsDataURL(event.target.files[0]);
// 	// 		reader.addEventListener("load", () => {
// 	// 			setImage(reader.result);
// 	// 		});
// 	// 	}
// 	// };

// 	const onDownload = () => {
// 		generateDownload(image, croppedArea);
// 	};

// 	return (
// 		<div className='container'>
// 			<div className='container-cropper'>
// 				{image ? (
// 					<>
// 						<div className='cropper'>
// 							<Cropper
// 								image={image}
// 								crop={crop}
// 								zoom={zoom}
// 								aspect={1}
// 								onCropChange={setCrop}
// 								onZoomChange={setZoom}
// 								onCropComplete={onCropComplete}
// 							/>
// 						</div>

// 						<div className='slider'>
// 							<Slider
// 								min={1}
// 								max={3}
// 								step={0.1}
// 								value={zoom}
// 								onChange={(e, zoom) => setZoom(zoom)}
// 							/>
// 						</div>
// 					</>
// 				) : null}
// 			</div>

// 			<div className='container-buttons'>
// 				<input
// 					type='file'
// 					accept='image/*'
// 					ref={inputRef}
// 					onChange={onSelectFile}
// 					style={{ display: "none" }}
// 				/>
// 				<Button
// 					variant='contained'
// 					color='primary'
// 					onClick={triggerFileSelectPopup}
// 					style={{ marginRight: "10px" }}
// 				>
// 					Choose
// 				</Button>
// 				<Button variant='contained' color='secondary' onClick={onDownload}>
// 					Download
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }