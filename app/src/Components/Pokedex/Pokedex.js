import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useState } from "react"
import { getPokemonByName } from "../../lib/PokeAPI"

function Pokedex() {
  const [pokemon, setPokemon] = useState(null)

  console.log('Pokemon state is: ', pokemon)
  return (
    <Box>
      <Center>
        <Flex flexDirection='column'>
          <Heading>Pokedex</Heading>
          <Button
            variant='ghost'
            onClick={async () => {
              setPokemon(await getPokemonByName('squirtle'))

            }}
          >
            Get Squirtle
          </Button>
          <Text align='center' >{pokemon ? pokemon.species.name : ''}</Text>
          <Image src={pokemon ? pokemon.sprites.front_default : ''} />
        </Flex>
      </Center>
    </Box>

  )
}

export default Pokedex