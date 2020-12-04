import { sendNearLocation, sendGeoLocation  } from "./camera.js";


export function addGeoLocation(imgUrl) {

    //const message = document.querySelector('.position')
    
    if('geolocation' in navigator){
        const geo = navigator.geolocation
        //console.log('Geolocation:', geo)
        geo.getCurrentPosition(
            pos => {
            console.log('Got posibtion:', pos)
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            //message.innerHTML = `Your're at ${lat}, ${lng}`
            getAddressFromPosition(lat, lng, imgUrl)
                 
            },
            error => {
                console.log('could not get position:', error)
                //message.innerHTML = 'Permission denied'
                let locationError = 'No location'
                let emptyCountry = ''
                getAddressFromPosition(locationError, emptyCountry, imgUrl)

                
            }
        )
    } else {
        //message.innerHTML = 'This devices does not have access to the Geolocation API.'
    }
    return 'no location'
}




 async function getAddressFromPosition(lat, lng,  imgUrl) {

     //console.log(message,'thisthisthis')
    let photoDate = new Date().toLocaleTimeString();
     try {

         const response = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`)
         const data = await response.json();
         console.log(data, 'this is the photDate:', photoDate)

         if(data.error) {
            //message.innerHTML += `<br> Could not find your city. please try again later`
            await sendNearLocation(photoDate, lat, lng, imgUrl)

         }else {

             const city = data.city, country = data.country
             //message.innerHTML += `<br> It's in ${city}, ${country}`
            await sendGeoLocation(photoDate, city, country, imgUrl)
         }
     } catch (e) {
         console.log('getAddressFromPosition error:', e.message)
         //message.innerHTML += `<br> Could not find your city.`
         sendNearLocation(photoDate, lat, lng, imgUrl)
     }
 }