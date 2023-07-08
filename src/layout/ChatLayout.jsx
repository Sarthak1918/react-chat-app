import React, { useEffect, useState } from 'react'
import AppContext from '../core/context/AppContext'
import SideBar from '../components/app/SideBar'
import {  useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import firebase from '../core/firebase/firebaseConfig'
import ChatBody from '../components/app/ChatBody'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatWait from '../components/app/ChatWait'

function ChatLayout() {

    const[user] = useAuthState(firebase.auth)
    const [userList , userListLoading , userListError] = useCollectionData(collection(firebase.store,"users")) //useCollection simplifies the snapshot function for collection.here "collection" is the refernce of the collection in your firebase
    const [connections ,  , connectionError] = useCollectionData(query(collection(firebase.store,"connections"),where(user.uid,"==",user.uid))) //useCollection simplifies the snapshot function for collection.here "collection" is the refernce of the collection in your firebase
    const [connectedUser,setConnectedUser] = useState(null)
    const [connectionData,setConnectionData] = useState(null);

    useEffect(()=>{
        setConnectionData(connections?.find(data=>(data[user.uid] && data[connectedUser?.uid])))
    },[connectedUser?.uid, connections, user.uid])



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
        connectionData,
        connectedUser,
        setConnectedUser,
        user
    }

    
    return (
        <AppContext.Provider value={appContext}>
            <section className="w-full h-full flex">
                <SideBar/>
                {!connectedUser && <ChatWait />}
                {connectedUser && <ChatBody />}
            </section>
        </AppContext.Provider>
    )
}

export default ChatLayout
