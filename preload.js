const { ipcRenderer, remote } = require('electron');

process.once("loaded", () => {
    window.process = process;
    console.log('process: ', process);
    console.log('window: ', window);
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const videoPath = document.getElementById('video-path');
    videoPath.innerText = 'Hello';

    ipcRenderer.on('play-video', (event, filePath) => {
        const videoElement = document.getElementById('videoPlayer');
        videoElement.src = filePath;
        videoElement.play();
    });
    console.log('remote: ', remote);
})