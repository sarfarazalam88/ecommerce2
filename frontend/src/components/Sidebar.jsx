import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/logout`);
            navigate("/login")
            toast(res.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error)
        }
    }

    const searchHandler = (e) => {
        e.preventDefault();
        const conversation = otherUsers?.find((user) => user.fullname.toLowerCase().includes(search.toLocaleLowerCase()));
        if (conversation) {
            dispatch(setOtherUsers([conversation]));
        } else {
            toast.error("error found");
        }
    }
    return (
        <div className=' border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchHandler} action='' className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md'
                    type='text'
                    placeholder='Search..' />
                <button type='submit' className='btn bg-zinc-500 text-white'><IoIosSearch className='w-6 h-6 outline-none' /></button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
            <div className='mt-4'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}
export default Sidebar
