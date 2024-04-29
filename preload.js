const { ipcRenderer, remote } = require('electron');

process.once("loaded", () => {
    window.process = process;
});

let data = ipcRenderer.sendSync('get-file-data');
let videoUrl = '';
if (data ===  null) {
    console.log("There is no file");
} else {
    // Do something with the file.
    console.log(data);
    videoUrl = data;
}

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    const videoEl = document.getElementById('video');
    if (videoEl) videoEl.src = data;

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})