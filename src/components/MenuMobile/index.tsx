import { Container } from './styled.jsx';
import { IoClose } from 'react-icons/io5'
import { Button } from '../Button/'
import { RoomCode } from '../RoomCode/'

export function MenuMobile({ menuIsVisible, setMenuIsVisible }) {
    return (
        <Container>
            <IoClose size={45} />
            <RoomCode code={roomID ? roomID : ''} />
            <Button
                isOutlined
                onClick={handleEndRoom}
            >Encerrar sala</Button>
        </Container>
    )
}