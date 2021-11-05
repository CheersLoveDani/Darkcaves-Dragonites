import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout"
import { useState } from "react"
import { getPokemonByName } from "../../lib/PokeAPI"

function Pokedex() {
  const [pokemon, setPokemon] = useState('empty')

  return (
    <Box>
      <Center>
        <Flex flexDirection='column'>
          <Heading>Pokedex</Heading>
          <Button
            variant='ghost'
            onClick={() => {
              setPokemon(getPokemonByName('squirtle'))
              console.log(pokemon)
            }}
          >
            Get Squirtle
          </Button>
          <Text>{ pokemon }</Text>
        </Flex>
      </Center>
    </Box>
    
  )
}

export default Pokedex