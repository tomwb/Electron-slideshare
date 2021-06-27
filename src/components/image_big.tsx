import React from 'react'

interface ImageBigProps {
  files?: string[];
  filePosition?: number;
}

const ImageBig: React.FC<ImageBigProps> = ({
  files = [],
  filePosition = 0
}) => {
  return (
    <div className="image-container-big">
      {filePosition}
      {
        files.length > filePosition &&
        <img className="img-big" src={files[filePosition]} />
      }
    </div>
  )
}

export default ImageBig
