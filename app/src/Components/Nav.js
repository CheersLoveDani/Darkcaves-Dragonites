
import {
  IconButton,
  ButtonGroup,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  Box
} from '@chakra-ui/react'

import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
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

        <MenuList bg='yellow.300'>
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

            }}
          >
            Trainer
          </MenuItem>
          <MenuItem
            onClick={() => {

            }}
          >
            Pokemon
          </MenuItem>
          <MenuItem
            onClick={() => {

            }}
          >
            Bag
          </MenuItem>
          <MenuItem
            onClick={() => {

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