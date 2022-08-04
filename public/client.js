const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let btnClick = document.querySelector("#btnarea")

do {
    name = prompt('Please enter name.')
} while (!name)

btnClick.addEventListener('keyup', (e) => {
    sendMessage(e.target.value)
})

// textarea.addEventListener('keyup', (e) => {


//     if (e.key == 'Enter') {
//         sendMessage(e.target.value)
//     }
// })

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }

    // append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    // Send ro server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve message
socket.on('message', (msg) => {
    //console.log(msg)
    appendMessage(msg, 'incoming');
})
