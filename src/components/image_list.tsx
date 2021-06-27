import React from 'react'

interface ImageListProps {
  files?: string[];
}

const ImageList: React.FC<ImageListProps> = ({
  files = []
}) => {

  return (
    <div className="image-list">
      {files.map((file, index) => {
        return (
          <div className="img-thumbnail" key={index}>
            <div style={{ backgroundImage: `url('${file}')` }}></div>
          </div>
        )
      })}
    </div>
  )
}

export default ImageList
