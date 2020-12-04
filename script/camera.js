import { sendNotication  } from "./notifcations.js";
import { addGeoLocation  } from "./geo-location.js";
import { lightUp } from "./lightbox.js";

const errorMessage = document.querySelector('.video > .error');
const startButton = document.querySelector('.menu .start-stream');
const stopButton = document.querySelector('.menu .stop-stream');
const photoButton = document.getElementById('capture-button');
const profilePic = document.querySelector('.media-library-roll > img');
const cameraRoll = document.getElementById('libarary-roll')
const mediaSection = document.getElementById('media-library')
const mediaPhotoSec = document.getElementById('photo-grid')
const mediaLibButton = document.getElementById('media-library-button')
//const startRecording = document.querySelector('.video .start-recording');
//const stopRecording = document.querySelector('.video .stop-recording');
const downloadLink = document.querySelector('.downloadLink');
const liveVideo = document.getElementById('video-stream');
const header = document.querySelector('header')
const welcomeContainer = document.querySelector('.welcome-container')
let tempRollCam = [{city: "Example photo", country: "no data", date: "Example photo, no data", image: "./img/sample-image-1.png"},{city: "Example photo", country: "no data", date: "Example photo, no data", image: "./img/sample-image-2.png"}];
let mediaLibrary = [];


let cameraToggle = false;
let libraryToggle = false;

let stream;

export function cameraSettings() {


    // .profile > p > button  --> 012, omständigt men mer specifikt
    // .profile       button  --> 011, enklare

    startButton.addEventListener('click', async () => {
        welcomeContainer.setAttribute('display', 'none')
        welcomeContainer.classList.add('hidden')
        errorMessage.innerHTML = '';
        try {
            const md = navigator.mediaDevices;
            stream = await md.getUserMedia({
                video: true //: { width: 420, height: 420 }
            })

            const video = document.querySelector('.video > video');
            mediaSection.classList.add('hidden')
            //mediaSection.classList.remove('photo-wrapper')
            mediaSection.classList.remove('photo-wrapper')
            video.classList.remove('hidden')
            video.srcObject = stream;
            //stopButton.disabled = false;
            photoButton.disabled = false;
            startButton.disabled = true;
            document.querySelector('.photo-button-wrapper').setAttribute("style", "display: flex" )
            document.querySelectorAll('.start-stream .transfom-icon').forEach(item => item.classList.add('icon-color'));

            
            
            cameraToggle = true;

            if(libraryToggle === true) {
                document.querySelectorAll('#media-library-button .transfom-icon').forEach(item => item.classList.remove('icon-color'));
                libraryToggle = !libraryToggle;
                console.log('library toggle:', libraryToggle)
            }
            
            

            //startButton.classList.toggle('hidden');
            //stopButton.classList.toggle('hidden');
            header.classList.add('hidden')
            cameraRoll.classList.remove('hidden')


        } catch (e) {
            // Visa felmeddelande för användaren:
            console.error(e)
            errorMessage.innerHTML = 'Could not show camera window.';
        }
    })

    /*
    stopButton.addEventListener('click', () => {
        errorMessage.innerHTML = '';
        if( !stream ) {
            errorMessage.innerHTML = 'No video to stop.';
            return;
        }
        // hur stoppa strömmen? Kolla dokumentationen
        stopStream();

    })
    */
    photoButton.addEventListener('click', async () => {
        errorMessage.innerHTML = '';
        
        if( !stream ) {
            errorMessage.innerHTML = 'No video to take photo from.';
            return;
        }

        let tracks = stream.getTracks();
        let videoTrack = tracks[0];
        let capture = new ImageCapture(videoTrack);
        let blob = await capture.takePhoto();

        let imgUrl = URL.createObjectURL(blob);
        //downloadLink.href = imgUrl;
        //downloadLink.classList.remove('hidden')
        //downloadLink.download = 'selfie.png';
        //profilePic.src = imgUrl;
        //profilePic.classList.remove('hidden')
        console.log('Sending:', imgUrl, 'to AddtoRoll function');
        addToRoll(imgUrl);
    })
    mediaLibButton.addEventListener('click', () => {
    mediaLibButton.disabled = true;
    welcomeContainer.setAttribute('display', 'none');
    welcomeContainer.classList.add('hidden');
    libraryToggle = true;
    if(cameraToggle === true) {
        cameraToggle = !cameraToggle;
        document.querySelectorAll('.start-stream .transfom-icon').forEach(item => item.classList.remove('icon-color'));
        
        stopStream();
    }
    mediaSection.classList.remove('hidden');
    mediaSection.classList.add('photo-wrapper');
    cameraRoll.classList.add('hidden');
    document.querySelectorAll('#media-library-button .transfom-icon').forEach(item => item.classList.add('icon-color'));
    })
    
}



