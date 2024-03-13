const thorSelectorBtn = document.querySelector('#thor-selector')
const lokiSelectorBtn = document.querySelector('#loki-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')


const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'thor' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'thor'

const updateMessageSender = (name) => {
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

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
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