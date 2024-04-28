const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
    console.log('Loading!!!');

    app.on('second-instance', (event, commandLine, workingDirectory) => {
        const videoFilePath = commandLine[2];
        console.log('Second-instance');
        event.log(videoFilePath);
        if (videoFilePath) {
            win.webContents.send('play-video', videoFilePath);
        }
    });

    app.on('open-file', (event, filePath) => {
        console.log('open-file');
        console.log('filePath: ', filePath);
        // event.preventDefault(); // Отменяем открытие файла по умолчанию
        // mainWindow.webContents.send('play-video', filePath); // Отправляем путь к видеофайлу в рендерерный процесс
    });
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
})