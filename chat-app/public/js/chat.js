const socket = io()

//form elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInbut = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#send-location')
//messages
const $messages = document.querySelector('#messages')
//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

//listen for messages
socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        message: message
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

//listen for location message
socket.on('locationMessage',(url)=>{
    const html = Mustache.render(locationMessageTemplate,{
        url: url
    })
    $messages.insertAdjacentHTML('beforeend',html)
})



$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //disable submit form when message is sending
    $messageFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message,(error)=>{
        //enable submit message to be sent 
        $messageFormButton.removeAttribute('disabled')
        $messageFormInbut.value = ''
        $messageFormInbut.focus()

        if(error){
            return console.log(error)
        }
        console.log('message delivered')
    })
})



$sendLocation.addEventListener('click',()=>{
    if(! navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }


    //disable send location button while sending location
    $sendLocation.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },()=>{
            //enable location button back
            $sendLocation.removeAttribute('disabled')
            console.log('location shared')
        })
    })
})