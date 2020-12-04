export function notificationPermission() {
    let notificationPermission = false;
    //const askPermissionButton = document.querySelector('#permission-button');
    const photoButton = document.getElementById('capture-button');

    photoButton.addEventListener('click', async () => {
        const answer = await Notification.requestPermission();
        console.log('permission')
        if( answer == 'granted' ) {
            notificationPermission = true;
            console.log('Notification: permission GRANTED, user allowed notifications');
        } else if( answer == 'denied' ) {
            console.log('Notification: user denied notifications');
        } else {  // answer == 'default'
            console.log('Notification: user declined to answer');
        }
    })
}

 export function sendNotication(img, date) {
    
        if( !notificationPermission ) {
            console.log('We do not have permission to show notification');
            return;
        }

        const options = {
            body: `Photo Added to library at: ${date}`,
            icon: img
        }
        let notif = new Notification('Reminder', options);
        notif.addEventListener('show', () => {
            console.log('Showing notification');
        })
        notif.addEventListener('click', () => {
            console.log('User clicked on notification');
        })
    
}
