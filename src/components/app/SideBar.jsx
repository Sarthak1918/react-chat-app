import Tippy from '@tippyjs/react'
import React, { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { BiLogOutCircle } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import firebase from '../../core/firebase/firebaseConfig'
import LoadSVG from 'react-loadsvg'
import { useAppContext } from '../../core/context/AppContext'
import UserItem from '../user/UserItem'
import sortBy from 'sort-by'
import SearchUserItem from '../user/SearchUserItem'

function SideBar() {
    const [logout] = useSignOut(firebase.auth)
    const { user, userList, userListLoading, connections } = useAppContext();

    const [sideUsers, setSideUsers] = React.useState([]);
    const [searchedUser, setSearchedUser] = React.useState(null);
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        if (searchValue) {
            let result = userList.filter(item => item.uid !== user.uid).filter(item => item.displayName.toLowerCase().includes(searchValue.toLowerCase().trim()))
            setSearchedUser(result.map(item => ({ name: item.displayName, uid: item.uid, user: item })))
            console.log(result);
        }
        else {
            setSearchedUser(null)
        }
    }, [searchValue, user.uid, userList])

    useEffect(() => {
        let users = [];
        if (connections) {
            users = connections.map((item) => {
                const friendID = item.users[0] === user.uid ? item.users[1] : item.users[0];
                const friendData = userList.find(data => data.uid === friendID);
                return {
                    uid: friendData.uid,
                    name: friendData.displayName,
                    user: friendData,
                    message: item.message,
                    time: item.updated,
                    isMe: item.sender === user.uid,
                }
            });
            users.sort(sortBy("-time"));
        }
        setSideUsers(users);
    }, [connections, user.uid, userList]);

    return (
        <aside className="sidebar flex-[1] bg-[#6a487a] flex flex-col">
            <header className="w-full h-16 p-2 bg-[#836591] flex text-center justify-between items-center">
                <div className='text-xl font-bold text-white'>
                    ChatBay
                </div>
                <Tippy content="Logout" placement='bottom'>
                    <button onClick={logout} className='hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-all'>
                        <BiLogOutCircle className='text-white'/>
                    </button>
                </Tippy>
            </header>
            <form className='w-full p-2 flex items-center  border-b-2  border-b-gray-500'>
                <input className='flex-1 px-1 py-2  outline-none bg-transparent font-medium' type="search" placeholder='Search user...' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />
                <FiSearch className='w-5 h-5 pr-1 text-white' />
            </form>
            {userListLoading && <div className='w-full flex-1 flex justify-center items-center'>
                <LoadSVG />
            </div>}
            {sideUsers?.length > 0 && !searchedUser && <ul className='block w-full list-none overflow-y-auto'>
                {sideUsers.map((user) => <UserItem key={user.uid} {...user} />)}
            </ul>}
            {searchedUser?.length > 0 && <ul className='block w-full list-none overflow-y-auto'>
                {searchedUser.map((user) => <SearchUserItem key={user.uid} {...user} />)}
            </ul>}
            {searchedUser?.length === 0 && <ul className='block w-full list-none overflow-y-auto'>
                <p className='w-full text-center py-5'>User not found</p>
            </ul>}
            
        </aside>
    )
}

export default SideBar

