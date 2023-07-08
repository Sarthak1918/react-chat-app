import './App.css';
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from './core/firebase/firebaseConfig';
import LoginLoad from './components/login/LoginLoad';
import LoginLayout from './layout/LoginLayout';
import ChatLayout from './layout/ChatLayout'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';


function App() {
  const [user, userLoading, userError] = useAuthState(firebase.auth)
  
  useEffect(()=>{
   if(userError) toast.error(userError?.message)
  },[userError])
  return (
      <main className="w-full h-full max-w-7xl max-h-[678px] bg-white rounded-md shadow-lg overflow-hidden">
        {userLoading && <LoginLoad />}
        {!userLoading && !user && <LoginLayout />}
        {!userLoading && user && <ChatLayout />}
      </main>
  );
}

export default App;
