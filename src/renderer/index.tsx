import { ipcRenderer } from 'electron'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../styles/index.css'
import { Header, ImageList, ImageBig } from '../components'


const Root = () => {

  type StatusRole = 'play' | 'pause' | 'stop';

  const [filesInFolder, setFilesInFolder] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusRole>('stop');
  // const [timer, setTimer] = useState<number>(30000);
  const [filePosition, setFilePosition] = useState<number>(0);

  const nextImage = () => {
    console.log('filesInFolder.length')
    console.log(filesInFolder.length)
    if (filesInFolder.length > (filePosition + 1)) {
      setFilePosition(filePosition + 1)
    } else {
      setFilePosition(0)
    }
  }

  ipcRenderer.on('select-folder-file', function (evt, files) {
    if (files.data) {
      setStatus('stop')
      setFilePosition(0)
      setFilesInFolder(files.data)
    }
  });

  return (
    <main>
      <Header
        haveFiles={filesInFolder.length > 0}
        status={status}
        onSelectFolder={(files: string[]) => {
          setFilesInFolder(files)
        }}
        onChangeStatus={(newStatus: StatusRole) => {
          setStatus(newStatus)
        }}
        nextImage={nextImage} />
      {
        filesInFolder.length > 0 && status !== 'stop' &&
        <ImageBig files={filesInFolder} filePosition={filePosition} />
      }
      {
        !(filesInFolder.length > 0 && status !== 'stop') &&
        <ImageList files={filesInFolder} />
      }
    </main>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)