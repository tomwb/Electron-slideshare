import { remote, dialog, OpenDialogOptions } from 'electron'
import fs from 'fs'
import path from 'path'

const validExtensions = [
  '.jpg', '.png', '.gif', '.jpeg'
]

const getFiles = (folder: string): string[] => {
  const files = fs.readdirSync(folder).filter(file => {
    return validExtensions.includes(file.substr(file.length - 4))
  }).map(file => {
    return path.join(folder, file)
  })

  return shuffleArray(files)
}

const shuffleArray = (array: string[]): string[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
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
