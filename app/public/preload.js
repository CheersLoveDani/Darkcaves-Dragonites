const { contextBridge, ipcRenderer } = require("electron");

console.log('preload is seeing: ', ipcRenderer);
contextBridge.exposeInMainWorld(
  "electron",
  {
    ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on }
  }
);
