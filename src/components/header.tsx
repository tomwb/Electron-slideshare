import React from 'react'
import { selectFolder } from '../helper'

interface HeaderProps {
  timer?: number;
  onSelectFolder?: Function;
  onChangeStatus?: Function;
  onChangeTimer?: Function;
  nextImage?: Function;
  haveFiles?: boolean;
  status: string;
}

const Header: React.FC<HeaderProps> = ({
  timer = 0,
  onSelectFolder = (files: string[]) => { },
  onChangeStatus = (status: string) => { },
  onChangeTimer = (status: string) => { },
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
        !haveFiles && <div className="select"><select onChange={(value) => onChangeTimer(Number(value.target.value))}>
          <option value="30">30 segundos</option>
          <option value="60">1 minuto</option>
          <option value="120">2 minutos</option>
          <option value="300">5 minutos</option>
          <option value="600">10 minutos</option>
          <option value="900">15 minutos</option>
        </select></div>
      }
      {
        haveFiles && <div className="buttons">
          <button disabled={status === 'play'} className="btn-green" onClick={() => onChangeStatus('play')}>Play</button>
          <button disabled={status !== 'play'} className="btn-green" onClick={() => onChangeStatus('pause')}>Pause</button>
          <button className="btn-next" onClick={() => nextImage()}>Próxima</button>
          <button className="btn-stop" onClick={() => onChangeStatus('stop')}>Parar</button>
        </div>
      }
      {
        haveFiles &&
        <div className="timer">
          {timer}
        </div>
      }
    </header>
  )
}

export default Header
