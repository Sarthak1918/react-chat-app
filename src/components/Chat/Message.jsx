import React from 'react'
import { useAppContext } from '../../core/context/AppContext'
import classNames from 'classnames'
import getDisplayDate from '../../core/function/getDisplayDate'

function Message({message,sentTime,sender}) {
    const{user} = useAppContext()

  return (
    <li className={classNames("my-1 flex items-center p-4",(user.uid===sender && "justify-end"))}>
      <div className={classNames(
        "max-w-[75%]  p-4 rounded",
        {
            " bg-white text-black rounded-[18px] rounded-tl-none":user.uid !== sender,
            " bg-[#7f12b5] text-white rounded-[18px] rounded-br-none":user.uid === sender,
        }
      )}>
        <div>{message}</div>
        <div className='w-full text-right text-[10px]'>{ getDisplayDate(sentTime,true)}</div>
      </div>
    </li>
  )
}

export default Message
