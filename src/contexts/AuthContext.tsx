import {createContext, ReactNode, useState, useEffect} from 'react'
import { auth, firebase } from '../services/firebase'


type User = {
    name: string,
    id: string,
    avatar: string
  }

type AuthContexType = {
    user?: User,
    signInWithGoogle: () => Promise<void>
  }

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext= createContext({} as AuthContexType)

export function AuthContextProvider ({children}: AuthContextProviderProps ) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const { displayName, photoURL, uid } = user
  
                if(!displayName || !photoURL){
                  throw new Error('Missing Information from Google Account.')
                }
  
                setUser({
                  id: uid,
                  name: displayName,
                  avatar: photoURL
                })
        }
      })
  
      return () => {
        unsubscribe()
      }
    }, [])
  
    async function signInWithGoogle(){
      const provider= new firebase.auth.GoogleAuthProvider()
      const result = await auth.signInWithPopup(provider)
  
              if(result.user){
                const { displayName, photoURL, uid } = result.user
  
                if(!displayName || !photoURL){
                  throw new Error('Missing Information from Google Account.')
                }
  
                setUser({
                  id: uid,
                  name: displayName,
                  avatar: photoURL
                })
              }
            }

    return(
        <AuthContext.Provider value= {{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}