import { ButtonGroup, Button } from '@chakra-ui/button'
import { useHistory } from 'react-router-dom'

function Nav() {
  let history = useHistory()
  return (
    <ButtonGroup isAttached>
      <Button onClick={() => {
        history.push('/')
      }}>
        <h2>Home</h2>
      </Button>
      <Button onClick={() => {
        history.push('/one')
      }}>
        <h2>Stand</h2>
      </Button>
      <Button onClick={() => {
        history.push('/two')
      }}>
        <h2>Sit</h2>
      </Button>
    </ButtonGroup>
  )
}

export default Nav