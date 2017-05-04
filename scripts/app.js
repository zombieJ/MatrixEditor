/**
 * Created by jiljiang on 2016/10/12.
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		center: true,
		minWidth: 800,
		minWidth: 600
	});

	//mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.loadURL(`http://localhost:1128/`);

	mainWindow.webContents.openDevTools();
	mainWindow.maximize();

	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	BrowserWindow.addDevToolsExtension(`./extensions/reactDevTool/0.15.0_0`);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
