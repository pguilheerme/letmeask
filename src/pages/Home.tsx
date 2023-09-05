import { useNavigate } from 'react-router-dom'
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"
import "../styles/auth.scss"
import { Button } from "../components/Button"
import { firebase, auth } from '../services/firebase'

export function Home () {
    const history = useNavigate()

    function handleCreateRoom(){
        const provider= new firebase.auth.GoogleAuthProvider()

        auth.signInWithPopup(provider).then(result => {
            console.log(result)
            
            history('/rooms/new')
        })

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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="imagem do google" />
                        Crie sua sala com google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
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