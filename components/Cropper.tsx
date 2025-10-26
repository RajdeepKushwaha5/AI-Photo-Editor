import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';

interface CropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop
): Promise<string> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return Promise.reject(new Error('Failed to get canvas context'));
  }

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    resolve(canvas.toDataURL('image/png'));
  });
}

export const Cropper: React.FC<CropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // Aspect ratio 1:1
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  };

  const handleApplyCrop = async () => {
    if (imgRef.current && crop?.width && crop?.height) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
        onCropComplete(croppedImageUrl);
      } catch (error) {
        console.error('Failed to crop image:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-2xl flex flex-col items-center gap-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white">Crop Image</h2>
        <div className="max-h-[60vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={1}
            >
              <img ref={imgRef} src={imageSrc} onLoad={handleImageLoad} alt="Image to crop" style={{ maxHeight: '60vh' }} />
            </ReactCrop>
        </div>
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 font-semibold text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyCrop}
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};