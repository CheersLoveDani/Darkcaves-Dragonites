var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

export function getPokemonByName(name) {
  let res = P.getPokemonByName(name) // with Promise
    .then(function (response) {
      console.log('Info retrieved: ', response)
      return (response)
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })
  console.log('squirtle res: ', res)
  return (res)
}

export function getPokemonsList() {
  const limit = {
    offset: 0,
    limit: 50,
  }

  let res = P.getPokemonsList(limit)
    .then(function (response) {
      console.log('Info retrieved: ', response)
      return (response)
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })
  console.log('pokelist res: ', res)
  return (res)
}