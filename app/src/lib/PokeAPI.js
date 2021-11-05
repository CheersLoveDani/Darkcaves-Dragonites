var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

export function getPokemonByName(name){
  let res = P.getPokemonByName(name) // with Promise
    .then(function(response) {
      console.log(response)
      (response)
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error)
    });
  return(res)
}