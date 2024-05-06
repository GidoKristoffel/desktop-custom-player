const { ipcRenderer } = require('electron');
const Icon = require("./lib/icon");
const Button = require("./lib/button");

let data = ipcRenderer.sendSync('get-file-data');
let videoUrl = '';

if (data) videoUrl = data;

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.getElementById('video');
    if (videoEl) videoEl.src = data;

    const icon = new Icon();
    icon.add('title-bar-icon', 'assets/images/icon.png');

    const button = new Button();
    button.addDefaultIcon(
        'title-bar-collapse',
        'assets/images/collapse.svg',
        () => ipcRenderer.invoke('collapse-app').then()
    );
    button.addToggleIcon(
        'title-bar-minimize',
        'assets/images/maximize.svg',
        'assets/images/minimize.svg',
        () => ipcRenderer.invoke('maximize-window').then(),
        () => ipcRenderer.invoke('restore-window').then()
    );
    button.addDefaultIcon(
        'title-bar-close',
        'assets/images/close.svg',
        () => ipcRenderer.invoke('quit-app').then()
    );
});