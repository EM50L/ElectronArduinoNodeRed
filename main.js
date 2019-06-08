'use strict';

//Depuracion
console.log("Estamos usando" )
console.log("Node "+process.versions.node )
console.log("Chrome "+process.versions.chrome)
console.log("Electron "+process.versions.electron)
console.log("Serialport "+require('serialport/package').version)
console.log("process.argv[1]="+process.argv[1] )

// Algunas configuraciones para editarlas facilmente
const url        	 = "/ui";		// Start on the dashboard page
const urledit  	 = "/admin";	// url editor 
const listenPort = "1880"; 	//80  Puerto tcp

const os 		 = require('os');
const electron 	 = require('electron');
const app 	 = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {Menu, MenuItem, dialog} = electron;

console.log("Estas ejecutando main.js Linea22");

console.log("\nProblema con el directorio a utilizar...");
var userdir;
const path2 = require('path');
userdir = path2.resolve(process.execPath, '..');; //__dirname; 
console.log("process.execPath "+process.execPath)
console.log("__dirname:"+__dirname)
console.log("Directorio UserDir:",userdir);
console.log();

let win; // subido de linea 145 a linea 33

//_______________________________________________________________________________________________________
// Codigo de https://nodered.org/docs/embedding
console.log("cargo node-red https://nodered.org/docs/embedding");
var http 		= require('http');
var express 	= require("express");
var RED		= require("node-red");
var red_app 	= express();// Crea Express app

console.log("Estas ejecutando main.js Linea 40");

// Create a server
var server = http.createServer(red_app);

console.log("Estas ejecutando main.js Linea45");

// Add a simple route for static content served from 'public'
red_app.use("/",express.static("public"));

// Create the settings object - see default settings.js file for other options
var settings = {
    verbose: true,
    httpAdminRoot:"/admin",
    //adminAuth: {type: "credentials",users: [{username: "jejo",password: "$2a$08$T/zmFhFALnveBvdczC3ts.LEWeB9mJTDjVWqu3DdF7Xzf6Pu8MiVW",permissions: "*"},{username: "test",password: "$2a$08$VkDl5ql9uyfdbclDdE/Eh.FS.S/60qZb4n.Hyp9PIstlqtHhdG98K",permissions: "read"}]},
    httpNodeRoot: "/",
    userDir: userdir, // ver linea 24 Problema con el directorio a utilizar...
    flowFile: 'flows.json',
    functionGlobalContext: { bcryptjs:require('bcryptjs'), fs:require('fs'), path:require('path'), os:require('os') ,electron:require('electron'),win}    // enables global context
};


var fs = require('fs')
var pconf = path2.resolve(process.execPath, '../settings.js');
try{
	if (fs.existsSync(pconf)){
		console.log("\nArchivo configuracion encontrado:"+pconf+"\n\n")
		var config = require(pconf)
		console.log(config)
		console.log(config.functionGlobalContext)
		// de momento solo  adminAuth https://nodered.org/docs/security
		settings.adminAuth=config.adminAuth
		settings.credentialSecret=config.credentialSecret
		settings.editorTheme=config.editorTheme
		//no funciona: ?????? !!! al parecer una vez compilado si que funciona
		settings.functionGlobalContext=config.functionGlobalContext ; //https://nodered.org/docs/writing-functions.html#loading-additional-modules
	}else{
		console.log("\nArchivo configuracion NO encontrado:\n"+pconf+"\n\n")
	}
}catch(err){console.log(err)}

console.log("Inicializa node-red RED.init()");
RED.init(server,settings);// Inicializa runtime node-red 
console.log("Estas ejecutando main.js Linea60");

// Serve the editor UI from /red
red_app.use(settings.httpAdminRoot,RED.httpAdmin);
// Serve the http nodes UI from /api
red_app.use(settings.httpNodeRoot,RED.httpNode);

// esto se implementa de otra manera
server.listen(listenPort);

