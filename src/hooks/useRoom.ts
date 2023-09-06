import {useState, useEffect} from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
    likeCount: number,
    likeID: string | undefined,
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },

    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
    likes: Record<string, {
        authorID: string,
    }>
}>

export function useRoom (roomID: string) {
    const {user} = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomID}`)

        roomRef.on('value', room =>{
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {} ).length,
                    likeID: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorID === user?.id)?.[0],
                }
            })

            setQuestions(parsedQuestions)
            setTitle(databaseRoom.title)
        })

        return () => {
            roomRef.off('value')
        }
    }, [roomID, user?.id])

    return {questions, title}
}