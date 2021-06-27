import { remote, dialog, OpenDialogOptions } from 'electron'
import fs from 'fs'
import path from 'path'

const validExtensions = [
  '.jpg', '.png', '.gif', '.jpeg'
]

const getFiles = (folder: string): string[] => {
  return fs.readdirSync(folder).filter(file => {
    return validExtensions.includes(file.substr(file.length - 4))
  }).map(file => {
    return path.join(folder, file)
  })
}

const select = async (isMenu = false): Promise<string[]> => {
  const options: OpenDialogOptions = {
    properties: ['openDirectory']
  }
  let result
  if (isMenu) {
    result = await dialog.showOpenDialog(options)
  } else {
    result = await remote.dialog.showOpenDialog(options)
  }
  if (result && result.filePaths.length === 1) {
    return getFiles(result.filePaths[0]);
  }
  return []
}

export default {
  getFiles,
  select
}
