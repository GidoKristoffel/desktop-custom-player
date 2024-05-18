// import { Icon } from "./icon";
//
// class Button {
//     constructor() {
//         this.icon = new Icon();
//     }
//
//     addDefaultIcon(containerId, imgSrc, click) {
//         this.icon.add(containerId, imgSrc);
//
//         const iconContainer = document.getElementById(containerId);
//         const icon = iconContainer.children[0];
//         icon.addEventListener('click', click);
//     }
//
//     addToggleIcon(containerId, defaultImgSrc, imgSrc, defaultClick, click) {
//         this.icon.add(containerId, defaultImgSrc);
//
//         const iconContainer = document.getElementById(containerId);
//         const icon = iconContainer.children[0];
//         icon.addEventListener('click', (event) => {
//             if (event.target['attributes'].src.value === defaultImgSrc) {
//                 defaultClick().then(() => this.icon.updateSrc(icon, imgSrc));
//             } else {
//                 click().then(() => this.icon.updateSrc(icon, defaultImgSrc));
//             }
//         });
//     }
// }
//
// module.exports = Button;