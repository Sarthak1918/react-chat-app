import classNames from 'classnames'
import React, { useState } from 'react'
import LoginExisting from '../components/login/LoginExisting'
import Signup from '../components/login/Signup'

function LoginLayout() {
    const[section,setSection] = useState("login")
  return (
    <div className=' w-full h-full flex flex-col '>
        <header className="flex w-full h-12">
            <button className={classNames("flex-1 w-[50%]", (section === "login" ? "bg-[#7411a5] text-white":"bg-[#a771c2]"))} onClick={()=>setSection("login")}>Login</button>
            <button className={classNames("flex-1 w-[50%]", (section === "signup" ? "bg-[#7411a5] text-white":"bg-[#a771c2]"))} onClick={()=>setSection("signup")}>Sign up</button>
        </header>
        <div className='flex-1 flex justify-center flex-col items-center w-full'>
        {section==="login" && <LoginExisting />}
        {section==="signup" && <Signup/>}
        </div>
    </div>

  )
}

export default LoginLayout
