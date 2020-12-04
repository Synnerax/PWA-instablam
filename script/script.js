import { cameraSettings } from "./camera.js";
import { notificationPermission  } from "./notifcations.js";
import { addToLibrary } from './camera.js';

if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('sw.js')
    .then(event => {
        console.log('Service worker: registered');
    })
    .catch(error => {
        console.log('Service worker registration error: ', error.message);
    })
}



window.addEventListener('load', () => {
    if( 'mediaDevices' in navigator ) {
        cameraSettings();
    }
    notificationPermission();
    let cameraButton = document.getElementById('capture-media-btn')
    let mediaStream = document.getElementById('live-media')

    
})

addToLibrary();
/*
function addsamplePhotos() {
    let sampleContainer = document.getElementById('examples')
    let sampleImageArray = [{city: "", country: "", date: "", image: "./img/sample-image-1.png"},{city: "", country: "", date: "", image: "./img/sample-image-2.png"}];

    sampleImageArray.forEach(item => {
        console.log("this is from creating library",item.image)
        let img = document.createElement('img')
        img.setAttribute('src', item.image)
        img.setAttribute('class', 'image-feed')
        //img.addEventListener('click', (e) => {
        //    //console.log(e.toElement.src, 'same as:', imgBlob.image, '?')
        //    lightUp(imgBlob)
        //})

        sampleContainer.appendChild(img)
        console.log('Added to media section')
    } )

}

addsamplePhotos()


*/



//let button = document.getElementById('geoButton')
