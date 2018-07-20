//
//Code from: https://electronjs.org/docs/tutorial/first-app
//


const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win

  

  function createWindow () {
    // Create the browser window
    //set the default width to 1500px, default height to 1000px and the minimum width to 1250px
    win = new BrowserWindow({width: 1500, height: 1000, minWidth: 700});

    win.setMenu(null);


    // and load the index.html of the app.
    win.loadFile('src/html/src/index.html');

    win.on('ready-to-show', () => {
        win.show();
    })
    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })

    //insert menu here if needed
  }


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
