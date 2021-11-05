
import {
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  Box
} from '@chakra-ui/react'

import {
  HamburgerIcon,
} from '@chakra-ui/icons'

import { useHistory } from 'react-router-dom'

function Nav() {
  let history = useHistory()
  return (
    <Box bg='yellow.300'>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant=""
        />

        <MenuList
          bg='yellow.300'
          mt={-3}
        >
          <MenuItem
            onClick={() => {
              history.push('/')
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/pokedex')
            }}
          >
            Pokedex
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/trainer')
            }}
          >
            Trainer
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/pokemon')
            }}
          >
            Pokemon
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/bag')
            }}
          >
            Bag
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push('/pc')
            }}
          >
            PC
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Nav