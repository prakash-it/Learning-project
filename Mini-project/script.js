let thorSelectorBtn = document.querySelector('#thor-selector')
let lokiSelectorBtn = document.querySelector('#loki-selector')
let chatHeader = document.querySelector('.chat-header')
let chatMessages = document.querySelector('.chat-messages')
let chatInputForm = document.querySelector('.chat-input-form')
let chatInput = document.querySelector('.chat-input')
let clearChatBtn = document.querySelector('.clear-chat-button')

let messages = JSON.parse(localStorage.getItem('message')) || []

let createChatMessageElement = (message) => `
<div class="message ${message.sender === 'thor' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'thor'

let updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'thor') {
        thorSelectorBtn.classList.add('active-person')
        lokiSelectorBtn.classList.remove('active-person') 
    }

    if (name === 'loki') {
        lokiSelectorBtn.classList.add('active-person')
        thorSelectorBtn.classList.remove('active-person') 
    }
    chatInput.focus()
}

thorSelectorBtn.onclick = () => updateMessageSender('thor')
lokiSelectorBtn.onclick = () => updateMessageSender('loki')

let sendMessage = (e) => {
    e.preventDefault()

    let timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))

    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset()

    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})
