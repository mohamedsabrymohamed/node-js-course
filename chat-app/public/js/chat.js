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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//options using qs lib in chat.html to query strings
const {username , room} = Qs.parse(location.search, { ignoreQueryPrefix: true})

//automatic scroll
const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

//listen for messages
socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

//listen for location message
socket.on('locationMessage',(message)=>{
    const html = Mustache.render(locationMessageTemplate,{
        username: message.username,
        url: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})



//roomdata
socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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


//get location using browser geolocation builtin
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


//emit username and room join
socket.emit('join', {username, room},(error)=>{
    if(error) {
        alert(error)
        location.href = '/'
    }
})