const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

const ipcMain = require('electron').ipcMain;

let win
let child

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })

  win.maximize();
  // and load the index.html of the app.
  win.loadFile('public/view/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  child = new BrowserWindow({
    parent: win,
    width: 800,
    height: 600,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  child.loadFile('public/view/login.html')
  child.setMenu(login_menu)
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Set Up Application  menu
const tamplate = [
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [{
        role: 'minimize'
      },
      {
        role: 'zoom'
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(tamplate)

Menu.setApplicationMenu(menu)

// Set-up login page menu
const login_menu = Menu.buildFromTemplate([{
  label: 'Menu',
  submenu: [{
    label: 'Exit',
    click() {
      app.quit();
    }
  }]
}])

// index.html after login
ipcMain.on('entry-accepted', (event, arg) => {
  if (arg == 'ping') {
    win.show()
    child.hide()
  } else if (arg == 'logout') {
    createWindow();
  }
})
