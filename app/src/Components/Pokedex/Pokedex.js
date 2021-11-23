import { Button } from '@chakra-ui/button'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import { useState } from 'react'
import { getPokemonsList } from '../../lib/PokeAPI'
import { setPokedexStore, getPokedexStore } from '../../lib/Storage'

function Pokedex() {
  const [pokemon, setPokemon] = useState(null)

  console.log('Pokemon state is: ', pokemon)
  return (
    <Box>
      <Center>
        <Flex flexDirection='column'>
          <Center>
            <Heading>Pokedex</Heading>
          </Center>

          <Flex flexDirection='row'>
            <Box flex={1}>
              <Button
                variant='ghost'
                onClick={async () => {
                  setPokemon(setPokedexStore( await getPokemonsList()))
                }}
              >
                Fetch and Save pokedex
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                variant='ghost'
                onClick={async () => {
                  // console.log(getPokedexStore())
                }}
              >
                Get pokedex
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Center>
    </Box>

  )
}

export default Pokedex