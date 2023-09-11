import { useNavigate, useParams } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import emptyQuestion from '../../assets/images/empty-questions.svg'
import deleteImg from '../../assets/images/delete.svg'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode/index'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'
import './styled.scss'
import { Drawer } from '@mui/material'
import { TiThMenu } from "react-icons/ti";
import { useState } from 'react'


type RoomParams = {
    id: string,
}


export function AdminRoom() {
    const history = useNavigate()
    const params = useParams<RoomParams>()
    const roomID = params?.id
    const { title, questions } = useRoom(roomID ?? '')
    const [open, setOpen] = useState(false);


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
        <>
            <div id="page-room">
                <header>
                    <div className="content">
                        <img src={logoImg} alt="letmeAsk" />
                        <button className='menu-icon' onClick={() => setOpen(true)}><TiThMenu id='icon' /></button>
                        <Drawer
                            anchor={'right'}
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <div style={
                                {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '80%',
                                    width: '100%',
                                    height: '100%',
                                    padding: '20px',
                                    color: '#fff',
                                }
                            }>
                                <RoomCode code={roomID ? roomID : ''} />
                                <Button
                                    isOutlined
                                    onClick={handleEndRoom}
                                >Encerrar sala
                                </Button>
                            </div>
                        </Drawer>
                    </div>
                </header>
                <main>
                    <div className='room-title'>

                        {questions.length > 0 ?
                            (
                                <>
                                    <h1>Sala {title}</h1>
                                    <span>{questions.length} pergunta(s)</span>
                                </>
                            ) :
                            (
                                <div className='empty-question'>
                                    <h1>Ainda não há perguntas</h1>
                                    <img src={emptyQuestion} alt="Ainda não há perguntas" />
                                </div>
                            )}
                    </div>


                    <div className="question-list">
                        {questions.map(questions => {
                            return (
                                <Question
                                    key={questions.id}
                                    content={questions.content}
                                    author={questions.author}
                                    isAnswered={questions.isAnswered}
                                    isHighlighted={questions.isHighlighted}
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
        </>
    )
}