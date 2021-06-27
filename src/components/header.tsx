import React from 'react'
import { selectFolder } from '../helper'

interface HeaderProps {
  onSelectFolder?: Function;
  onChangeStatus?: Function;
  nextImage?: Function;
  haveFiles?: boolean;
  status: string;
}

const Header: React.FC<HeaderProps> = ({
  onSelectFolder = (files: string[]) => { },
  onChangeStatus = (status: string) => { },
  nextImage = () => { },
  haveFiles = false,
  status,
}) => {
  return (
    <header>
      <button onClick={async () => {
        const files = await selectFolder.select()
        onSelectFolder(files)
      }}>Selecione uma pasta</button>
      {
        haveFiles && <>
          <button disabled={status === 'play'} className="btn-play" onClick={() => onChangeStatus('play')}>Play</button>
          <button disabled={status !== 'play'} className="btn-pause" onClick={() => onChangeStatus('pause')}>Pause</button>
          <button className="btn-stop" onClick={() => onChangeStatus('stop')}>Stop</button>
          <button disabled={status !== 'play'} className="btn-next" onClick={() => nextImage()}>Próxima</button>
        </>
      }
    </header>
  )
}

export default Header
