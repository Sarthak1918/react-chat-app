import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../core/context/AppContext'
import { collection, query, where } from 'firebase/firestore'
import firebase from '../../core/firebase/firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import LoadSVG from 'react-loadsvg'
import sortBy from 'sort-by'
import Message from './Message'



function MessageBox() {

    const { connectionData } = useAppContext()
    const [messageList, messageListLoad] = useCollectionData(query(collection(firebase.store, "messages"), where("connection", "==", connectionData.id)))
    const [messages, setMessages] = useState([])


    useEffect(() => {
        if (messageList) {
            const sortedMessages = [...messageList]
            sortedMessages.sort(sortBy("sentTime"))
            setMessages(sortedMessages)
        }
    }, [messageList])


    if (messageListLoad) {
        return (<div className='flex justify-center p-10'><LoadSVG size={30} /></div>)
    }


    return (
        <div className='flex flex-col-reverse overflow-y-auto w-full h-full absolute inset-0 bg-gray-300'>
            <ul>
                {messages?.map(message => <Message key={message.id} {...message} />)}
            </ul>
        </div>
    )
}

export default MessageBox