// Start the runtime
//RED.start();//problema no carga la pagina añado evento then 
RED.start().then(function() {
     console.log("\n\nServidor accesible desde: http://127.0.0.1:"+listenPort+url+"\n\n");
     win.loadURL("http://127.0.0.1:"+listenPort+url);//"/ui/");
}); 
// Fin Codigo de https://nodered.org/docs/embedding


//_______________________________________________________________________________________________________
// Crea el menu 
// Codigo https://www.christianengvall.se/electron-menu/)
function acercade(item,fWin) {
		const options = {type: 'info',message: " NodeJs      https://nodejs.org/\n ElectronJs  https://electronjs.org/\n Node-Red  https://nodered.org/ \n Jejo EM50L https://jejo.es ",buttons: ["OK"] };
		dialog.showMessageBox(fWin,options,function(){})
		}


var template = [{
	label: "Applicacion",submenu: [
		{label:'Acerca de...',click(item,fWin){acercade(item,fWin)} },
		{type:"separator"},{label:'Salir',role:'quit' }]
    },{
	label: 'Node-RED',submenu: [
		{label:'Dashboard',click(){win.loadURL("http://localhost:"+listenPort+"/ui/");}},//url);}},
		{label:'Editar Codigo',click(){win.loadURL("http://localhost:"+listenPort+urledit);}}, ]
    },{
	label:'Ver',submenu: [{
		label: 'Recargar',accelerator:'CmdOrCtrl+R',click(item,fWin){if (fWin)fWin.reload();} },{ 
		label: 'Barra Desarrollador',click(item,fWin){if(fWin)fWin.webContents.toggleDevTools();} 
		},{ type: 'separator' },{ role: 'resetzoom'},{ role: 'zoomin'},{ role: 'zoomout' 
		},{ type: 'separator' },{ role: 'togglefullscreen'},{ role: 'minimize' } ]
    }
];
const menu = Menu.buildFromTemplate(template)

// otra forma posiblemente mas modular
//var menu =new Menu()
//https://github.com/electron/electron/blob/master/docs/api/menu.md
//menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))

Menu.setApplicationMenu(menu)
console.log("Estas ejecutando main.js 118 acabo de ejecutar:Menu.setApplicationMenu(menu)");

//_______________________________________________________________________________________________________
// Codigo de https://electronjs.org/docs/tutorial/first-app   

// Mantén una referencia global del objeto window, si no lo haces, la ventana 
// se cerrará automáticamente cuando el objeto JavaScript sea eliminado por el recolector de basura.
//let win; // subido de linea 145 a linea 33

function createWindow() {
	console.log("Estas ejecutando main.js funcion createWindow() linea 133");
	//dialog.showMessageBox({ message: "Jejo EM50L :-)",buttons: ["OK"] });

	// Crea la ventana del navegador.
	win = new BrowserWindow({
		webPreferences: { nodeIntegration: false },// sin esta linea no funciona el navegador en modo admin
		title: "Node RED Em50L",//titleBarStyle: "hidden",
		width: 800, height: 600,
		icon: __dirname + "/nodered.png"
	});
	
	// y cargue el index.html de su aplicación.
	win.loadFile('index.html');

	// Abre las herramientas de desarrollo (DevTools).
	//win.webContents.openDevTools()
	
	// nuevas ventanas en cascada y mismo tamaño original
	win.webContents.on("new-window", function(e, url, frameName, disposition, options) {
		var w = win.getBounds();
		options.x = w.x+15;	options.y = w.y+15;
		options.width = w.width;options.height = w.height;
	})

	// Emitido cuando la ventana es cerrada.
	win.on('closed', function () {
		// Elimina la referencia al objeto window, normalmente  guardarías las ventanas
		// en un vector si tu aplicación soporta múltiples ventanas, este es el momento
		// en el que deberías borrar el elemento correspondiente.
		win = null;
	});
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.on('ready', createWindow);

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', function () {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    //if (process.platform !== 'darwin') {
        app.quit();//creo que con esta linea cierro el proceso en segundo plano
    //}
});

app.on('activate', function() {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (win === null) { createWindow(); win.loadURL("http://127.0.0.1:"+listenPort+url);}
});

// En este archivo puedes incluir el resto del código del proceso principal de
// tu aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.
