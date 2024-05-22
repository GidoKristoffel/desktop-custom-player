const { ipcRenderer } = require('electron');
// const Icon = require("./lib/icon");
// const Button = require("./lib/button");

let data = ipcRenderer.sendSync('get-file-data');
let videoUrl = '';

if (data) videoUrl = data;

window.addEventListener('DOMContentLoaded', () => {
    const videoEl = document.getElementById('video');
    if (videoEl) videoEl.src = data;

    const icon = new Icon();
    icon.add('title-bar-icon', 'assets/images/logo.svg');

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

    button.addToggleIcon(
        'play-btn',
        'assets/images/play.svg',
        'assets/images/pause.svg',
        () => {
            const video = document.getElementById('video');
            video.play();
        },
        () => {
            const video = document.getElementById('video');
            video.pause();
        }
    );

    button.addDefaultIcon(
        'speed',
        'assets/images/speed.svg',
        'assets/images/speed.svg',
        () => {},
        () => {}
    )

    button.addDefaultIcon(
        'skip',
        'assets/images/skip.svg',
        'assets/images/skip.svg',
        () => {},
        () => {}
    )
});

class Button {
    constructor() {
        this.icon = new Icon();
    }

    addDefaultIcon(containerId, imgSrc, click) {
        this.icon.add(containerId, imgSrc);

        const iconContainer = document.getElementById(containerId);
        const icon = iconContainer.children[0];
        iconContainer.addEventListener('click', click);
    }

    addToggleIcon(containerId, defaultImgSrc, imgSrc, defaultClick, click) {
        this.icon.add(containerId, defaultImgSrc);

        const iconContainer = document.getElementById(containerId);
        const icon = iconContainer.children[0];
        iconContainer.addEventListener('click', (event) => {
            if (icon.attributes.src.value === defaultImgSrc) {
                defaultClick().then(() => this.icon.updateSrc(icon, imgSrc));
            } else {
                click().then(() => this.icon.updateSrc(icon, defaultImgSrc));
            }
        });
    }
}

class Icon {
    add(containerId, imgSrc) {
        const iconContainer = document.getElementById(containerId);
        const iconImg = document.createElement('img');
        iconImg.src = imgSrc;
        iconContainer.appendChild(iconImg);
    }

    updateSrc(icon, src) {
        icon.src = src;
    }
}