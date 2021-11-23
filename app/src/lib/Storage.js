const storage = require('electron-storage')

export function setPokedexStore(data) {
  if (data != null) {
    // ipcRenderer.send('asynchronous-message', JSON.stringify(data));
    return(data)
  }
  else {
    console.warn('No Data Passed to pokedex')
  }
}

// export function getPokedexStore() {
//   if (store.get('pokedex')) {
//     return store.get('pokedex')
//   }
  
// }