import React, { useState } from 'react'
import LoginInput from './LoginInput'
import LoginSubmit from './LoginSubmit'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebase from '../../core/firebase/firebaseConfig'
import { toast } from 'react-hot-toast'


function LoginExisting() {
    const [loading, setLoading] = useState(false)
    const [loginUser] = useSignInWithEmailAndPassword(firebase.auth)

    function handleSubmit(e) {
        e.preventDefault();
        const {email, password} = e.target.elements;
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (!emailValue) return emailValue.focus();
        if (!passwordValue) return passwordValue.focus();

        setLoading(true);
        loginUser(emailValue,passwordValue)
        .then((result)=>{ 
            toast.success(`Welcome back to WeChat ${result.user.displayName}`)
        })
        .catch(error => {
            toast.error(error?.message)
            setLoading(false)
        })
    }


  return (
    
    <form className='w-full max-w-xs' onSubmit={handleSubmit}>
        <div className='text-2xl font-bold text-center text-blue-600' >
            ChatBay
        </div>
        <div className='text-lg font-bold text-center my-5 text-gray-500'>
            Login to your existing account
        </div>
      <LoginInput label="Email address" type="email" name="email" autoComplete="email" autoFocus disabled={loading} />
      <LoginInput label="Password" type="password" name="password" autoComplete="current-password" disabled={loading} />
      <LoginSubmit disabled={loading}/>
    </form>
  )
}

export default LoginExisting
