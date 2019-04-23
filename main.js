'use strict';

console.log()
console.log("Estamos usando node "+process.versions.node )
console.log("Chrome "+process.versions.chrome)
console.log("y Electron "+process.versions.electron)
console.log("Serialport "+require('serialport/package').version)
console.log("process.argv[1]="+process.argv[1] )

console.log(process.execPath)
const path2 = require('path');
const nodejejo = path2.resolve(process.execPath, '..');
console.log("nodejejo:"+nodejejo)
console.log("__dirname:"+__dirname)
console.log("Estas ejecutando main.js Linea15");

// Some settings you can edit easily
// Flows file name
const flowfile = 'flows.json';
// Start on the dashboard page
const url = "/admin";
// url for the editor page
const urledit = "/admin";
// tcp port to use
//const listenPort = "80"; // fix it just because
const listenPort = "1880"; // fix it just because
//const listenPort = parseInt(Math.random()*16383+49152) // or random ephemeral port

console.log("Estas ejecutando main.js Linea29");

const os = require('os');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const dialog = require('electron')
const {Menu, MenuItem, dialog} = electron;

// this should be placed at top of main.js to handle squirrel setup events quickly
if (handleSquirrelEvent()) { return; }

console.log("Estas ejecutando main.js Linea40");

var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var red_app = express();


console.log("Estas ejecutando main.js Linea37");

// Add a simple route for static content served from 'public'
//red_app.use("/",express.static("public"));

// Create a server
var server = http.createServer(red_app);

console.log("Estas ejecutando main.js Linea45");

var userdir;
userdir = __dirname;
//var path3 = require('path');
//userdir  = path3.resolve(process.execPath, '..');
userdir = nodejejo;
console.log("Directorio UserDir:",userdir);

// Create the settings object - see default settings.js file for other options
var settings = {
    verbose: true,
    httpAdminRoot:"/admin",
    httpNodeRoot: "/",
    userDir: userdir,
    flowFile: flowfile,
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

console.log("Estas ejecutando main.js Linea78");

// Serve the editor UI from /red
red_app.use(settings.httpAdminRoot,RED.httpAdmin);

console.log("Estas ejecutando main.js Linea83");

// Serve the http nodes UI from /api
red_app.use(settings.httpNodeRoot,RED.httpNode);

console.log("Estas ejecutando main.js Linea88");

// Create the Application's main menu (https://www.christianengvall.se/electron-menu/)
//var localtunnel = require('localtunnel');
var template = [{
    label: "Applicacion",submenu: [{label:'Acerca de...',role:'about'},{type:"separator"},{label:'Salir',role:'quit' }]
    },{
    label: 'Node-RED',submenu: [
        {label:'Dashboard',click(){mainWindow.loadURL("http://localhost:"+listenPort+"/ui/");}},//url);}},
        {label:'Editar Codigo',click(){mainWindow.loadURL("http://localhost:"+listenPort+urledit);}},
	/*{label:'Localtunnel on',click(){
		var localtunnel = require('localtunnel');
		var tunnel = localtunnel(listenPort,function(err, tunnel){
				if (err) {console.log(err)}
				console.log(tunnel.url)
				dialog.showMessageBox({message:"Servidor accesible desde:"+tunnel.url+"/ui/",buttons: ["OK"] })
			});
			tunnel.on('close', function(){console.log("tunnel cerrado")});
			tunnel.on('request', function(info){console.log(info)});
			tunnel.on('error', function(error){console.log(error)});
		}},
	{label:'Localtunnel off ',click(){tunnel.close()}}/* */
	
    ]},{
    label:'Ver',submenu: [
        { label: 'Recargar',accelerator:'CmdOrCtrl+R',
            click(item,focusedWindow){if (focusedWindow)focusedWindow.reload();}
        },
        { label: 'Barra Desarrollador',
            click(item, focusedWindow){if(focusedWindow)focusedWindow.webContents.toggleDevTools(); }
        },
        { type: 'separator' },{ role: 'resetzoom' },{ role: 'zoomin' },{ role: 'zoomout' },
        { type: 'separator' },{ role: 'togglefullscreen' },{ role: 'minimize' }
	
    ]}/*,{
	label:'Acerca de...',
	click: function (item, focusedWindow) {dialog.showMessageBox({ message: "Jejo EM50L :-)",buttons: ["OK"] })}
	}
    /*,{
	label:'Acerca de...',
	click: function (item, focusedWindow) {
		if (focusedWindow) {
			const options = {
			type: 'info',title: 'Acerca de...',buttons: ['Ok'],
			message: 'Demo de Electronjs + node-red + Arduino firmData por EM50L.'
			}
			console.log(require.resolve('dialog'))
			dialog.showMessageBox(focusedWindow,options,function(){})
		}}
	}/* */
];
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
console.log("Estas ejecutando main.js acabo de ejecutar:Menu.setApplicationMenu(menu)");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	console.log("Estas ejecutando main.js funcion createWindow linea 133");
	//dialog.showMessageBox({ message: "Jejo EM50L :-)",buttons: ["OK"] });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        //autoHideMenuBar: true,
	autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: false // sin esta linea no funciona el navegador en modo admin
	    //nodeIntegration: true
        },
        title: "Node-RED-Jejo",
        fullscreenable: true,
        titleBarStyle: "hidden",
        width: 1024,
        height: 768,
        icon: __dirname + "/nodered.png"
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
    
    var webContents = mainWindow.webContents;
    webContents.on('did-get-response-details', function(event, status, newURL, originalURL, httpResponseCode) {
        if ((httpResponseCode == 404) && (newURL == ("http://localhost:"+listenPort+url))) {
            setTimeout(webContents.reload, 200);
        }
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("new-window", function(e, url, frameName, disposition, options) {
        // if a child window opens... modify any other options such as width/height, etc
        // in this case make the child overlap the parent exactly...
        var w = mainWindow.getBounds();
        options.x = w.x;
        options.y = w.y;
        options.width = w.width;
        options.height = w.height;
        //re-use the same child name so all "2nd" windows use the same one.
        //frameName = "child";
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// Called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    //if (process.platform !== 'darwin') {
        app.quit();//creo que con esta linea cierro el proceso en segundo plano
    //}
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
        mainWindow.loadURL("http://127.0.0.1:"+listenPort+url);
    }
});

// Start the Node-RED runtime, then load the inital page
RED.start().then(function() {
     console.log("Estas ejecutando main.js funcion RED.start().then(... linea 252");
    //server.listen(listenPort,"127.0.0.1",function() {
    server.listen(listenPort,"0.0.0.0",function() {// 0.0.0.0 para que escuche en todos los interfaces
	console.log("Estas ejecutando main.js funcion Rserver.listen(,,function() {... linea 255");
	console.log("Servidor accesible desde: http://127.0.0.1:"+listenPort+"/ui/");
        //mainWindow.loadURL("http://127.0.0.1:"+listenPort+url);
        mainWindow.loadURL("http://127.0.0.1:"+listenPort+"/ui/");
    });
});

///////////////////////////////////////////////////////
// All this Squirrel stuff is for the Windows installer
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};
