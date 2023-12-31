import React from 'react'
import userImg from './user.png'
import { useAppContext } from '../../core/context/AppContext'
import classNames from 'classnames'

function SearchUserItem({ name, user}) {
    const { connectedUser, setConnectedUser } = useAppContext()
    return (
        <li className=' border-b border-b-white'>
            <button onClick={() => setConnectedUser(user)} className={classNames('flex w-full px-4 py-2 items-center gap-3 text-left hover:bg-gray-[#836591] transition-all', (connectedUser?.uid === user.uid && "bg-[#61446d]"))}>
                <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img src={userImg} alt={name}></img>
                </div>
                <div className='flex-1 relative h-6'>
                    <p className='absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap text-white'>{name}</p>
                </div>
            </button>
        </li>
    )
}

export default SearchUserItem