function addToRoll(imgUrl) {
    console.log('at addToRoll function with', imgUrl)
    let img = document.createElement('img')
    img.setAttribute('src', imgUrl)
    
    cameraRoll.prepend(img)
    addGeoLocation(imgUrl);
    //console.log('this is in AddToRoll', saveLocation)
    console.log('Added to camera roll')
}



function updateCameraRoll() {
    cameraRoll.innerHTML = '';
    tempRollCam.forEach(libraryArray => {
        
        let img = document.createElement('img')
        img.setAttribute('src', libraryArray.image)
        cameraRoll.prepend(img)

    })
}
export function addToLibrary() {
    console.log('at addToLibrary function with', tempRollCam)
    mediaSection.innerHTML = "";

    tempRollCam.forEach(imgBlob => {
        console.log("this is from creating library",imgBlob.image)
        let img = document.createElement('img')
        img.setAttribute('src', imgBlob.image)
        img.setAttribute('class', 'image-feed')
        img.addEventListener('click', (e) => {
            //console.log(e.toElement.src, 'same as:', imgBlob.image, '?')
            lightUp(imgBlob)
        })

        mediaSection.appendChild(img)
        console.log('Added to media section')
    } )
}
function stopStream() {

    //stopButton.disabled = true;
    photoButton.disabled = true;
    startButton.disabled = false;
    document.querySelector('.photo-button-wrapper').setAttribute("style", "display: none" )
    liveVideo.classList.toggle('hidden')
    //stopButton.classList.toggle('hidden')
    //startButton.classList.toggle('hidden')
    header.classList.toggle('hidden')

    if(!stream) {
        return
    }
    let tracks = stream.getTracks();
        
    tracks.forEach(track => track.stop());
    
    
}
/*
let mediaRecorder;
startRecording.addEventListener('click', async () => {
    if( !stream ) {
        errorMessage.innerHTML = 'No video available';
        return;
    }
    startRecording.disabled = true;
    stopRecording.disabled = false;
    mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.addEventListener('dataavailable', event => {
        console.log('mediaRecorder.dataavailable: ', event);
        const blob = event.data;
        if( blob.size > 0 ) {
            chunks.push(blob);
        }
    });
    mediaRecorder.addEventListener('stop', event => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob)
        downloadLink.href = url;
        downloadLink.classList.remove('hidden')
        downloadLink.download = 'redoing.webm';
    })
    mediaRecorder.start();
})
stopRecording.addEventListener('click', async () => {
    if( mediaRecorder ) {
        stopRecording.disabled = true;
        startRecording.disabled = false;
        mediaRecorder.stop();
        mediaRecorder = null;
    } else {
        errorMessage.innerHTML = 'No recording to stop.';
    }
})
*/

export function sendNearLocation(date, city, country, img) {
    tempRollCam.push({"date": date, "city": city, "country": country, "image": img})
    console.log("this is from sendNearLoc",tempRollCam)
    addToLibrary()
    sendNotication(img, date);


}

export function sendGeoLocation(date, lat, lng, img) {
    //tempRollCam.push(imgUrl)
    tempRollCam.push({"date": date, "city": lat, "country": lng, "image": img})
    console.log("this is from sendGeo",tempRollCam)
    addToLibrary()
    sendNotication(img, date);

}

export function removePhoto(img) {
    //var results = tempRollCam.filter(function (entry) { return entry.image === img.image; }).remove;
    let photo = tempRollCam.indexOf(img)
    console.log('this is the photo array before removed photo:', tempRollCam )
    tempRollCam.splice(photo, 1)
    console.log('---------------------');
    console.log('this is the photo array after: ', tempRollCam)
    addToLibrary();
    updateCameraRoll();
}