import { useAppContext } from '../context/AppContext'
import firebase, { firebaseStore } from '../firebase/firebaseConfig'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'


export default function useSendMessage() {
    const{user,connectionData,connectedUser} = useAppContext()


   
    function sendFinally(data,message){
        const docRef = doc(collection(firebaseStore,"messages"))
        setDoc(docRef,{
            id : docRef.id,   //document id
            connection : data.id,  //connection id
            sender : user.uid,
            message : message,
            sentTime : Date.now()
        }).then(()=>updateDoc(doc(firebase.store,"connections",data.id),{
            message : message,
            sender : user.uid,
            updated : Date.now()
        }))
        .catch((error)=>toast.error(error?.message))
    }


    function sendMessage(message){
        if(!connectionData){
            const docRef = doc(collection(firebase.store,"connections"))
            const docData = {
                id: docRef.id,
                users:[user.uid,connectedUser.uid],
                created : Date.now(),
                [user.uid] :   user.uid,
                [connectedUser.uid]: connectedUser.uid,
            }
            setDoc(docRef,docData)
            .then(()=>{
                sendFinally(docData,message)
            })
            .catch((error)=>toast.error(error?.message))
        }
        else{
            sendFinally(connectionData,message);
        }
    }
  return sendMessage
}
