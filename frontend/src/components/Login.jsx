import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/login`, user, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            navigate("/");
            //   console.log(res.data);
            dispatch(setAuthUser(res.data))

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        setUser({
            username: "",
            password: ""
        })
    }
    return (
        <div className=" min-w-96 mx-auto">
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>login</h1>
                <form onSubmit={onSubmitHandler} action=''>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>username</span>
                        </label>
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })} className='w-full input input-bordered h-10' type='text' placeholder='userame' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>password</span>
                        </label>
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className='w-full input input-bordered h-10' type='password' placeholder='password' />
                    </div>
                    <p className='text-center'>dont have an account?  <Link to="/signup">Signup
                    </Link></p>
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-600'>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login



