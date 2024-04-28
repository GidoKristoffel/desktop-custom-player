const { ipcRenderer } = require('electron');

ipcRenderer.on('open-file', (event, filePath) => {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = filePath;
});