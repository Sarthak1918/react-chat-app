import React from 'react'
import userImg from './user.png'
import getDisplayDate from '../../core/function/getDisplayDate'
import { useAppContext } from '../../core/context/AppContext'
import classNames from 'classnames'

function UserItem({ name, time, message ,user, isMe}) {
    const{connectedUser , setConnectedUser} = useAppContext()
    return (
        <li className=' border-b border-b-white-100'>
        <button onClick={()=>setConnectedUser(user)} className={classNames('flex w-full px-4 py-2 items-center gap-3 text-left hover:bg-[#836591] transition-all',(connectedUser?.uid===user.uid&&"bg-[#61446d]"))}>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img src={userImg} alt={name}></img>
            </div>
            <div className='flex-1'>
                <div className='flex  w-full gap-3 items-center justify-between'>
                    <div className='flex-1 relative h-6'>
                        <p className='absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap text-white'>{name}</p>
                    </div>
                    <div className='text-xs font-semibold text-white'>{getDisplayDate(time)}</div>
                </div>
                <div className='w-full h-6 relative text-sm  text-white  font-medium'>
                    <p className='absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap'>{isMe && <span>You: </span>}{message}</p>
                </div>
            </div>
            </button>
        </li>
    )
}

export default UserItem
