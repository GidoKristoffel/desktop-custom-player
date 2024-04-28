import { ipcRenderer } from './node_modules/electron/index.js';

document.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('play-video', (event, filePath) => {
        const videoElement = document.getElementById('videoPlayer');
        videoElement.src = filePath;
        videoElement.play();
    });
});
