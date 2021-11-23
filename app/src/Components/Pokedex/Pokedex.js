import { Button } from "@chakra-ui/button"
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useState } from "react"
import { getPokemonByName, getPokemonsList } from "../../lib/PokeAPI"

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
                  console.log(await getPokemonsList())

                }}
              >
                Get Squirtle
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                variant='ghost'
                onClick={async () => {
                  console.log(await getPokemonsList())

                }}
              >
                Get Squirtle
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Center>
    </Box>

  )
}

export default Pokedex