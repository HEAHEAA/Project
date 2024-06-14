import {app, shell, BrowserWindow} from 'electron'
import {join} from 'path'
import {electronApp, optimizer, is} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const cp = require('child_process');


const {spawn} = require('child_process')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {icon} : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })




  //
  //
  // const onlyOne = app.requestSingleInstanceLock();
  //
  // if (!onlyOne) {
  //   app.quit();
  //   app.exit();
  // } else {
  //   app.on('second-instance', () => {
  //     if (mainWindow) {
  //       if (mainWindow.isMinimized() || !mainWindow.isVisible()) {
  //         mainWindow.show();
  //       }
  //       mainWindow.focus();
  //     }
  //   });
  //
  //   mainWindow.on("close", e => {
  //     if (mainWindow.isVisible()) {
  //       mainWindow.hide();
  //       e.preventDefault();
  //
  //     }
  //   });
  //
  //   // mainWindow.webContents.openDevTools()
  //   mainWindow.loadFile('index.html')
  // }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})










