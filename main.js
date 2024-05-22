const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        icon: 'assets/images/logo.png',
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js')
        }
    });

    // win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    watchGetFileData();
    watchQuitApp();
    watchCollapseWindow(win);
    watchMaximizeWindow(win);
    watchRestoreWindow(win);

    win.loadFile('index.html').then();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

function watchGetFileData() {
    ipcMain.on('get-file-data', function(event) {
        let data = null;
        if (process.platform == 'win32' && process.argv.length >= 2) {
            let openFilePath = process.argv[1];
            data = openFilePath;
        }
        event.returnValue = data;
    });
}

function watchQuitApp() {
    ipcMain.handle('quit-app', () => {
        app.quit();
    });
}

function watchCollapseWindow(window) {
    ipcMain.handle('collapse-app', () => {
        window.minimize();
    });
}

function watchMaximizeWindow(window) {
    ipcMain.handle('maximize-window', () => {
        window.maximize();
    });
}

function watchRestoreWindow(window) {
    ipcMain.handle('restore-window', () => {
        window.restore();
    });
}