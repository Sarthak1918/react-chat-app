import React, { useState } from 'react'
import LoginInput from './LoginInput'
import LoginSubmit from './LoginSubmit'
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import firebase from '../../core/firebase/firebaseConfig';
import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';


function Signup() {
    const [createUser] = useCreateUserWithEmailAndPassword(firebase.auth)
    const [updateProfile] = useUpdateProfile(firebase.auth);
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        const {name, email, password} = e.target.elements;
        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (!nameValue) return name.focus();
        if (!emailValue) return emailValue.focus();
        if (!passwordValue) return passwordValue.focus();

        setLoading(true);

        createUser(emailValue, passwordValue).then((result) => result.user)
            .then((user) => setDoc(doc(firebase.store, "users", user.uid), {
                uid: user.uid,
                email: emailValue,
                displayName: nameValue
            }))
            .then(() => updateProfile({
                displayName: nameValue
            }))
            .then(() => { toast.success(`Welcome to WeChat ${nameValue}`) })
            .catch((err) => {
                toast.error(err?.message)
                setLoading(false)
            })


    }


    return (
        <form className='w-full max-w-xs' onSubmit={handleSubmit}>
            <div className='text-2xl font-bold text-center text-[#7f12b5]' >
                ChatBay
            </div>
            <div className='text-lg font-bold text-center my-5 text-gray-500'>
                Create you new account
            </div>

            <LoginInput label="Full Name" type="text" name="name" autoComplete="name" autoFocus disabled={loading} />
            <LoginInput label="Email address" type="email" name="email" autoComplete="email" disabled={loading} />
            <LoginInput label="Password" type="password" name="password" autoComplete="new-password" disabled={loading} />
            <LoginSubmit disabled={loading} />
        </form>
    )
}

export default Signup;
