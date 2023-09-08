import { useNavigate, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import emptyQuestion from '../assets/images/empty-questions.svg'
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
    const { title, questions } = useRoom(roomID ?? '')

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que deseja encerrar a sala?')) {
            await database.ref(`rooms/${roomID}`).update({
                endedAt: new Date(),
            })
            history('/')
        }
    }


    async function handleDeleteQuestion(questionID: string) {
        if (window.confirm('Tem certeza que você quer remover essa pergunta?')) {
            await database.ref(`rooms/${roomID}/questions/${questionID}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionID: string) {
        await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightedQuestion(questionID: string) {
        await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
            isHighlighted: true
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeAsk" />
                    <div>
                        <RoomCode code={roomID ? roomID : ''} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className='room-title'>
                    {questions.length > 0 ? (
                        <>
                            <h1>Sala {title}</h1>

                            <span>{questions.length} pergunta(s)</span>
                        </>
                    ) :
                        (
                            <img src={emptyQuestion} alt="Ainda não há perguntas" className='empty-questions' />
                        )}
                </div>


                <div className="question-list">
                    {questions.map(questions => {
                        return (
                            <Question
                                key = {questions.id}
                                content = {questions.content}
                                author = {questions.author}
                                isAnswered = {questions.isAnswered}
                                isHighlighted = {questions.isHighlighted}
                            >
                                {!questions.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(questions.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlightedQuestion(questions.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}
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