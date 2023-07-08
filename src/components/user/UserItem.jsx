import React from 'react'
import userImg from './user.png'
import getDisplayDate from '../../core/function/getDisplayDate'
import { useAppContext } from '../../core/context/AppContext'
import classNames from 'classnames'

function UserItem({ name, time, message ,uid}) {
    const{connectedUser , setConnectedUser} = useAppContext()
    return (
        <li className=' border-b border-b-gray-700'>
        <button onClick={()=>setConnectedUser(uid)} className={classNames('flex w-full px-4 py-2 items-center gap-3 text-left hover:bg-blue-400 transition-all',(connectedUser===uid&&"bg-blue-400"))}>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img src={userImg} alt={name}></img>
            </div>
            <div className='flex-1'>
                <div className='flex  w-full gap-3 items-center justify-between'>
                    <div className='flex-1 relative h-6'>
                        <p className='absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap'>{name}</p>
                    </div>
                    <div className='text-xs font-semibold text-white'>{getDisplayDate(time)}</div>
                </div>
                <div className='w-full h-6 relative text-sm  text-gray-700  font-medium'>
                    <p className='absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap'>{message}</p>
                </div>
            </div>
            </button>
        </li>
    )
}

export default UserItem
