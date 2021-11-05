var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

export async function getPokemonByName(name) {
  let res = P.getPokemonByName(name) // with Promise
    .then(function (response) {
      console.log('Info retrieved: ', response)
      return (response)
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })
  console.log('res: ', res)
  return (res)
}