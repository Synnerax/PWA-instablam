import { removePhoto  } from "./camera.js";


let lightbox = document.querySelector('.lightbox');
let location = document.querySelector('.lightbox-content  .location');
let date = document.querySelector('.lightbox-content  .date');
const downloadLink = document.querySelector('.downloadLink');
const removeButton = document.querySelector('.remove-photo');
const confirmContent = document.querySelector('.confirm-content');
const confirmButton = document.querySelector('.confirm-content > .confirm-button');
const discardButton = document.querySelector('.confirm-content > .discard-button');

let thisImg;
export function lightUp(imgUrl) {
    lightbox.classList.toggle('hidden')
    document.querySelector('.lightbox-image').classList.remove('hidden');
    document.querySelector('.lightbox-content').classList.remove('hidden');

    document.querySelector('.lightbox-image').setAttribute('src', imgUrl.image);
    location.innerHTML = `Location: ${imgUrl.city}, ${imgUrl.country}`;
    date.innerHTML = `Photo taken: ${imgUrl.date}`;
    downloadLink.href = imgUrl.image;
    downloadLink.classList.remove('hidden')
    downloadLink.download = 'selfie.png';
    thisImg = imgUrl
}
removeButton.addEventListener('click', () => {
    document.querySelector('.lightbox-image').classList.toggle('hidden');
    document.querySelector('.lightbox-content').classList.toggle('hidden');

    confirmContent.classList.toggle('hidden')
    confirmContent.classList.toggle('flex')
    
})

confirmButton.addEventListener('click', () => {
    lightbox.classList.toggle('hidden')
    confirmContent.classList.toggle('hidden')
    confirmContent.classList.toggle('flex')
    removePhoto(thisImg)
})

discardButton.addEventListener('click', () => {
    document.querySelector('.lightbox-image').classList.toggle('hidden');
    document.querySelector('.lightbox-content').classList.toggle('hidden');

    confirmContent.classList.toggle('hidden')
    confirmContent.classList.toggle('flex')

})

lightbox.addEventListener('click', (e) => {
    let toggle = e.target
    if(toggle.tagName.toLowerCase() === 'section') {
        console.log(true)
        console.log(toggle)
        lightbox.classList.toggle('hidden')
        confirmContent.classList.add('hidden')
        confirmContent.classList.remove('flex')



    }else {
        console.log(false)
        console.log(toggle)

    }
    console.log(toggle)
})

