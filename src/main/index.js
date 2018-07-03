import { app, BrowserWindow } from 'electron'
import path from 'path'
import { format as formatURL } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 1200,
    height: 540,
    titleBarStyle: 'hidden'
  })
  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(formatURL({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
})

