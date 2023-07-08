import React from 'react'

function LoginInput({label,name,type,autoComplete,autoFocus,disabled}) {
  return (
    <div className='w-full my-5 '>
      <label className=' px-3 pb-1 block'>{label}</label>
      <input className=' w-full py-3 px-5 rounded outline-none  bg-gray-100 border border-gray-300' type={type} name={name} id={name} autoComplete={autoComplete} autoFocus={autoFocus} required disabled={disabled}></input>

    </div>
  )
}

export default LoginInput
