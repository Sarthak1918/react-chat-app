import React, { useEffect, useState } from 'react'
import AppContext from '../core/context/AppContext'
import SideBar from '../components/app/SideBar'
import {  useCollectionData } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import firebase from '../core/firebase/firebaseConfig'
import ChatBody from '../components/app/ChatBody'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatLayout() {

    const[user] = useAuthState(firebase.auth)
    const [userList , userListLoading , userListError] = useCollectionData(collection(firebase.store,"users")) //useCollection simplifies the snapshot function for collection.here "collection" is the refernce of the collection in your firebase
    const [connections ,  , connectionError] = useCollectionData(collection(firebase.store,"connections")) //useCollection simplifies the snapshot function for collection.here "collection" is the refernce of the collection in your firebase
    const [connectedUser,setConnectedUser] = useState(null)
    const [messages,setMessages] = useState(null);


    useEffect(()=>{
        if(userListError) toast.error(userListError?.message)
       },[userList,userListError])

    useEffect(()=>{
        if(connectionError) toast.error(connectionError?.message)
       },[connectionError])

    const appContext = {
        userList,
        userListLoading,
        connections,
        messages,
        setMessages,
        connectedUser,
        setConnectedUser,
        user
    }

    
    return (
        <AppContext.Provider value={appContext}>
            <section className="w-full h-full flex">
                <SideBar/>
                <ChatBody />
            </section>
        </AppContext.Provider>
    )
}

export default ChatLayout
