import {useNavigate, useParams} from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode/index'
import '../styles/room.scss'
// import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase'


type RoomParams = {
    id: string,
}

export function AdminRoom() {
    // const {user} = useAuth()
    const history = useNavigate()
    const params = useParams<RoomParams>()
    const roomID = params?.id
    const {title, questions} = useRoom(roomID ?? '')

    async function handleEndRoom () {
        if(window.confirm('Tem certeza que deseja encerrar a sala?')){
            await database.ref(`rooms/${roomID}`).update({
                endedAt: new Date(),
            })
            history('/')
        }
    }


    async function handleDeleteQuestion (questionID: string) {
        if(window.confirm('Tem certeza que você quer remover essa pergunta?')){
            await database.ref(`rooms/${roomID}/questions/${questionID}`).remove()
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeAsk" />
                    <div>
                        <RoomCode code= {roomID? roomID : ''} />
                        <Button 
                        isOutlined 
                        onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                

                <div className="question-list">
                    {questions.map(questions => {
                        return(
                            <Question
                            key={questions.id}
                            content={questions.content}
                            author={questions.author}
                            >
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(questions.id)}
                                >
                                    <img src={deleteImg} alt="remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}