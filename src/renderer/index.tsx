import { ipcRenderer } from 'electron'
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import '../styles/index.css'
import { Header, ImageList, ImageBig } from '../components'
import { useInterval } from '../helper'

const Root = () => {

  type StatusRole = 'play' | 'pause' | 'stop';

  const [filesInFolder, setFilesInFolder] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusRole>('stop');
  const [filePosition, setFilePosition] = useState<number>(0);
  const [defaultTimer, setDefaultTimer] = useState<number>(30);
  const [curentTimer, setCurentTimer] = useState(defaultTimer);

  useInterval(status === 'play', () => {
    if (curentTimer <= 0) {
      nextImage();
      setCurentTimer(defaultTimer)
    } else {
      setCurentTimer(curentTimer - 1);
    }
  }, 1000);

  const nextImage = () => {
    if (filesInFolder.length > (filePosition + 1)) {
      setFilePosition(filePosition + 1)
    } else {
      setFilePosition(0)
    }
  }

  ipcRenderer.on('select-folder-file', function (evt, files) {
    if (files.data) {
      changeFolder(files.data)
    }
  });

  const changeFolder = (files: string[]) => {
    setStatus('stop')
    setFilePosition(0)
    setCurentTimer(defaultTimer)
    setFilesInFolder(files)
  }

  const changeTimer = (value: number) => {
    console.log(value)
    setStatus('stop')
    setFilePosition(0)
    setDefaultTimer(value)
    setCurentTimer(value)
  }

  return (
    <main>
      <Header
        timer={curentTimer}
        haveFiles={filesInFolder.length > 0}
        status={status}
        onSelectFolder={(files: string[]) => {
          changeFolder(files)
        }}
        onChangeStatus={(newStatus: StatusRole) => {
          setStatus(newStatus)
          if (newStatus === 'stop') {
            changeFolder([])
          }
        }}
        onChangeTimer={changeTimer}
        nextImage={() => {
          nextImage()
          setCurentTimer(defaultTimer)
        }} />
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
