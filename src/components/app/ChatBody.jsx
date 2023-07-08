import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../core/context/AppContext'
import userImg from '../user/user.png'
import {BsFillSendFill} from 'react-icons/bs'
import autosize from 'autosize'
import useSendMessage from '../../core/hooks/useSendMessage'
import MessageBox from '../Chat/MessageBox'


function ChatBody() {
    const { connectedUser,connectionData } = useAppContext()

    const messageAreaRef = useRef(null)

    const[message,setMessage] = useState("")
    const sendMessage = useSendMessage()

    useEffect(()=>{
        if(messageAreaRef.current) autosize(messageAreaRef.current)
    },[])

    return (
        <section className="chatArea flex flex-col flex-[3]">
            <header className='flex w-full items-center px-4 py-2 h-16 bg-blue-400 gap-3'>
                <div>
                    <img className='h-10 w-10' src={userImg} alt={connectedUser.displayName}></img>
                </div>
                <div className='flex-1 relative h-7 text-lg'>
                    <p className='absolute inset-0  overflow-hidden text-ellipsis whitespace-nowrap'>{connectedUser.displayName}</p>
                </div>
            </header>
            <article className='flex-1 relative'>
                {connectionData && <MessageBox/>}
            </article>
            <footer className='w-full flex items-center gap-3 p-3 bg-gray-300'>
                <textarea className='messageBox bg-white flex-1 resize-none outline-none px-3 py-3 h-12' placeholder='Type a message...' ref={messageAreaRef} onChange={(e)=>{setMessage(e.target.value)}} value={message} onKeyDown={(e) => {
                    if (e.which === 13 && !e.shiftKey) {
                        e.target.nextElementSibling?.click();
                        e.preventDefault();
                        e.target.style.height = "";
                    }
                }}></textarea>
            <button  onClick={()=>{
                sendMessage(message)
                setMessage("")
                }}><BsFillSendFill/></button>
            </footer>
        </section>

    )
}

export default ChatBody
