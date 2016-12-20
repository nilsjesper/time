const electron = require('electron');
// const static = require('node-static');


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  // create the browser window
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // const file = new static.Server('../dist/index.html');

  // require('http').createServer(function (request, response) {
  //     request.addListener('end', function () {
  //         file.serve(request, response);
  //     }).resume();
  // }).listen(8091);

  // render index.html which will contain our root Vue component
  // mainWindow.loadURL('file://' + __dirname + '/../dist/index.html');

  mainWindow.loadURL('http://localhost:8091');

  // dereference the mainWindow object when the window is closed
  mainWindow.on('closed', function() {
      mainWindow = null;
  });
}

// call the createWindow() method when Electron has finished initializing
app.on('ready', createWindow);

// when all windows are closed, quit the application on Windows/Linux
app.on('window-all-closed', function () {
  // only quit the application on OS X if the user hits cmd + q
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', function () {
  // re-create the mainWindow if the dock icon is clicked in OS X and no other
  // windows were open
  if (mainWindow === null) {
      createWindow();
  }
});
