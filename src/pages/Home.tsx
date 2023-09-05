import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"
import "../styles/auth.scss"
import { Button } from "../components/Button"
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function Home () {
    const history = useNavigate()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateNewRoom(){
        if(!user){
            await signInWithGoogle()
        }

        history('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === ''){
            return
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert('Room not found!')
            return
        }
        
        history(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração da página de autentificação"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo da aplicação" />
                    <button className="create-room" onClick={handleCreateNewRoom}>
                        <img src={googleIconImg} alt="imagem do google" />
                        Crie sua sala com google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}