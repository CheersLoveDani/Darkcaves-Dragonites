import { useHistory } from "react-router"

function Pokedex() {
  let history = useHistory()
  history.push('pokedex')
}

export {
  Pokedex,
}