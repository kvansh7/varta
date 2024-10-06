import React from 'react';

const ImageConversion = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Image Conversion</h2>
      <p className="text-lg text-center mb-4">
        Upload an image and convert it into various formats. You can also extract text from images.
      </p>
      {/* Add image upload and conversion functionality here */}
      <div className="text-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageConversion;
