
console.log('storage: ', window.electron.ipcRenderer)

export function pingPong() {
  window.electron.ipcRenderer.send('asynchronous-message', 'ping')
}


window.electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log('pong? ', arg) // prints "pong"
})